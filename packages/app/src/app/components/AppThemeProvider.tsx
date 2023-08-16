import { Theme, lighten } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { FC, PropsWithChildren } from "react";
import { useAppStore } from "../stores/app-store";

const colors = {
  lightGrey: "#E5E5E5",
  primary: "#6837FF",
  darkPrimary: lighten("#6837FF", 0.7),
  darkRed: "#843131",
  red: "#D01502",
  yellow: "#FFC051",
  blue: "#5C94ED",
  green: "#33C600",
};

declare module "@mui/material/styles" {
  interface Palette {
    critical: Partial<Palette["primary"]>;
    high: Partial<Palette["primary"]>;
    medium: Partial<Palette["primary"]>;
    low: Partial<Palette["primary"]>;
    clean: Partial<Palette["primary"]>;
  }

  interface PaletteOptions {
    critical: Partial<Palette["primary"]>;
    high: Partial<Palette["primary"]>;
    medium: Partial<Palette["primary"]>;
    low: Partial<Palette["primary"]>;
    clean: Partial<Palette["primary"]>;
  }
}

const sharedProps: Partial<Theme> = {
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: "top",
      },
      styleOverrides: {
        tooltip: {
          fontWeight: 400,
          fontSize: "clamp(13px, 0.8rem, 20px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 15,
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...sharedProps,
  palette: {
    mode: "light",
    primary: { main: colors.primary },
    background: {
      default: colors.lightGrey,
    },
    critical: { main: colors.darkRed },
    high: { main: colors.red },
    medium: { main: colors.yellow },
    low: { main: colors.blue },
    clean: { main: colors.green },
  },
});

const darkTheme = createTheme({
  ...sharedProps,
  palette: {
    mode: "dark",
    primary: { main: colors.darkPrimary },
    critical: { main: colors.darkRed },
    high: { main: colors.red },
    medium: { main: colors.yellow },
    low: { main: colors.blue },
    clean: { main: colors.green },
  },
});

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { themeMode } = useAppStore();
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
