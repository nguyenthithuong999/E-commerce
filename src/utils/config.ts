import fs from "fs";
import path from "path";

export const loadMergedConfig = (
  testFilePath: string,
  caseId: string,
  env: string = "dev",
) => {
  // 2. Loas local config
  const testDir = path.dirname(testFilePath);
  const testBase = path.basename(testFilePath, ".spec.ts");
  const localJsonPath = path.join(testDir, `${testBase}.json`);

  if (!fs.existsSync(localJsonPath)) {
    throw new Error("Test data JSON file not found");
  }
  const configRaw = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));

  const dataCase = configRaw[caseId][env];
  return dataCase;
};
