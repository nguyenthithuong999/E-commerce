import fs from "fs";
import path from "path";

export const loadMergedConfig = (
  testFilePath: string,
  caseId: string,
  env: string,
) => {
  // TODO: 1. Load global config
  // 2. Loas local config
  const testDir = path.dirname(testFilePath);
  const testBase = path.basename(testFilePath, ".spec.ts");
  const jsonFile = path.join(testDir, `${testBase}.json`);

  if (!fs.existsSync(jsonFile)) {
    throw new Error("Test data JSON file not found");
  }
  const configRaw = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

  const dataCase = configRaw[caseId][env];
  // TODO: 3. Merge global+ local
  return dataCase;
};
