import { create } from "zustand";
import { faker } from "@faker-js/faker";
import { Todo, TaskStatus, TaskPriority, TabView } from "../types/todo.types";
import { mockTodos } from "../data/mockTodos";

interface Filters {
  tab: TabView;
  priority: TaskPriority | "all";
  search: string;
}

interface TodoStore {
  todos: Todo[];
  filters: Filters;

  // CRUD
  addTodo: (title: string, description: string, priority: TaskPriority) => void;
  updateTodo: (id: string, fields: Partial<Pick<Todo, "title" | "description" | "priority" | "status">>) => void;
  deleteTodo: (id: string) => void;
  restoreTodo: (id: string) => void;
  permanentlyDeleteTodo: (id: string) => void;

  // Filters
  setTab: (tab: TabView) => void;
  setPriority: (priority: TaskPriority | "all") => void;
  setSearch: (search: string) => void;

  // Derived
  getFiltered: () => Todo[];
  getCounts: () => Record<TabView, number>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: mockTodos,
  filters: {
    tab: "all",
    priority: "all",
    search: "",
  },

  addTodo: (title, description, priority) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: faker.string.uuid(),
      title,
      description,
      priority,
      status: TaskStatus.TODO,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    set((state) => ({ todos: [newTodo, ...state.todos] }));
  },

  updateTodo: (id, fields) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...fields, updatedAt: new Date().toISOString() } : t
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, deletedAt: new Date().toISOString() } : t
      ),
    }));
  },

  restoreTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, deletedAt: null } : t
      ),
    }));
  },

  permanentlyDeleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));
  },

  setTab: (tab) => set((state) => ({ filters: { ...state.filters, tab } })),
  setPriority: (priority) => set((state) => ({ filters: { ...state.filters, priority } })),
  setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),

  getFiltered: () => {
    const { todos, filters } = get();

    return todos.filter((t) => {
      // trash tab
      if (filters.tab === "trash") return t.deletedAt !== null;

      // all, todo, in_progress, done tabs
      if (t.deletedAt !== null) return false;

      if (filters.tab !== "all" && t.status !== filters.tab) return false;
      if (filters.priority !== "all" && t.priority !== filters.priority) return false;
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) {
          return false;
        }
      }

      return true;
    });
  },

  getCounts: () => {
  const { todos } = get();

  const active = todos.filter((t) => t.deletedAt === null);
  const trashed = todos.filter((t) => t.deletedAt !== null);

    return {
      all: active.length,
      todo: active.filter((t) => t.status === TaskStatus.TODO).length,
      in_progress: active.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
      done: active.filter((t) => t.status === TaskStatus.DONE).length,
      trash: trashed.length,
    };
  },
}));