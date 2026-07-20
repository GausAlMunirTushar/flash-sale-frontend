import { ArrowRight, CheckCircle2, CreditCard, Lock, MousePointerClick } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const STEPS = [
  { icon: MousePointerClick, title: "Choose a Seat", description: "Select any available seat you like.", color: "bg-success/10 text-success" },
  { icon: Lock, title: "Reserve for 5 Min", description: "Your seat will be locked for 5 minutes.", color: "bg-urgency-amber/10 text-urgency-amber" },
  { icon: CreditCard, title: "Make Mock Pay", description: "Complete payment within time.", color: "bg-urgency-blue/10 text-urgency-blue" },
  { icon: CheckCircle2, title: "You're Confirmed!", description: "Your seat is yours. Enjoy!", color: "bg-primary/10 text-primary" },
];

export function HowItWorks() {
  return (
    <Card id="how-it-works" className="rounded-3xl border-border shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <p className="text-lg font-semibold">How It Works</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center gap-2 text-center">
              <span className={`flex size-11 items-center justify-center rounded-full ${step.color}`}>
                <step.icon className="size-5" />
              </span>
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="absolute -right-2 top-4 hidden size-4 text-muted-foreground/40 sm:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
