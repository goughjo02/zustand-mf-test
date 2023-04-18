import { create } from "zustand";

export interface Store {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
