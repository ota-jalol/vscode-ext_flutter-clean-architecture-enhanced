import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";
import * as path from "path";

import {
  commands,
  ExtensionContext,
  InputBoxOptions,
  OpenDialogOptions,
  QuickPickOptions,
  Uri,
  window,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);
import {
  getBlocEventTemplate,
  getBlocStateTemplate,
  getBlocTemplate,
  getEntityTemplate,
  getRepositoryTemplate,
  getUseCaseTemplate,
  getModelTemplate,
  getRepositoryImplTemplate,
  getRemoteDataSourceTemplate,
  getLocalDataSourceTemplate,
  getPageTemplate,
  getDisplayWidgetTemplate,
  getControlsWidgetTemplate,
  getLoadingWidgetTemplate,
  getMessageDisplayWidgetTemplate,
  getFailuresTemplate,
  getExceptionsTemplate,
  getCoreUseCaseTemplate,
  getNetworkInfoTemplate,
  getInjectionContainerTemplate,
} from "./templates";
import { analyzeDependencies, getProjectName } from "./utils";

export function activate (_context: ExtensionContext) {
  analyzeDependencies();

  commands.registerCommand("extension.new-feature-bloc", async (uri: Uri) => {
    Go(uri);
  });
}

export async function Go (uri: Uri) {
  // Show feature prompt
  let featureName = await promptForFeatureName();

  // Abort if name is not valid
  if (!isNameValid(featureName)) {
    window.showErrorMessage("The name must not be empty");
    return;
  }
  featureName = `${featureName}`;

  let targetDirectory = "";
  try {
    targetDirectory = await getTargetDirectory(uri);
  } catch (error) {
    if (error instanceof Error) {
      window.showErrorMessage(error.message);
    } else {
      window.showErrorMessage(JSON.stringify(error));
    }
  }

  const useEquatable = true;

  const pascalCaseFeatureName = changeCase.pascalCase(
    featureName.toLowerCase()
  );
  try {
    await generateFeatureArchitecture(
      `${featureName}`,
      targetDirectory,
      useEquatable
    );
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseFeatureName} Feature`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
}

export function isNameValid (featureName: string | undefined): boolean {
  // Check if feature name exists
  if (!featureName) {
    return false;
  }
  // Check if feature name is null or white space
  if (_.isNil(featureName) || featureName.trim() === "") {
    return false;
  }

  // Return true if feature name is valid
  return true;
}

export async function getTargetDirectory (uri: Uri): Promise<string> {
  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (_.isNil(targetDirectory)) {
      throw Error("Please select a valid directory");
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  return targetDirectory;
}

export async function promptForTargetDirectory (): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the feature in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

export function promptForFeatureName (): Thenable<string | undefined> {
  const blocNamePromptOptions: InputBoxOptions = {
    prompt: "Feature Name",
    placeHolder: "counter",
  };
  return window.showInputBox(blocNamePromptOptions);
}

export async function promptForUseEquatable (): Promise<boolean> {
  const useEquatablePromptValues: string[] = ["no (default)", "yes (advanced)"];
  const useEquatablePromptOptions: QuickPickOptions = {
    placeHolder:
      "Do you want to use the Equatable Package in bloc to override equality comparisons?",
    canPickMany: false,
  };

  const answer = await window.showQuickPick(
    useEquatablePromptValues,
    useEquatablePromptOptions
  );

  return answer === "yes (advanced)";
}

async function generateBlocCode (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean,
  projectName: string = "my_app"
) {
  const blocDirectoryPath = `${targetDirectory}/bloc`;
  if (!existsSync(blocDirectoryPath)) {
    await createDirectory(blocDirectoryPath);
  }

  await Promise.all([
    createBlocEventTemplate(blocName, targetDirectory, useEquatable),
    createBlocStateTemplate(blocName, targetDirectory, useEquatable),
    createBlocTemplate(blocName, targetDirectory, useEquatable, projectName),
  ]);
}

async function generateTemplateFiles(
  featureName: string,
  targetDirectory: string,
  projectName: string = "my_app"
): Promise<void> {
  const featureDirectoryPath = path.join(targetDirectory, featureName);
  
  // Create domain layer files
  const domainDirectoryPath = path.join(featureDirectoryPath, "domain");
  await Promise.all([
    createEntityTemplate(featureName, path.join(domainDirectoryPath, "entities")),
    createRepositoryTemplate(featureName, path.join(domainDirectoryPath, "repositories"), projectName),
    createUseCaseTemplate(featureName, "get" + changeCase.snakeCase(featureName), path.join(domainDirectoryPath, "usecases"), projectName),
  ]);

  // Create data layer files
  const dataDirectoryPath = path.join(featureDirectoryPath, "data");
  await Promise.all([
    createModelTemplate(featureName, path.join(dataDirectoryPath, "models")),
    createRepositoryImplTemplate(featureName, path.join(dataDirectoryPath, "repositories"), projectName),
    createRemoteDataSourceTemplate(featureName, path.join(dataDirectoryPath, "datasources"), projectName),
    createLocalDataSourceTemplate(featureName, path.join(dataDirectoryPath, "datasources"), projectName),
  ]);

  // Create presentation layer files
  const presentationDirectoryPath = path.join(featureDirectoryPath, "presentation");
  await Promise.all([
    createPageTemplate(featureName, path.join(presentationDirectoryPath, "pages")),
    createDisplayWidgetTemplate(featureName, path.join(presentationDirectoryPath, "widgets")),
    createControlsWidgetTemplate(featureName, path.join(presentationDirectoryPath, "widgets")),
    createLoadingWidgetTemplate(path.join(presentationDirectoryPath, "widgets")),
    createMessageDisplayWidgetTemplate(path.join(presentationDirectoryPath, "widgets")),
  ]);
}

export async function generateFeatureArchitecture (
  featureName: string,
  targetDirectory: string,
  useEquatable: boolean
) {
  // Get project name from pubspec.yaml
  const projectName = await getProjectName();
  
  // Create the features directory if its does not exist yet
  const featuresDirectoryPath = getFeaturesDirectoryPath(targetDirectory);
  if (!existsSync(featuresDirectoryPath)) {
    await createDirectory(featuresDirectoryPath);
  }

  // Create the feature directory
  const featureDirectoryPath = path.join(featuresDirectoryPath, featureName);
  await createDirectory(featureDirectoryPath);

  // Create the data layer
  const dataDirectoryPath = path.join(featureDirectoryPath, "data");
  await createDirectories(dataDirectoryPath, [
    "datasources",
    "models",
    "repositories",
  ]);

  // Create the domain layer
  const domainDirectoryPath = path.join(featureDirectoryPath, "domain");
  await createDirectories(domainDirectoryPath, [
    "entities",
    "repositories",
    "usecases",
  ]);

  // Create the presentation layer
  const presentationDirectoryPath = path.join(
    featureDirectoryPath,
    "presentation"
  );
  await createDirectories(presentationDirectoryPath, [
    "bloc",
    "pages",
    "widgets",
  ]);

  // Generate the bloc code in the presentation layer
  await generateBlocCode(featureName, presentationDirectoryPath, useEquatable, projectName);
  
  // Generate all template files
  await generateTemplateFiles(featureName, featuresDirectoryPath, projectName);
}

export function getFeaturesDirectoryPath (currentDirectory: string): string {
  // Split the path
  const splitPath = currentDirectory.split(path.sep);

  // Remove trailing \
  if (splitPath[splitPath.length - 1] === "") {
    splitPath.pop();
  }

  // Rebuild path
  const result = splitPath.join(path.sep);

  // Determines whether we're already in the features directory or not
  const isDirectoryAlreadyFeatures =
    splitPath[splitPath.length - 1] === "features";

  // If already return the current directory if not, return the current directory with the /features append to it
  return isDirectoryAlreadyFeatures ? result : path.join(result, "features");
}

export async function createDirectories (
  targetDirectory: string,
  childDirectories: string[]
): Promise<void> {
  // Create the parent directory
  await createDirectory(targetDirectory);
  // Creat the children
  childDirectories.map(
    async (directory) =>
      await createDirectory(path.join(targetDirectory, directory))
  );
}

function createDirectory (targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function createBlocEventTemplate (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean
) {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const targetPath = `${targetDirectory}/bloc/${snakeCaseBlocName}_event.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_event.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getBlocEventTemplate(blocName, useEquatable),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

function createBlocStateTemplate (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean
) {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const targetPath = `${targetDirectory}/bloc/${snakeCaseBlocName}_state.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_state.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getBlocStateTemplate(blocName, useEquatable),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

function createBlocTemplate (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean,
  projectName: string = "my_app"
) {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const targetPath = `${targetDirectory}/bloc/${snakeCaseBlocName}_bloc.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_bloc.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getBlocTemplate(blocName, useEquatable, projectName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

function createCubitStateTemplate (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean
) {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const targetPath = `${targetDirectory}/cubit/${snakeCaseBlocName}_state.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_state.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getBlocStateTemplate(blocName, useEquatable),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

function createCubitTemplate (
  blocName: string,
  targetDirectory: string,
  useEquatable: boolean
) {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const targetPath = `${targetDirectory}/cubit/${snakeCaseBlocName}_cubit.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseBlocName}_cubit.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getBlocTemplate(blocName, useEquatable),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      }
    );
  });
}

