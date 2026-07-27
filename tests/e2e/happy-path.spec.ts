import { expect, test } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";
import { installFakeSpeechRecognition, FAKE_TRANSCRIPT } from "./fixtures/fake-speech-recognition";

const TEST_EMAIL = process.env.CLERK_E2E_TEST_EMAIL;

test.describe("core interview flow", () => {
  test.skip(
    !TEST_EMAIL,
    "Set CLERK_E2E_TEST_EMAIL to an existing user's email in your Clerk test instance to run this."
  );

  test("sign in, create an interview, answer a question, and view feedback", async ({ page }) => {
    await page.goto("/");
    await clerk.signIn({ page, emailAddress: TEST_EMAIL! });

    await page.addInitScript(installFakeSpeechRecognition);

    await page.goto("/dashboard");
    await expect(page.getByText("Previous Mock Interview")).toBeVisible();

    await page.getByText("+ Add New").click();
    await page.getByPlaceholder("EX. Full Stack Developer").fill("Backend Engineer");
    await page.getByPlaceholder("EX. React,Angular,Nodejs,MySQL").fill("Node.js, Postgres");
    await page.getByPlaceholder("EX.5").fill("3");
    await page.getByText("Start Interview").click();

    // createInterviewAction redirects client-side to /dashboard/interview/<mockId>
    await page.waitForURL(/\/dashboard\/interview\/[0-9a-f-]{36}$/);
    await page.getByRole("link", { name: "Start Interview" }).click();
    await page.waitForURL(/\/start$/);

    await expect(page.getByText("What is a closure?")).toBeVisible();

    await page.getByText("Record Answer").click();
    await expect(page.getByText("Stop Recording")).toBeVisible();
    await page.getByText("Stop Recording").click();

    await expect(page.getByText("User Answer Recorded Successfully")).toBeVisible();

    await page.getByRole("link", { name: "End Interview" }).click();
    await page.waitForURL(/\/feedback$/);

    await expect(page.getByText("Congratulations")).toBeVisible();
    await expect(page.getByText("8/10")).toBeVisible();
    await expect(page.getByText(FAKE_TRANSCRIPT)).toBeVisible();
  });
});
