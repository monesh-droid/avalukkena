import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function YesPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const t = setTimeout(() => {
      // subtle auto-focus vibe without trapping the user
      const el = document.querySelector<HTMLButtonElement>(
        '[data-testid="button-back-home"]',
      );
      el?.focus();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen valentine-noise">
      <div className="pointer-events-none fixed inset-0 opacity-[0.55]">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,88,140,0.28),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,164,120,0.28),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl items-center px-5 py-12 sm:px-8">
        <Card className="glass w-full overflow-hidden rounded-[26px] border-white/40 p-6 sm:p-10" data-testid="card-yes">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs font-medium shadow-sm" data-testid="text-yes-badge">
              <Sparkles className="h-3.5 w-3.5" />
              She said yes
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 shadow-sm" data-testid="icon-heartshake">
              <HeartHandshake className="h-6 w-6 text-[hsl(var(--primary))]" />
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl"
            data-testid="text-yes-title"
          >
            Best. Answer. Ever.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 text-base text-[hsl(var(--muted-foreground))] sm:text-lg"
            data-testid="text-yes-subtitle"
          >
            I love you. And I can’t wait for all the next chapters.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 rounded-full bg-[hsl(var(--primary))] px-6 text-white shadow-md shadow-[rgba(255,88,140,0.28)]"
              onClick={() => setLocation("/")}
              data-testid="button-back-home"
            >
              Back to our timeline
            </Button>

            <Button
              variant="secondary"
              className="h-11 rounded-full border border-white/40 bg-white/55 px-6 text-[hsl(var(--foreground))] hover:bg-white/70"
              onClick={() => {
                navigator.clipboard
                  ?.writeText("She said yes 💘")
                  .then(() => alert("Copied to clipboard!"))
                  .catch(() => undefined);
              }}
              data-testid="button-copy"
            >
              Copy a cute receipt
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-white/40 bg-white/50 p-4 text-sm text-[hsl(var(--muted-foreground))]" data-testid="text-yes-note">
            Tip: replace this page text with your real proposal message.
          </div>
        </Card>
      </div>
    </div>
  );
}