async function createEntityTemplate(featureName: string, targetDirectory: string): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getEntityTemplate(featureName), "utf8");
}

async function createRepositoryTemplate(featureName: string, targetDirectory: string, projectName: string = "my_app"): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_repository.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_repository.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getRepositoryTemplate(featureName, projectName), "utf8");
}

async function createUseCaseTemplate(featureName: string, useCaseName: string, targetDirectory: string, projectName: string = "my_app"): Promise<void> {
  const snakeCaseUseCaseName = changeCase.snakeCase(useCaseName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseUseCaseName}.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseUseCaseName}.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getUseCaseTemplate(featureName, useCaseName, projectName), "utf8");
}

async function createModelTemplate(featureName: string, targetDirectory: string): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_model.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_model.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getModelTemplate(featureName), "utf8");
}

async function createRepositoryImplTemplate(featureName: string, targetDirectory: string, projectName: string = "my_app"): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_repository_impl.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_repository_impl.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getRepositoryImplTemplate(featureName, projectName), "utf8");
}

async function createRemoteDataSourceTemplate(featureName: string, targetDirectory: string, projectName: string = "my_app"): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_remote_data_source.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_remote_data_source.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getRemoteDataSourceTemplate(featureName, projectName), "utf8");
}

async function createLocalDataSourceTemplate(featureName: string, targetDirectory: string, projectName: string = "my_app"): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_local_data_source.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_local_data_source.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getLocalDataSourceTemplate(featureName, projectName), "utf8");
}

