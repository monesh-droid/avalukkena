import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Memory = {
  id: string;
  date: string;
  title: string;
  note: string;
  color: "rose" | "peach" | "plum";
  image?: string;
};

const memoriesSeed: Memory[] = [
  {
    id: "first-chat",
    date: "2023-05-09",
    title: "The Spark",
    note: "The moment it all began. Ice-cold measurement of leaned back greetings.",
    color: "rose",
  },
  {
    id: "first-date",
    date: "2023-05-15",
    title: "The first ‘Heyyyy’",
    note: "And I got 'Lol good night Take care' as reply. Hope you are not Disapponted with a NITTian",
    color: "peach",
    image: "/photos/first-hey.jpeg",
  },
  {
    id: "inside-joke",
    date: "2023--18",
    title: "That Stair",
    note: "We ",
    color: "plum",
  },
  {
    id: "trip-day",
    date: "2024-08-09",
    title: "Divine Quest",
    note: "",
    color: "peach",
  },
  {
    id: "today",
    date: "2026-02-14",
    title: "Today",
    note: "A memory we’re making right now.",
    color: "rose",
  },
];

function colorToClasses(color: Memory["color"]) {
  if (color === "peach") {
    return {
      dot: "bg-[hsl(var(--accent))]",
      glow: "shadow-[0_18px_60px_rgba(255,164,120,0.35)]",
      chip: "bg-[rgba(255,164,120,0.16)] text-[hsl(var(--foreground))] border-[rgba(255,164,120,0.28)]",
    };
  }

  if (color === "plum") {
    return {
      dot: "bg-[rgba(140,76,170,0.9)]",
      glow: "shadow-[0_18px_60px_rgba(140,76,170,0.22)]",
      chip: "bg-[rgba(140,76,170,0.10)] text-[hsl(var(--foreground))] border-[rgba(140,76,170,0.22)]",
    };
  }

  return {
    dot: "bg-[hsl(var(--primary))]",
    glow: "shadow-[0_18px_60px_rgba(255,88,140,0.30)]",
    chip: "bg-[rgba(255,88,140,0.12)] text-[hsl(var(--foreground))] border-[rgba(255,88,140,0.26)]",
  };
}

