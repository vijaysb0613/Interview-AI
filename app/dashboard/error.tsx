"use client";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
      <h2 className="text-xl font-bold">Something went wrong loading your dashboard</h2>
      <p className="text-gray-500">Please try again.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
