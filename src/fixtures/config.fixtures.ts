import { test as base, TestInfo } from "@playwright/test";
import { loadMergedConfig } from "@utils/config";

export const test = base.extend<{ conf: Record<string, any> }>({
  conf: async ({}, use: any, testInfo: TestInfo) => {
    const testFilePath = testInfo.file;
    let caseId = testInfo?.tags?.[0];
    if (!caseId) {
      throw new Error(
        `[ConfigFixture] No valid CaseID tag found in test '${testInfo.title}'. Expected tag format: @<MODULE>_<ID> (e.g. @LOGIN_001)`,
      );
    }
    caseId = caseId.replace("@", "");
    const env = process.env.ENV || "dev";

    // Load merged config
    const conf = loadMergedConfig(testFilePath, caseId, env);
    await use(conf);
  },
});
