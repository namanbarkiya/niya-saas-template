import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { User } from "../user-store";

// User authentication atoms
export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<unknown | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const isAuthenticatedAtom = atom<boolean>(false);

// User preferences atoms
export const themeAtom = atomWithStorage<"light" | "dark" | "system">(
  "theme",
  "system"
);
export const systemThemeAtom = atom<"light" | "dark">("light");
export const languageAtom = atomWithStorage<string>("language", "en");
export const notificationsAtom = atomWithStorage<boolean>(
  "notifications",
  true
);

// Form state atoms
export const formErrorsAtom = atom<Record<string, string[]>>({});
export const formLoadingAtom = atom<boolean>(false);
export const formDataAtom = atom<Record<string, unknown>>({});

// Navigation state atoms
export const sidebarOpenAtom = atom<boolean>(false);
export const currentRouteAtom = atom<string>("/");

// Derived atoms
export const effectiveThemeAtom = atom((get) => {
  const theme = get(themeAtom);
  if (theme === "system") {
    return get(systemThemeAtom);
  }
  return theme;
});

export const userProfileAtom = atom((get) => {
  const user = get(userAtom);
  return user
    ? {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      }
    : null;
});
