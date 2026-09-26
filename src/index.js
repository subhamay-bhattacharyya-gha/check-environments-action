const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);
    const repo = github.context.repo;

    const requiredEnvs = ['ci', 'devl'];
    const optionalEnvs = ['test', 'prod'];
    const allEnvs = [...requiredEnvs, ...optionalEnvs];
    const envStatus = {};

    if (!token) {
      core.setFailed('Missing required input: github-token');
      return;
    }

    core.info(`Checking environments for repository: ${allEnvs.join(', ')}`);

    for (const env of allEnvs) {
      try {
        await octokit.rest.repos.getEnvironment({
          owner: repo.owner,
          repo: repo.repo,
          environment_name: env,
        });
        core.info(`Environment '${env}' exists.`);
        envStatus[env] = true;
      } catch (error) {
        if (error.status === 404) {
          core.warning(`Environment '${env}' does not exist.`);
          envStatus[env] = false;
        } else {
          throw error;
        }
      }
    }

    // Check if all required environments exist
    const requiredExist = requiredEnvs.every(env => envStatus[env] === true);
    envStatus.all = requiredExist;

    // Set output for use in other steps
    const jsonOutput = JSON.stringify(envStatus);
    core.setOutput('env_status', jsonOutput);

    // Build markdown summary
    let summary = `### 🔍 Environment Check Summary\n\n`;
    summary += `| Environment | Status |\n`;
    summary += `|-------------|--------|\n`;

    for (const env of allEnvs) {
      const statusIcon = envStatus[env] ? '✅' : '❌';
      const optional = optionalEnvs.includes(env) ? ' (optional)' : '';
      summary += `| \`${env}\`${optional} | ${statusIcon} |\n`;
    }

    summary += `\n**All Required Environments Configured:** ${envStatus.all ? '✅ Yes' : '❌ No'}\n`;

    // Write to GitHub Step Summary
    const summaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (summaryFile) {
      fs.appendFileSync(summaryFile, summary);
    } else {
      core.warning('GITHUB_STEP_SUMMARY environment variable not found.');
    }

    // Fail the job if any required environment is missing
    if (!envStatus.all) {
      core.setFailed('One or more required environments are missing.');
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
