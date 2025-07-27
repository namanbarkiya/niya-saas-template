import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { create } from "zustand";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
}

export interface Modal {
  id: string;
  isOpen: boolean;
  component: React.ComponentType<unknown> | null;
  props?: Record<string, unknown>;
}

export interface UIState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  notifications: Notification[];
  modals: Modal[];
  loadingStates: Record<string, boolean>;
}

export interface UIStore extends UIState {
  // Theme actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleTheme: () => void;

  // Sidebar actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Notification actions
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Notification service methods that show Sonner toasts
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;

  // Modal actions
  openModal: (
    id: string,
    component: React.ComponentType<unknown>,
    props?: Record<string, unknown>
  ) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  // Loading states
  setLoading: (key: string, loading: boolean) => void;
  clearLoading: (key: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: "system",
      sidebarOpen: false,
      notifications: [],
      modals: [],
      loadingStates: {},

      // Theme actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
      },

      // Sidebar actions
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },

      // Notification actions
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: new Date(),
        };
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
      },
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      clearNotifications: () => set({ notifications: [] }),

      // Notification service methods that show Sonner toasts
      showSuccess: (title: string, message?: string, duration?: number) => {
        // Add to store
        const notification = {
          type: "success" as const,
          title,
          message: message || "",
          duration,
        };
        get().addNotification(notification);

        // Show Sonner toast
        toast.success(title, {
          description: message,
          duration: duration || 4000,
        });
      },

      showError: (title: string, message?: string, duration?: number) => {
        // Add to store
        const notification = {
          type: "error" as const,
          title,
          message: message || "",
          duration,
        };
        get().addNotification(notification);

        // Show Sonner toast
        toast.error(title, {
          description: message,
          duration: duration || 5000,
        });
      },

      showWarning: (title: string, message?: string, duration?: number) => {
        // Add to store
        const notification = {
          type: "warning" as const,
          title,
          message: message || "",
          duration,
        };
        get().addNotification(notification);

        // Show Sonner toast
        toast.warning(title, {
          description: message,
          duration: duration || 6000,
        });
      },

      showInfo: (title: string, message?: string, duration?: number) => {
        // Add to store
        const notification = {
          type: "info" as const,
          title,
          message: message || "",
          duration,
        };
        get().addNotification(notification);

        // Show Sonner toast
        toast.info(title, {
          description: message,
          duration: duration || 4000,
        });
      },

      // Modal actions
      openModal: (id, component, props) => {
        set((state) => ({
          modals: [
            ...state.modals.filter((m) => m.id !== id),
            { id, isOpen: true, component, props },
          ],
        }));
      },
      closeModal: (id) => {
        set((state) => ({
          modals: state.modals.map((m) =>
            m.id === id ? { ...m, isOpen: false } : m
          ),
        }));
      },
      closeAllModals: () => set({ modals: [] }),

      // Loading states
      setLoading: (key, loading) => {
        set((state) => ({
          loadingStates: { ...state.loadingStates, [key]: loading },
        }));
      },
      clearLoading: (key) => {
        set((state) => {
          const newLoadingStates = { ...state.loadingStates };
          delete newLoadingStates[key];
          return { loadingStates: newLoadingStates };
        });
      },
    }),
    {
      name: "ui-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
