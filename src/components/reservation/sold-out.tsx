"use client";

import { motion } from "framer-motion";
import { Ban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SoldOut() {
  return (
    <motion.div
      key="sold-out"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Ban className="size-6 text-muted-foreground" />
          </span>
          <p className="text-xl font-semibold">Sold Out</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            All seats for this flash sale have been reserved. Check back for the next drop.
          </p>
          <Button size="lg" variant="outline" className="h-12 w-full text-base" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
