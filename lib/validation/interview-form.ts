import { z } from "zod";

export const interviewFormSchema = z.object({
  jobPosition: z.string().trim().min(1, "Job position is required").max(200),
  jobDesc: z.string().trim().min(1, "Job description is required").max(2000),
  jobExperience: z.coerce.number().int().min(0, "Experience can't be negative").max(50),
});

export type InterviewFormValues = z.infer<typeof interviewFormSchema>;
