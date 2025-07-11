const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {
    const token = core.getInput('github-token');
    const orgShortName = core.getInput('org-short-name') || '';
    const region = core.getInput('region') || '';
    const octokit = github.getOctokit(token);
    const repo = github.context.repo;

    const baseEnvs = ['ci', 'devl', 'test', 'prod'];
    const envStatus = {};

    const requiredEnvs = baseEnvs.map(env => {
      if (env === 'ci') {
        return 'ci'; // No prefix/suffix for CI
      }
      return `${orgShortName}-${env}-${region}`;
    });

    for (const envName of requiredEnvs) {
      try {
        await octokit.rest.repos.getEnvironment({
          owner: repo.owner,
          repo: repo.repo,
          environment_name: envName,
        });
        core.info(`Environment '${envName}' exists.`);
        envStatus[envName] = true;
      } catch (error) {
        if (error.status === 404) {
          core.warning(`Environment '${envName}' does not exist. Run the Setup Environments workflow first.`);
          envStatus[envName] = false;
        } else {
          throw error;
        }
      }
    }

    // Add "all" key
    const allExist = requiredEnvs.every(env => envStatus[env] === true);
    envStatus.all = allExist;

    // Set output for use in other steps
    const jsonOutput = JSON.stringify(envStatus);
    core.setOutput('env_status', jsonOutput);

    // Build markdown summary
    let summary = `### 🔍 Environment Check Summary\n\n`;
    summary += `| Environment | Status |\n`;
    summary += `|-------------|--------|\n`;

    for (const env of requiredEnvs) {
      const statusIcon = envStatus[env] ? '✅' : '❌';
      summary += `| \`${env}\` | ${statusIcon} |\n`;
    }

    summary += `\n**All Environments Configured:** ${envStatus.all ? '✅ Yes' : '❌ No'}\n`;

    // Show orgShortName and region if provided
    if (orgShortName || region) {
      summary += `\n**Org Short Name:** \`${orgShortName || 'N/A'}\`\n`;
      summary += `**Region:** \`${region || 'N/A'}\`\n`;
    }

    // Write to GitHub Step Summary
    const summaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (summaryFile) {
      fs.appendFileSync(summaryFile, summary);
    } else {
      core.warning('GITHUB_STEP_SUMMARY environment variable not found.');
    }

    // Fail the job if any environment is missing
    if (!envStatus.all) {
      core.setFailed('One or more required environments are missing.');
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
