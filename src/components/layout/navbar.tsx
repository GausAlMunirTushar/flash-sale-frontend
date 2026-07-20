import Link from "next/link";
import { ExternalLink, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Ticket className="size-4" />
          </span>
          FlashSeat
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <a href="#reserve" className="transition-colors hover:text-foreground">
            Reservation
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="View source on GitHub">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href="#reserve">Reserve Seat</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
