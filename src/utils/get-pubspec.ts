import * as yaml from "js-yaml";
import { getPubspecPath } from "./get-pubspec-path";
import * as fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

export async function getPubspec () {
  const pubspecPath = getPubspecPath();
  if (pubspecPath) {
    try {
      const content = await readFile(pubspecPath, "utf8");
      return yaml.safeLoad(content);
    } catch (_) { 
      return undefined;
    }
  }
  return undefined;
}