import * as _ from "lodash";

import * as semver from "semver";
import { window, env, Uri } from "vscode";
import { getPubspec } from ".";
import { updatePubspecDependency } from "./update-pubspec-dependency";

interface Dependency {
  name: string;
  version: string;
  actions: Action[];
}

interface Action {
  name: string;
  callback: Function;
}

export async function analyzeDependencies() {
  const dependenciesToAnalyze = [
    {
      name: "equatable",
      version: "^2.0.7",
      actions: [
        {
          name: "Open Migration Guide",
          callback: () => {
            env.openExternal(
              Uri.parse(
                "https://github.com/felangel/equatable/blob/master/doc/migration_guides/migration-0.6.0.md"
              )
            );
          },
        },
      ],
    },
    {
      name: "bloc",
      version: "^9.1.0",
      actions: [
        {
          name: "Open Migration Guide",
          callback: () => {
            env.openExternal(Uri.parse("https://bloclibrary.dev/#/migration"));
          },
        },
      ],
    },
    {
      name: "flutter_bloc",
      version: "^9.1.1",
      actions: [
        {
          name: "Open Migration Guide",
          callback: () => {
            env.openExternal(Uri.parse("https://bloclibrary.dev/#/migration"));
          },
        },
      ],
    },
    {
      name: "dartz",
      version: "^0.10.1",
      actions: [
        {
          name: "Open Documentation",
          callback: () => {
            env.openExternal(Uri.parse("https://pub.dev/packages/dartz"));
          },
        },
      ],
    },
    {
      name: "freezed",
      version: "^3.2.3",
      actions: [
        {
          name: "Open Documentation",
          callback: () => {
            env.openExternal(Uri.parse("https://pub.dev/packages/freezed"));
          },
        },
      ],
    },
    {
      name: "freezed_annotation",
      version: "^3.1.0",
      actions: [],
    },
    {
      name: "json_annotation",
      version: "^4.9.0",
      actions: [],
    },
    {
      name: "dio",
      version: "^5.9.0",
      actions: [
        {
          name: "Open Documentation",
          callback: () => {
            env.openExternal(Uri.parse("https://pub.dev/packages/dio"));
          },
        },
      ],
    },
    {
      name: "get_it",
      version: "^8.2.0",
      actions: [
        {
          name: "Open Documentation",
          callback: () => {
            env.openExternal(Uri.parse("https://pub.dev/packages/get_it"));
          },
        },
      ],
    },
    {
      name: "connectivity_plus",
      version: "^7.0.0",
      actions: [
        {
          name: "Open Documentation",
          callback: () => {
            env.openExternal(Uri.parse("https://pub.dev/packages/connectivity_plus"));
          },
        },
      ],
    },
  ];

  const devDependenciesToAnalyze = [
    {
      name: "bloc_test",
      version: "^10.0.0",
      actions: [
        {
          name: "Open Migration Guide",
          callback: () => {
            env.openExternal(Uri.parse("https://bloclibrary.dev/#/migration"));
          },
        },
      ],
    },
    {
      name: "json_serializable",
      version: "^6.11.1",
      actions: [],
    },
    {
      name: "build_runner",
      version: "^2.9.0",
      actions: [],
    },
    {
      name: "mockito",
      version: "^5.4.4",
      actions: [],
    },
    {
      name: "freezed",
      version: "^2.7.1",
      actions: [],
    },
  ];

  const pubspec = await getPubspec();
  const dependencies = _.get(pubspec, "dependencies", {});
  const devDependencies = _.get(pubspec, "dev_dependencies", {});

  checkForUpgrades(dependenciesToAnalyze, dependencies);
  checkForUpgrades(devDependenciesToAnalyze, devDependencies);
}

function checkForUpgrades(
  dependenciesToAnalyze: Dependency[],
  dependencies: any
) {
  for (let i = 0; i < dependenciesToAnalyze.length; i++) {
    const dependency = dependenciesToAnalyze[i];
    if (_.has(dependencies, dependency.name)) {
      const dependencyVersion = _.get(dependencies, dependency.name, "latest");
      if (dependencyVersion === "latest") continue;
      if (dependencyVersion === "any") continue;
      if (dependencyVersion == null) continue;
      if (typeof dependencyVersion !== "string") continue;
      const minVersion = _.get(
        semver.minVersion(dependencyVersion),
        "version",
        "0.0.0"
      );
      if (!semver.satisfies(minVersion, dependency.version)) {
        window
          .showWarningMessage(
            `This workspace contains an unsupported version of ${dependency.name}. Please update to ${dependency.version}.`,
            ...dependency.actions.map((action) => action.name).concat("Update")
          )
          .then(async (invokedAction) => {
            if (invokedAction === "Update") {
              await updatePubspecDependency({
                name: dependency.name,
                latestVersion: dependency.version,
                currentVersion: dependencyVersion,
              });
            } else {
              const action = dependency.actions.find(
                (action) => action.name === invokedAction
              );
              if (action) {
                action.callback();
              }
            }
          });
      }
    }
  }
}