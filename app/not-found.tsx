import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-10 text-center">
      <h2 className="text-2xl font-bold">Not found</h2>
      <p className="text-gray-500">The page or interview you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
