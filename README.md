# persist-flow

A modern task management app built with React, Zustand, and Vite — with one core idea at its heart: **your scroll position and UI state persist across navigation**.

🔗 **[Live Demo → persist-flow.vercel.app](https://persist-flow.vercel.app/)**

---

## The Problem This Solves

Most todo apps lose your place the moment you navigate away. You're 300px deep into a task list, click into an edit modal, come back — and you're back at the top.

persist-flow solves this with [`virtua-restoration`](https://github.com/serter1/virtua-restoration), a virtual list wrapper that stores scroll position and cache in Zustand. Navigate to the About page and back. The list remembers exactly where you were.

---

## Features

- **Full CRUD** — create, edit, delete tasks
- **Soft delete with Trash** — deleted tasks go to a Trash tab, not gone forever. Restore or permanently delete from there.
- **Status management** — Todo / In Progress / Done, changeable via edit modal
- **Priority levels** — High, Medium, Low with color-coded indicators
- **Tab bar with live counts** — All, Todo, In Progress, Done, Trash — counts update as you filter
- **Search with debounce** — searches across title and description
- **Priority filter** — combine with search and tab filters
- **Scroll restoration** — leave the page, come back, continue exactly where you left off
- **Edit modal with URL sync** — opening an edit modal writes the task ID to the URL (`?edit=uuid`). Shareable, browser back button works.
- **Dark / Light mode**
- **Toast notifications** — feedback on every action
- **Error Boundary** — graceful error handling
- **SEO meta tags**
- **Not Found page**
- **CI/CD** — GitHub Actions runs unit tests on every push. Deployed automatically to Vercel.

---

## Tech Stack

| | |
|---|---|
| **Framework** | React 19 + Vite |
| **State** | Zustand |
| **Routing** | React Router v7 |
| **Styling** | Tailwind CSS |
| **Virtual List** | virtua + virtua-restoration |
| **Mock Data** | @faker-js/faker |
| **Testing** | Vitest |
| **Deploy** | Vercel |
| **CI** | GitHub Actions |

---

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.tsx
│   ├── icons/           # SVG icon components
│   ├── layout/          # Layout, Header, Footer
│   ├── todo/            # TodoCard
│   └── ui/              # TodoModal, ConfirmModal, TabBar,
│                        # SearchBar, Filter
│                        # Button, EmptyState, Toaster
├── config/              # statusConfig, priorityConfig + more
├── data/                # mockTodos — faker, seed: 42 (deterministic)
├── hooks/               # useTheme
├── pages/               # HomePage, TodoPage, NotFoundPage
├── store/
│   ├── todoStore.ts
│   ├── virtualListStore.ts
│   ├── toastStore.ts
│   └── __tests__/
│       └── todoStore.test.ts
├── types/               # todo.types.ts
└── utils/               # formatDate.ts
```

---


## The Core: Scroll Restoration

```tsx
// virtualListStore.ts — Zustand store for scroll/cache state
const useVirtualListStore = create((set, get) => ({
  cacheMap: {},
  get: (key) => get().cacheMap[key],
  set: (key, data) => set((state) => ({
    cacheMap: { ...state.cacheMap, [key]: data }
  })),
}));

// TodoPage — WindowVirtualizedList wraps the list
<WindowVirtualizedList
  cacheSource="custom"
  customProvider={virtualListStore}
  cacheKey="todo-list"
>
  {activeTodos.map((todo) => (
    <TodoCard key={todo.id} todo={todo} />
  ))}
</WindowVirtualizedList>
```

When you navigate away, `virtua-restoration` saves the scroll offset and item cache into the Zustand store. On return, it reads from there and restores both — no flash, no jump to top.

---

## State Architecture

All application state lives in Zustand. No localStorage, no sessionStorage — everything is in-memory and intentional.

```
todoStore
├── todos[]               # source of truth
├── filters               # tab | priority | search
├── addTodo()
├── updateTodo()
├── deleteTodo()          # soft delete → sets deletedAt
├── restoreTodo()         # clears deletedAt
├── permanentlyDeleteTodo()
├── getFiltered()         # applies all active filters
└── getCounts()           # live badge counts per tab

virtualListStore
├── cacheMap              # scroll position + item cache per list key
├── get(key)
└── set(key, data)
```

---

## Filters

Filters compose. All three can be active simultaneously:

| Filter | Values |
|---|---|
| Tab | All / Todo / In Progress / Done / Trash |
| Priority | All / High / Medium / Low |
| Search | Title + description (debounced 300ms) |

Tab counts reflect the active search and priority filters in real time.

---

## Running Locally

```bash
git clone https://github.com/ZeynebKoc/persist-flow.git
cd persist-flow
npm install
npm run dev
```

### Running Tests

```bash
npm run test
```

6 unit tests covering core store logic: CRUD operations, soft delete, restore, filter composition, and count accuracy.

---

## CI / CD

Every push to `main` triggers a GitHub Actions workflow:

```
push → install → vitest → ✅ or ❌
```

On success, Vercel deploys automatically.

---

## Design

- Font: **Syne** (headings) + **DM Sans** (body)
- Grid background texture
- CSS custom properties for full dark/light theming
- Color-coded status and priority — consistent across card borders, pills, and dots

---

## License

MIT