function formatDateLabel(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MemoryLanePage() {
  const [, setLocation] = useLocation();
  const [activeId, setActiveId] = useState(memoriesSeed[0]?.id);
  const [noClicks, setNoClicks] = useState(0);

  const active = useMemo(
    () => memoriesSeed.find((m) => m.id === activeId) ?? memoriesSeed[0],
    [activeId],
  );

  const noLabel = useMemo(() => {
    const labels = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Don’t break my heart",
      "Try again",
      "That’s the wrong one",
      "Nope (nice try)",
    ];
    return labels[Math.min(noClicks, labels.length - 1)];
  }, [noClicks]);

  return (
    <div className="min-h-screen valentine-noise">
      <div className="pointer-events-none fixed inset-0 opacity-[0.55]">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,88,140,0.28),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,164,120,0.28),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs font-medium text-[hsl(var(--foreground))] shadow-sm backdrop-blur"
              data-testid="text-badge-valentine"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Valentine’s Memory Lane
            </div>
            <h1
              className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl"
              data-testid="text-title-memory-lane"
            >
              A tiny museum of us.
            </h1>
            <p
              className="mt-3 text-base text-[hsl(var(--muted-foreground))] sm:text-lg"
              data-testid="text-subtitle-memory-lane"
            >
              Scroll the moments, relive the smiles, and meet me at the end.
            </p>
          </div>

          <div
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]"
            data-testid="text-date-today"
          >
            <CalendarHeart className="h-4.5 w-4.5" />
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        <main className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12">
          <section className="lg:col-span-5">
            <Card
              className="glass soft-ring overflow-hidden rounded-[22px] border-white/40 p-5 sm:p-6"
              data-testid="card-active-memory"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold"
                    data-testid="chip-active-date"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                    {formatDateLabel(active.date)}
                  </div>
                  <h2
                    className="mt-3 font-serif text-2xl leading-tight"
                    data-testid={`text-memory-title-${active.id}`}
                  >
                    {active.title}
                  </h2>
                  <p
                    className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
                    data-testid={`text-memory-note-${active.id}`}
                  >
                    {active.note}
                  </p>
                </div>

                <div className="hidden sm:block">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-white/60 shadow-sm"
                    data-testid="icon-memory-heart"
                  >
                    <Heart
                      className="h-6 w-6 text-[hsl(var(--primary))]"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-4"
                  data-testid="photo-container"
                >
                  {active.image ? (
                    <img
                      src={active.image}
                      alt={active.title}
                      className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                      data-testid={`img-memory-${active.id}`}
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,88,140,0.22),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(255,164,120,0.22),transparent_50%),linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.35))]" />
                  )}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p
                      className="text-xs text-[hsl(var(--muted-foreground))]"
                      data-testid="text-photo-hint"
                    >
                      Add your photos later by dropping them into{" "}
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        client/public/photos
                      </span>
                      .
                    </p>
                    <div
                      className="hidden sm:flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]"
                      data-testid="text-photo-count"
                    >
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {memoriesSeed.length}
                      </span>
                      moments
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="mt-6 glass overflow-hidden rounded-[22px] border-white/40 p-5 sm:p-6"
              data-testid="card-proposal"
            >
              <h3
                className="font-serif text-2xl"
                data-testid="text-proposal-title"
              >
                Okay… one more thing.
              </h3>
              <p
                className="mt-2 text-sm text-[hsl(var(--muted-foreground))]"
                data-testid="text-proposal-subtitle"
              >
                Will you be my Valentine?
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-11 rounded-full bg-[hsl(var(--primary))] px-6 text-white shadow-md shadow-[rgba(255,88,140,0.28)] hover:bg-[hsl(var(--primary))]"
                  onClick={() => setLocation("/yes")}
                  data-testid="button-yes"
                >
                  Yes
                </Button>

                <motion.div
                  className="relative"
                  animate={{ x: noClicks >= 1 ? [0, -6, 6, -4, 4, 0] : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Button
                    variant="secondary"
                    className="h-11 w-full rounded-full border border-white/40 bg-white/55 px-6 text-[hsl(var(--foreground))] hover:bg-white/70"
                    onMouseEnter={() => setNoClicks((c) => c + 1)}
                    onClick={() => setNoClicks((c) => c + 1)}
                    data-testid="button-no"
                  >
                    {noLabel}
                  </Button>
                </motion.div>
              </div>

              <AnimatePresence>
                {noClicks >= 3 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="mt-4 text-xs text-[hsl(var(--muted-foreground))]"
                    data-testid="text-no-hint"
                  >
                    That button seems… shy. Maybe the other one is the right
                    choice.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </Card>
          </section>

          <section className="lg:col-span-7">
            <Card
              className="glass overflow-hidden rounded-[22px] border-white/40 p-5 sm:p-6"
              data-testid="card-timeline"
            >
              <div className="flex items-center justify-between gap-3">
                <h3
                  className="font-serif text-2xl"
                  data-testid="text-timeline-title"
                >
                  Our timeline
                </h3>
                <div
                  className="text-xs text-[hsl(var(--muted-foreground))]"
                  data-testid="text-timeline-hint"
                >
                  Tap a moment to open it
                </div>
              </div>

              <div className="mt-5">
                <div className="relative pl-5">
                  <div className="absolute left-[10px] top-0 h-full w-px bg-[rgba(255,88,140,0.22)]" />

                  <div className="space-y-3">
                    {memoriesSeed.map((m, idx) => {
                      const c = colorToClasses(m.color);
                      const isActive = m.id === activeId;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setActiveId(m.id)}
                          className={
                            "group relative w-full rounded-2xl border px-4 py-3 text-left transition " +
                            (isActive
                              ? "border-white/60 bg-white/70"
                              : "border-white/30 bg-white/45 hover:bg-white/60")
                          }
                          data-testid={`button-timeline-${m.id}`}
                        >
                          <span
                            className={
                              "absolute left-[-18px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full ring-4 ring-[rgba(255,255,255,0.75)] transition " +
                              c.dot +
                              " " +
                              (isActive
                                ? ""
                                : "opacity-70 group-hover:opacity-100")
                            }
                          />

                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div
                                className={
                                  "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold " +
                                  c.chip
                                }
                                data-testid={`chip-timeline-date-${m.id}`}
                              >
                                <span
                                  className={
                                    "h-1.5 w-1.5 rounded-full " + c.dot
                                  }
                                />
                                {formatDateLabel(m.date)}
                              </div>
                              <div
                                className="mt-2 font-serif text-lg leading-tight"
                                data-testid={`text-timeline-item-title-${m.id}`}
                              >
                                {m.title}
                              </div>
                              <div
                                className="mt-1 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]"
                                data-testid={`text-timeline-item-note-${m.id}`}
                              >
                                {m.note}
                              </div>
                            </div>

                            <div
                              className={
                                "hidden sm:block h-10 w-10 rounded-2xl bg-white/60 " +
                                c.glow
                              }
                            >
                              <div className="grid h-full w-full place-items-center">
                                <Heart className="h-5 w-5 text-[hsl(var(--primary))]" />
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 " +
                              (isActive ? "" : "")
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="mt-6 overflow-hidden rounded-[22px] border border-white/40 bg-white/45 p-5 backdrop-blur sm:p-6"
              data-testid="card-customize"
            >
              <h3
                className="font-serif text-xl"
                data-testid="text-customize-title"
              >
                Want to make it yours fast?
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                <li data-testid="text-customize-step-1">
                  Put your photos into{" "}
                  <span className="font-medium text-[hsl(var(--foreground))]">
                    client/public/photos
                  </span>
                  .
                </li>
                <li data-testid="text-customize-step-2">
                  Replace the timeline dates/titles in{" "}
                  <span className="font-medium text-[hsl(var(--foreground))]">
                    memory-lane.tsx
                  </span>
                  .
                </li>
                <li data-testid="text-customize-step-3">
                  If you want, tell me your key dates and I’ll rewrite the
                  timeline copy to match your story.
                </li>
              </ol>
            </Card>
          </section>
        </main>

        <footer className="mt-10 flex flex-col items-center gap-2 text-center text-xs text-[hsl(var(--muted-foreground))] sm:mt-12">
          <div data-testid="text-footer-note">Made with love, on purpose.</div>
        </footer>
      </div>
    </div>
  );
}
