import { describe, expect, it } from "vitest";
import { computeOverallRating } from "./feedback";

describe("computeOverallRating", () => {
  it("returns null when there are no answers", () => {
    expect(computeOverallRating([])).toBeNull();
  });

  it("returns null when no answers have a rating yet", () => {
    expect(computeOverallRating([null, null])).toBeNull();
  });

  it("averages the ratings that exist", () => {
    expect(computeOverallRating([8, 6])).toBe(7);
  });

  it("ignores unrated answers when averaging", () => {
    expect(computeOverallRating([8, null, 6])).toBe(7);
  });

  it("rounds to one decimal place", () => {
    expect(computeOverallRating([7, 8, 9])).toBe(8);
    expect(computeOverallRating([7, 7, 8])).toBeCloseTo(7.3, 5);
  });

  it("does not hardcode a fixed value regardless of input", () => {
    expect(computeOverallRating([2, 2])).toBe(2);
    expect(computeOverallRating([10, 10])).toBe(10);
  });
});
