export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>&copy; {new Date().getFullYear()} FlashSeat. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
