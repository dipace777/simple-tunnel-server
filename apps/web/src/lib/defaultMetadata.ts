import TodoFeatureVersion1 from "@/features/todo/version1";
import TodoFeatureVersion2 from "@/features/todo/version2";

export const version_7_1_0_0 = "7.1.0.0" as const;
export const version_7_2_0_0 = "7.2.0.0" as const;
export const version_7_2_0_1 = "7.2.0.1" as const;

export type SupportedVersions =
  | typeof version_7_1_0_0
  | typeof version_7_2_0_0
  | typeof version_7_2_0_1;

export const SupportedVersions = {
  version_7_1_0_0,
  version_7_2_0_0,
  version_7_2_0_1,
};

export const TodoFeatureUI = {
  "7.1.0.0": TodoFeatureVersion1,
  "7.2.0.0": TodoFeatureVersion2,
  "7.2.0.1": TodoFeatureVersion2,
};
