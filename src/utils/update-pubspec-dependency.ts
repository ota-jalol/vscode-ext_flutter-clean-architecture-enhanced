import * as fs from "fs";
import { getPubspecPath } from "./get-pubspec-path";

export async function updatePubspecDependency (dependency: {
  name: string;
  latestVersion: string;
  currentVersion: string;
}): Promise<void> {
  const pubspecPath = getPubspecPath();
  if (pubspecPath) {
    try {
      const content = fs.readFileSync(pubspecPath, "utf8");
      const updatedContent = content.replace(
        `${dependency.name}: ${dependency.currentVersion}`,
        `${dependency.name}: ${dependency.latestVersion}`
      );
      fs.writeFileSync(pubspecPath, updatedContent, "utf8");
    } catch (error) {
      console.error("Failed to update pubspec.yaml:", error);
    }
  }
}