async function createPageTemplate(featureName: string, targetDirectory: string): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_page.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_page.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getPageTemplate(featureName), "utf8");
}

async function createDisplayWidgetTemplate(featureName: string, targetDirectory: string): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_display.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_display.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getDisplayWidgetTemplate(featureName), "utf8");
}

async function createControlsWidgetTemplate(featureName: string, targetDirectory: string): Promise<void> {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  const targetPath = path.join(targetDirectory, `${snakeCaseFeatureName}_controls.dart`);
  
  if (existsSync(targetPath)) {
    throw new Error(`${snakeCaseFeatureName}_controls.dart already exists`);
  }
  
  await writeFileAsync(targetPath, getControlsWidgetTemplate(featureName), "utf8");
}

async function createLoadingWidgetTemplate(targetDirectory: string): Promise<void> {
  const targetPath = path.join(targetDirectory, `loading_widget.dart`);
  
  if (existsSync(targetPath)) {
    return; // Don't throw error for common widgets, just skip
  }
  
  await writeFileAsync(targetPath, getLoadingWidgetTemplate(), "utf8");
}

async function createMessageDisplayWidgetTemplate(targetDirectory: string): Promise<void> {
  const targetPath = path.join(targetDirectory, `message_display.dart`);
  
  if (existsSync(targetPath)) {
    return; // Don't throw error for common widgets, just skip
  }
  
  await writeFileAsync(targetPath, getMessageDisplayWidgetTemplate(), "utf8");
}
