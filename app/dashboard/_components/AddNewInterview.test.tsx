import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { pushMock, toastErrorMock, createInterviewActionMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  toastErrorMock: vi.fn(),
  createInterviewActionMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("sonner", () => ({
  toast: { error: toastErrorMock, success: vi.fn() },
}));

vi.mock("../../../actions/interview-actions", () => ({
  createInterviewAction: createInterviewActionMock,
}));

import AddNewInterview from "./AddNewInterview";

describe("AddNewInterview", () => {
  beforeEach(() => {
    pushMock.mockReset();
    toastErrorMock.mockReset();
    createInterviewActionMock.mockReset();
  });

  it("submits the form values and navigates to the new interview on success", async () => {
    createInterviewActionMock.mockResolvedValue({ status: "success", mockId: "abc-123" });
    const user = userEvent.setup();
    render(<AddNewInterview />);

    await user.click(screen.getByText("+ Add New"));
    await user.type(screen.getByPlaceholderText("EX. Full Stack Developer"), "Backend Engineer");
    await user.type(screen.getByPlaceholderText("EX. React,Angular,Nodejs,MySQL"), "Node.js, Postgres");
    await user.type(screen.getByPlaceholderText("EX.5"), "5");
    await user.click(screen.getByText("Start Interview"));

    await waitFor(() => {
      expect(createInterviewActionMock).toHaveBeenCalledWith({
        jobPosition: "Backend Engineer",
        jobDesc: "Node.js, Postgres",
        jobExperience: "5",
      });
    });
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard/interview/abc-123"));
  });

  it("shows an error toast and keeps the dialog open on failure", async () => {
    createInterviewActionMock.mockResolvedValue({ status: "error", message: "Something broke" });
    const user = userEvent.setup();
    render(<AddNewInterview />);

    await user.click(screen.getByText("+ Add New"));
    await user.type(screen.getByPlaceholderText("EX. Full Stack Developer"), "Backend Engineer");
    await user.type(screen.getByPlaceholderText("EX. React,Angular,Nodejs,MySQL"), "Node.js");
    await user.type(screen.getByPlaceholderText("EX.5"), "5");
    await user.click(screen.getByText("Start Interview"));

    await waitFor(() => expect(toastErrorMock).toHaveBeenCalledWith("Something broke"));
    expect(pushMock).not.toHaveBeenCalled();
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
  });
});
