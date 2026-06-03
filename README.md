# Next-Gen Learning Dashboard

A high-fidelity student dashboard built for the Frontend Intern Challenge — dark UI, live Supabase data, Bento Grid layout, and Framer Motion animations throughout.

**Live demo:** [Deployed on Vercel](https://learning-dashboard-student.vercel.app/)

---

## Running locally

```bash
npm install
cp .env.example .env.local   # add your Supabase credentials
npm run dev
```

Requires two env vars (see `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

---

## Architectural choices

### Server vs client component split

The core decision was keeping all data fetching strictly on the server and all animation logic on the client — no overlap.

`app/page.tsx` is a Server Component. `CoursesSection` is an async RSC that queries Supabase using `@supabase/supabase-js` directly on the server, so the credentials never touch the browser. Everything else — `BentoGrid`, the tiles, the Sidebar — is `"use client"` because Framer Motion requires browser APIs.

`CoursesSection` is wrapped in a `<Suspense>` boundary with a skeleton fallback (`CoursesSkeletonGroup`). This means the page shell, Hero tile, and Activity tile all render and animate immediately from the server; only the course cards stream in once the Supabase query finishes. No full-page loading spinner needed.

### Animation approach

All animations are `transform` and `opacity` only — nothing that triggers layout recalculation. This was a strict requirement and it shaped a few implementation decisions:

- The sidebar collapse animates `width` on the container but the nav labels use `opacity + marginLeft + maxWidth` instead of `width`, so the icon position never shifts during the spring.
- Course card hover border glows are absolutely-positioned overlays that transition `opacity` — the card dimensions don't change.
- The active sidebar highlight uses `layoutId="sidebar-highlight"` so Framer Motion slides the background indicator between items rather than re-mounting it.

Stagger is handled at the `BentoGrid` level with `staggerChildren: 0.08` — tiles don't need individual delay logic, they just consume `variants={tileVariants}` from the grid.

### Supabase schema

```sql
courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null,
  icon_name   text not null,
  created_at  timestamptz default now()
)
```

`icon_name` is a string key that maps to a Lucide component at render time via a lookup table in `CourseTile.tsx`. If the value doesn't match any key, it falls back to `BookOpen`.

---

## Challenges

**Tailwind v4 config format.** v4 moves theme configuration into `globals.css` under `@theme` and drops `tailwind.config.js`. Most documentation and Stack Overflow answers still reference v3, so I had to lean on the v4 release notes directly when things didn't behave as expected.

**Noise texture clashing with absolute positioning.** The grain texture on tiles is a `::after` pseudo-element applied via a `.noise` class. Children that needed `position: absolute` inside those tiles had to use Tailwind's `.absolute` utility — inline `style={{ position: 'absolute' }}` was being overridden by the `@layer base` rule that resets `.noise > *`. Took a bit of debugging to isolate.

**`maxWidth` animation from CSS default.** Framer Motion reads the computed CSS value of a property on first render to determine the starting point. `max-width` defaults to `"none"` in CSS — a string Framer Motion can't interpolate to a number. Fixed by setting explicit numeric `initial` values on those `motion.span` elements.

