/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396);
const github = __nccwpck_require__(716);
const fs = __nccwpck_require__(147);

async function run() {
  try {
    const token = core.getInput('github-token');
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

})();

module.exports = __webpack_exports__;
/******/ })()
;