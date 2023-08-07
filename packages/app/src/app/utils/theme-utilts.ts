import { AppStore } from "../stores/app-store";

export const listenToColorSchemeChange = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      AppStore.setState({ themeMode: newColorScheme });
    });
};

export const isDarkModePreferred = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

export const initialMode = (): "light" | "dark" => {
  // First check local storage
  const localStorageTheme = localStorage.getItem("theme");
  const userSetMode =
    localStorageTheme === "dark" || localStorageTheme === "light"
      ? localStorageTheme
      : false;
  if (userSetMode) {
    return userSetMode;
  }

  // Check system prefs
  if (isDarkModePreferred()) {
    return "dark";
  }

  return "light";
};
