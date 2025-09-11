# Lassqat Learn Hub – Frontend

Modern academic companion web app for organizing, revising, and sharing study material ("Lassqat"). Built with a focus on clarity, speed, and a product‑level UI polish.

## 🎯 Goal
Provide ENSIAS (and similar engineering school) students a unified hub to:
- Navigate modules & elements quickly (level‑first approach: 1A / 2A / 3A)
- Access structured element resources (résumés, vidéos, flashcards, QCM / Q&A)
- Plan, host, and attend peer review sessions (Lassqat) with lightweight scheduling
- Track recent activity and reinforce spaced review via structured decks/quizzes

## ✨ Core Features
### Navigation & Content
- Level‑first flow (no promo/major clutter) with glass + gradient UI design system
- Element details with tabbed resources: Résumés, Vidéos, Flashcards, QCM/Q&A
- Metadata on uploads (auteur, année, durée for video, tri le plus récent)
- Recently viewed elements persisted locally (dashboard surface)

### Lassqat Planning
- Separate views: “Sessions à Venir” (global) vs “Mes Sessions Planifiées” (owner only)
- Minimal upcoming session cards: title, module–element, organizer, date, countdown
- Client auto‑expire: sessions hidden 30 min after start
- Session Details page centralizes: edit (date/time/link/description), subscribers, PDF future upload placeholder
- Subscribe / unsubscribe + live count

### Study Utilities
- Placeholder AI flashcards & QCM sets (structure ready for future backend integration)
- Progressive enhancement structure (skeleton loaders, accessible focus states)

### UX & Design System
- Tailwind + shadcn/ui component primitives (button, tabs, dialog, badge, etc.)
- Consistent glass/gradient surfaces & subtle elevation tokens
- Count badges on tab headers; semantic iconography (lucide-react)

## 🛠 Tech Stack
| Layer        | Choice                     | Notes |
|------------- |--------------------------- |-------|
| Framework    | React + TypeScript         | Vite bundler for dev speed |
| UI Toolkit   | Tailwind CSS + shadcn/ui   | Accessible, composable primitives |
| Icons        | lucide-react               | Clean outline icon set |
| State (light)| Local component state      | Light app; potential future global store |
| Data mock    | In‑memory & localStorage   | Ready to swap for API layer |

## 📂 Key Structure
```
src/
	pages/
		LassqatPage.tsx          # Level-based module/element navigation
		ElementDetailsPage.tsx    # Resource tabs (PDF, video, flashcards, QCM)
		LassqatPlanningPage.tsx   # Upcoming + My planned sessions
		SessionDetailsPage.tsx    # Owner actions + full session detail
		Dashboard.tsx             # Recently viewed + coverage metric
	components/ui/*             # shadcn/ui exported primitives
	hooks/                      # Custom hooks (e.g. highlights, toast)
	lib/                        # Utilities (user stub, helpers)
```

## 🔄 Session Lifecycle (Planning)
1. User creates a session (optional link, description)
2. Appears under “Mes Sessions Planifiées” (only organizer sees) and “Sessions à Venir” (if level matches)
3. Countdown displayed until start; status placeholder (planifié / confirmé)
4. Auto‑expires client side 30 minutes after start time
5. Session Details: edit fields, manage subscribers, (future) upload Lassqa PDF

## 🧱 Extensibility Targets
| Area                  | Future Upgrade |
|---------------------- |----------------|
| Auth & profiles       | Real backend + JWT / OAuth |
| Session persistence   | API + optimistic updates |
| Comments system       | Migrate to per-resource threads w/ pagination |
| AI content            | Real generation pipeline for flashcards & QCM |
| Calendar integration  | Export .ics / Google Calendar quick‑add |
| Notifications         | Replace removed bell with real reminder engine |

## 🚀 Local Development
Install dependencies & run dev server:
```bash
pnpm install
pnpm dev
```
Or with npm:
```bash
npm install
npm run dev
```
The app runs by default at: http://localhost:5173

## ✅ Quality Practices
- TypeScript for safer refactors
- Strict component responsibility, lean prop surfaces
- Skeleton loading states for perceived performance
- Accessible keyboard & focus styling inherited from shadcn/ui

## 🧪 Testing (Planned)
Lightweight vitest + React Testing Library setup (to be added) focusing on:
- ElementDetails tab rendering
- Session expiry logic
- Recently viewed persistence

## 🔐 Security Considerations
- No real auth yet: do NOT expose in production without access control
- All data currently mock / client state; treat as non‑authoritative

## 📦 Deployment Notes
Vite static build (`pnpm build`) outputs to `dist/`. Suitable for static hosting (Netlify, Vercel, S3 + CloudFront). Add future API origin + CORS config when backend lands.

## 🗺 Roadmap Snapshot
- [ ] Persist sessions via API
- [ ] Upload handling + file storage
- [ ] Role-based organizer features
- [ ] Real-time attendance / live presence
- [ ] Calendar export + reminder service
- [ ] AI-generated spaced repetition scheduling

## 🤝 Contribution Guidelines
1. Create a feature branch: `feat/<scope>`
2. Keep PRs small & focused
3. Use conventional commits (feat:, fix:, refactor:, chore:)
4. Update README / inline docs for notable UI or data changes

## 📄 License
Proprietary (internal academic project). Add explicit license file if open sourcing later.

---
Need something clarified or want a new enhancement documented? Open an issue or leave a note.
