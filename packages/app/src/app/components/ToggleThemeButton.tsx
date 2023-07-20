import { IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AppStore, useAppStore } from "../stores/app-store";

export const ToggleThemeButton: FC = () => {
  const { themeMode } = useAppStore();

  const handleToggle = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    AppStore.setState({ themeMode: newThemeMode });
    localStorage.setItem("theme", newThemeMode);
  };

  return (
    <Tooltip title="Toggle light/dark mode" placement="top" arrow>
      <IconButton
        onClick={handleToggle}
        size="small"
        color="secondary"
        data-cy="toggle-theme"
      >
        {themeMode === "light" ? <MdDarkMode /> : <MdLightMode />}
      </IconButton>
    </Tooltip>
  );
};
