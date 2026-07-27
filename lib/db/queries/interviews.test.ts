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

import { createInterview, getInterviewByMockId, getInterviewsForUser } from "./interviews";

const VALID_UUID = "11111111-1111-1111-1111-111111111111";

beforeEach(() => {
  selectMock.mockReset();
  insertMock.mockReset();
});

describe("getInterviewByMockId", () => {
  it("returns null for a malformed id without querying the DB", async () => {
    const result = await getInterviewByMockId("not-a-uuid");
    expect(result).toBeNull();
    expect(selectMock).not.toHaveBeenCalled();
  });

  it("returns the interview when the query finds one", async () => {
    const fakeInterview = { id: 1, mockId: VALID_UUID };
    const where = vi.fn().mockResolvedValue([fakeInterview]);
    const from = vi.fn().mockReturnValue({ where });
    selectMock.mockReturnValue({ from });

    const result = await getInterviewByMockId(VALID_UUID);
    expect(result).toEqual(fakeInterview);
  });

  it("returns null when the query finds nothing", async () => {
    const where = vi.fn().mockResolvedValue([]);
    const from = vi.fn().mockReturnValue({ where });
    selectMock.mockReturnValue({ from });

    const result = await getInterviewByMockId(VALID_UUID);
    expect(result).toBeNull();
  });
});

describe("getInterviewsForUser", () => {
  it("queries and returns the ordered rows", async () => {
    const rows = [{ id: 2 }, { id: 1 }];
    const orderBy = vi.fn().mockResolvedValue(rows);
    const where = vi.fn().mockReturnValue({ orderBy });
    const from = vi.fn().mockReturnValue({ where });
    selectMock.mockReturnValue({ from });

    const result = await getInterviewsForUser("user@example.com");
    expect(result).toEqual(rows);
  });
});

describe("createInterview", () => {
  it("returns the inserted row's mockId", async () => {
    const returning = vi.fn().mockResolvedValue([{ mockId: VALID_UUID }]);
    const values = vi.fn().mockReturnValue({ returning });
    insertMock.mockReturnValue({ values });

    const result = await createInterview({
      jsonMockResp: "{}",
      jobPosition: "Engineer",
      jobDesc: "Node",
      jobExperience: "3",
      createdBy: "user@example.com",
    });
    expect(result).toEqual({ mockId: VALID_UUID });
  });

  it("returns null when the insert returns no row", async () => {
    const returning = vi.fn().mockResolvedValue([]);
    const values = vi.fn().mockReturnValue({ returning });
    insertMock.mockReturnValue({ values });

    const result = await createInterview({
      jsonMockResp: "{}",
      jobPosition: "Engineer",
      jobDesc: "Node",
      jobExperience: "3",
      createdBy: "user@example.com",
    });
    expect(result).toBeNull();
  });
});
