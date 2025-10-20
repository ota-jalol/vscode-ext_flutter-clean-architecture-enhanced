import { getPubspec } from "./get-pubspec";
import * as _ from "lodash";

export async function getProjectName(): Promise<string> {
  const pubspec = await getPubspec();
  if (pubspec) {
    const projectName = _.get(pubspec, "name", "my_app");
    return projectName;
  }
  return "my_app";
}