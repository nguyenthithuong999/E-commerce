import { test as base } from "@playwright/test";
import { loadMergedConfig } from "@utils/config";

export const test = base.extend<{ conf: any }>({
  conf: async ({}, use: any, testInfo: any) => {

    const testFilePath = testInfo.file;
    let caseId = testInfo?.tags?.[0];
    if (!caseId) {
      throw new Error("CaseID not found");
    }
    caseId = caseId.replace("@", "");
    const env = process.env.ENV || "dev";

    // Load merged config
    const conf = loadMergedConfig(testFilePath, caseId, env);
    await use(conf);
  },
});
