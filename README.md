# Cloudflare Workers Full-Stack React Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/victorianwobodo/pwa.fix)

A production-ready full-stack application template built on Cloudflare Workers. Features a modern React frontend with shadcn/ui components, Tailwind CSS, and a type-safe API backend powered by Hono and Durable Objects for scalable, stateful data persistence (users, chats, messages).

Perfect for building real-time apps, dashboards, or any full-stack application with zero-config deployment to Cloudflare's global edge network.

## ✨ Key Features

- **Full-Stack TypeScript**: React + Vite frontend, Hono backend in a single Worker.
- **Entity-Based Persistence**: Durable Objects for users and chat boards with indexes for listing/pagination.
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark/light themes, animations.
- **Performance Optimized**: TanStack Query for data fetching, React Router, optimized builds.
- **Developer Experience**: Hot reload, error boundaries, API client, theme toggle.
- **Edge-Native**: Global Durable Objects, no databases needed for most apps.
- **Responsive & Accessible**: Mobile-first design, ARIA labels, keyboard navigation.
- **Extensible Architecture**: Easy to add new entities/routes/components.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, React Router, TanStack Query, Sonner (toasts) |
| **Backend** | Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject) |
| **State/Data** | React Query, Zustand, Immer, Entity CRUD with indexes |
| **UI/UX** | Radix UI primitives, Framer Motion, Tailwind Animate |
| **Dev Tools** | Bun, ESLint, TypeScript 5, Cloudflare Vite plugin |
| **Other** | CORS, Logging, Error reporting, SPA routing |

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/) (`bunx wrangler@latest install` or via npm)
- Cloudflare account (free tier works)

### Installation
```bash
git clone <your-repo-url>
cd <project-name>
bun install
```

### Development
```bash
# Start dev server (frontend + API proxy)
bun dev

# Open http://localhost:3000 (or $PORT)
```

- Frontend: `localhost:3000`
- API: `localhost:3000/api/*` (proxied via Vite)
- Edit `src/pages/HomePage.tsx` for your app UI.
- Add entities in `worker/entities.ts`, routes in `worker/user-routes.ts`.

### Type Generation
```bash
bunx wrangler types  # Generate Env types from wrangler.toml
```

## 📚 Project Structure

```
├── src/                 # React frontend
│   ├── components/      # shadcn/ui + custom (sidebar, theme toggle, etc.)
│   ├── hooks/           # useTheme, useMobile
│   ├── lib/             # API client, utils, error reporter
│   ├── pages/           # Router pages (HomePage.tsx)
│   └── main.tsx         # Entry with QueryClient + Router
├── shared/              # Shared types (User, Chat, Message)
├── worker/              # Cloudflare Worker backend
│   ├── core-utils.ts    # Entity base classes (DO NOT MODIFY)
│   ├── entities.ts      # Your entities (UserEntity, ChatBoardEntity)
│   ├── index.ts         # Hono app loader (DO NOT MODIFY)
│   └── user-routes.ts   # Your API routes
├── tailwind.config.js   # Custom theme + animations
└── wrangler.jsonc       # DO bindings + migrations
```

## 🔧 Usage Examples

### Frontend API Calls
```ts
// src/lib/api-client.ts
import { api } from '@/lib/api-client';

const users = await api<User[]>('/api/users');
const chat = await api<Chat>('/api/chats', {
  method: 'POST',
  body: JSON.stringify({ title: 'New Chat' })
});
```

### Backend Entities
```ts
// worker/entities.ts - Extend IndexedEntity
export class MyEntity extends IndexedEntity<MyState> {
  // Custom methods
}

// worker/user-routes.ts
app.get('/api/myentities', async (c) => {
  await MyEntity.ensureSeed(c.env);
  return ok(c, await MyEntity.list(c.env));
});
```

### Seed Data
Edit `shared/mock-data.ts` and `worker/entities.ts` static `seedData`.

## ☁️ Deployment

1. **Login to Cloudflare**:
   ```bash
   bunx wrangler login
   bunx wrangler whoami  # Verify account
   ```

2. **Deploy** (builds + deploys frontend + worker):
   ```bash
   bun deploy
   ```

3. **Custom Domain** (optional):
   ```bash
   bunx wrangler pages deploy --project-name <pages-project> dist/
   bunx wrangler deploy --name <worker-name>
   ```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/victorianwobodo/pwa.fix)

Your app is now live on `*.workers.dev` or custom domain. Durable Objects auto-scale globally.

### Production Tips
- Use `wrangler tail` for logs.
- Monitor via Cloudflare dashboard (Observability enabled).
- Assets served as SPA (single-page application).

## 🤝 Contributing

1. Fork & clone.
2. `bun install && bun dev`.
3. Add features to `src/` or `worker/`.
4. Test thoroughly.
5. PR with clear description.

## 📄 License

MIT. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- Questions? Open an issue.

Built with ❤️ for the Cloudflare ecosystem.