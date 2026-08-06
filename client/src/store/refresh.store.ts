import { create } from 'zustand';

interface RefreshState {
  refreshCount: number;
  appRefresh: () => void;
}

export const useRefreshStore = create<RefreshState>((set) => ({
  refreshCount: 0,
  appRefresh: () =>
    set((state) => ({
      refreshCount: state.refreshCount + 1,
    })),
}));
