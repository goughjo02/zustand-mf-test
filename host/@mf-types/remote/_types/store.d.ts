export interface Store {
    token: string | null;
    setToken: (token: string | null) => void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<Store>>;
