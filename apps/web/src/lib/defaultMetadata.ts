import TodoFeatureVersion1 from "@/features/todo/version1";
import TodoFeatureVersion2 from "@/features/todo/version2";
import { JSX } from "react";

export const supportedVersions = {
  v7_1_0_0: "7.1.0.0",
  v7_2_0_0: "7.2.0.0",
  v7_2_0_1: "7.2.0.1",
} as const;

export type SupportedVersions =
  (typeof supportedVersions)[keyof typeof supportedVersions];

export const TodoFeatureUI: Record<SupportedVersions, () => JSX.Element> = {
  "7.1.0.0": TodoFeatureVersion1,
  "7.2.0.0": TodoFeatureVersion2,
  "7.2.0.1": TodoFeatureVersion2,
};
