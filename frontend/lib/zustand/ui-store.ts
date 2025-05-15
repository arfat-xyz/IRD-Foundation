import { create } from "zustand";

interface UIStore {
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  showSearchModal: boolean;
  toggleSidebar: (sidebar: "left" | "right") => void;
  closeAllSidebars: () => void;
  setShowSearchModal: (show: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  showLeftSidebar: false,
  showRightSidebar: false,
  showSearchModal: false,
  toggleSidebar: (sidebar) =>
    set((state) => ({
      [sidebar === "left" ? "showLeftSidebar" : "showRightSidebar"]:
        !state[sidebar === "left" ? "showLeftSidebar" : "showRightSidebar"],
    })),
  closeAllSidebars: () =>
    set({ showLeftSidebar: false, showRightSidebar: false }),
  setShowSearchModal: (show) => set({ showSearchModal: show }),
}));
