const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const repo = github.context.repo;

    const requiredEnvs = ['ci', 'devl', 'test', 'prod'];
    const envStatus = {};

    for (const env of requiredEnvs) {
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

    // Add "all" key: true if all envs are true, false otherwise
    const allExist = requiredEnvs.every(env => envStatus[env] === true);
    envStatus.all = allExist;

    const jsonOutput = JSON.stringify(envStatus);
    core.setOutput('env_status', jsonOutput);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
