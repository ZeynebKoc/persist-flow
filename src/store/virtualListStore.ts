import { create } from "zustand";
import type { CacheSnapshot } from "virtua";

interface VirtualListStore {
  cacheMap: Record<string, [number, CacheSnapshot]>;
  get: (key: string) => [number, CacheSnapshot] | undefined;
  set: (key: string, data: [number, CacheSnapshot]) => void;
}

export const useVirtualListStore = create<VirtualListStore>((set, get) => ({
  cacheMap: {},

  get: (key) => get().cacheMap[key],

  set: (key, data) =>
    set((state) => ({
      cacheMap: { ...state.cacheMap, [key]: data },
    })),
}));