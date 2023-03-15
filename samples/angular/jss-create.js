const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { applyNameToProject } = require('@sitecore-jss/sitecore-jss-cli/dist/cjs/create');

/**
 * This function is invoked by `jss create` when an app based on this template is created.
 * It should perform tasks necessary to instantiate the app according to the argv, which
 * correspond to the allowed arguments of `jss create`.
 *
 * Note: npm packages for the new app are already installed before this script is run.
 * Note: this file is deleted in the new app after it has been run.
 *
 * @param {object} argv Arguments passed to `jss create` script
 * @param {string[]} nextSteps Array of default 'next steps' to show at the console
 * @returns {string[]} The next steps to display to the console user (enables customization from this script)
 */
module.exports = function createJssProject(argv, nextSteps) {
  console.log(`Executing create script: ${__filename}...`);

  applyNameToProject(__dirname, argv.name, argv.hostName, 'JssAngularWeb');

  // Replace app name in Angular-specific locations
  function replaceAngularAppNameInFile(filePath) {
    const fullFilePath = path.join(__dirname, filePath);
    if (fs.existsSync(fullFilePath)) {
      let cliConfig = fs.readFileSync(fullFilePath, 'utf8');

      cliConfig = cliConfig.replace(/JssAngularWeb/g, argv.name);

      fs.writeFileSync(fullFilePath, cliConfig);
    }
  }

  replaceAngularAppNameInFile('angular.json');
  replaceAngularAppNameInFile('scripts/bootstrap.ts');
  replaceAngularAppNameInFile('package.json');

  if (!argv.fetchWith) {
    nextSteps.push(
      `* Did you know you can customize the Angular sample app using ${chalk.green(
        'jss create'
      )} parameters?`,
      `*  ${chalk.green(
        '--fetchWith {REST|GraphQL}'
      )} : Specifies how Sitecore data (layout, dictionary) is fetched. Default is REST.`
    );
  }

  setFetchWith(argv.fetchWith);

  return nextSteps;
};

/**
 * Sets how Sitecore data (layout, dictionary) is fetched.
 * @param {string} [fetchWith] {REST|GraphQL} Default is REST.
 */
 function setFetchWith(fetchWith) {
  const defaultDsfFile = path.join(__dirname, 'src/app/lib/dictionary-service-factory.ts');
  const graphQLDsfFile = path.join(__dirname, 'src/app/lib/dictionary-service-factory.graphql.ts');
  const defaultLsfFile = path.join(__dirname, 'src/app/lib/layout-service-factory.ts');
  const graphQLLsfFile = path.join(__dirname, 'src/app/lib/layout-service-factory.graphql.ts');
  const FetchWith = {
    GRAPHQL: 'graphql',
    REST: 'rest',
  };
  let value = fetchWith ? fetchWith.toLowerCase() : FetchWith.REST;

  if (value !== FetchWith.REST && value !== FetchWith.GRAPHQL) {
    console.warn(chalk.yellow(`Unsupported fetchWith value '${fetchWith}'. Using default 'REST'.`));
    value = FetchWith.REST;
  }

  console.log(chalk.cyan(`Applying ${value === FetchWith.REST ? 'REST' : 'GraphQL'} fetch...`));

  switch (value) {
    case FetchWith.GRAPHQL:
      fs.unlinkSync(defaultDsfFile);
      fs.renameSync(graphQLDsfFile, defaultDsfFile);
      fs.unlinkSync(defaultLsfFile);
      fs.renameSync(graphQLLsfFile, defaultLsfFile);
      break;

    case FetchWith.REST:
      fs.unlinkSync(graphQLDsfFile);
      fs.unlinkSync(graphQLLsfFile);
      break;
  }
}