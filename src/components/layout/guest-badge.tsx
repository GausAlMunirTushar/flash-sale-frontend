"use client";

import { ChevronDown, Copy, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGuestId } from "@/hooks/use-guest-id";

export function GuestBadge() {
  const guestId = useGuestId();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-primary">G</AvatarFallback>
          </Avatar>
          <span className="hidden flex-col items-start text-left leading-tight sm:flex">
            <span className="text-sm font-medium">Guest</span>
            <span className="text-xs text-muted-foreground">{guestId ?? "…"}</span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => {
            if (guestId) {
              navigator.clipboard.writeText(guestId);
              toast.success("Guest ID copied");
            }
          }}
        >
          <Copy className="size-4" />
          Copy Guest ID
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <LogIn className="size-4" />
          Sign in
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
