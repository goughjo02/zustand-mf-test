import { create } from "zustand";

export interface Store {
  token: string | null;
  setToken: (token: string | null) => void;
}

const useMockStore = create<Store>((set) => ({
  token: "some token",
  setToken: (token) => set({ token }),
}));

export const useStore = useMockStore;
