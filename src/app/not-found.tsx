import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-xl bg-primary/10">
        <Zap className="size-8 text-primary" />
      </span>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="max-w-md text-muted-foreground">
        This page does not exist. The seat you&apos;re looking for may have been released.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
