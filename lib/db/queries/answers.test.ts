import { beforeEach, describe, expect, it, vi } from "vitest";

const { selectMock, insertMock } = vi.hoisted(() => ({
  selectMock: vi.fn(),
  insertMock: vi.fn(),
}));

vi.mock("../client", () => ({
  db: {
    select: selectMock,
    insert: insertMock,
  },
}));

import { createAnswer, getAnswersForInterview } from "./answers";

const VALID_UUID = "11111111-1111-1111-1111-111111111111";

beforeEach(() => {
  selectMock.mockReset();
  insertMock.mockReset();
});

describe("getAnswersForInterview", () => {
  it("returns an empty array for a malformed id without querying the DB", async () => {
    const result = await getAnswersForInterview("not-a-uuid");
    expect(result).toEqual([]);
    expect(selectMock).not.toHaveBeenCalled();
  });

  it("returns the ordered answer rows", async () => {
    const rows = [{ id: 1, rating: 8 }, { id: 2, rating: 6 }];
    const orderBy = vi.fn().mockResolvedValue(rows);
    const where = vi.fn().mockReturnValue({ orderBy });
    const from = vi.fn().mockReturnValue({ where });
    selectMock.mockReturnValue({ from });

    const result = await getAnswersForInterview(VALID_UUID);
    expect(result).toEqual(rows);
  });
});

describe("createAnswer", () => {
  it("returns the inserted row's id", async () => {
    const returning = vi.fn().mockResolvedValue([{ id: 42 }]);
    const values = vi.fn().mockReturnValue({ returning });
    insertMock.mockReturnValue({ values });

    const result = await createAnswer({
      mockIdRef: VALID_UUID,
      question: "What is a closure?",
      userAns: "A function bound to its scope.",
      feedback: "Good.",
      rating: 8,
      userEmail: "user@example.com",
    });
    expect(result).toEqual({ id: 42 });
  });
});
