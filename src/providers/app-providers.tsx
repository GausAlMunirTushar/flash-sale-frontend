"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { AuthInit } from "@/components/shared/auth-init";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <TooltipProvider>
          <ErrorBoundary>
            <AuthInit>
              {children}
            </AuthInit>
          </ErrorBoundary>
          <Toaster richColors position="top-center" />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
