import { z } from "zod";

export type Result$GetFingerprint = z.infer<typeof Result$GetFingerprint>;
export const Result$GetFingerprint = z.object({
  fingerprint: z.string(),
  isAdmin: z.boolean(),
});
