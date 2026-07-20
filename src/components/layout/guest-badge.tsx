"use client";

import Link from "next/link";
import { ChevronDown, Copy, LogIn, LogOut, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGuestId } from "@/hooks/use-guest-id";
import { useAuthStore } from "@/store/auth-store";
import { logoutUser } from "@/services/auth.service";

export function GuestBadge() {
  const guestId = useGuestId();
  const { user, isAuthenticated, logout } = useAuthStore();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch {
      // proceed anyway
    }
    logout();
    toast("Logged out");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {isAuthenticated ? (user?.name?.[0] ?? "U") : "G"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden flex-col items-start text-left leading-tight sm:flex">
            <span className="text-sm font-medium">
              {isAuthenticated ? user?.name ?? "User" : "Guest"}
            </span>
            <span className="text-xs text-muted-foreground">
              {isAuthenticated ? user?.email : guestId ?? "…"}
            </span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {guestId && (
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(guestId);
              toast.success("Guest ID copied");
            }}
          >
            <Copy className="size-4" />
            Copy Guest ID
          </DropdownMenuItem>
        )}
        {!isAuthenticated ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogIn className="size-4" />
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">
                <UserPlus className="size-4" />
                Register
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
