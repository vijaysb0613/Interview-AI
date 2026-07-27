"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InterviewError({
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
      <h2 className="text-xl font-bold">Something went wrong loading this interview</h2>
      <p className="text-gray-500">Please try again, or head back to your dashboard.</p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/dashboard">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
