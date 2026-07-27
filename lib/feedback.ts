export function computeOverallRating(ratings: (number | null)[]): number | null {
  const rated = ratings.filter((rating): rating is number => rating !== null);
  if (rated.length === 0) {
    return null;
  }
  const average = rated.reduce((sum, rating) => sum + rating, 0) / rated.length;
  return Math.round(average * 10) / 10;
}
