import { ProgrammingLanguage } from "@ct/shared-types";
import {
  Autocomplete,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FC, SyntheticEvent, useCallback } from "react";
import { loadAllLanguages } from "../actions/language-actions";
import { useLanguagesStore } from "../stores/languages-store";
import { LanguageIcon } from "./LanguageIcon";

export const LanguageSelector: FC<LanguageSelectorProps> = ({
  detectedLanguage,
  userSelectedLanguage,
  onChange,
  onClear,
}) => {
  const theme = useTheme();
  const { languages, loading } = useLanguagesStore();

  const handleChange = useCallback(
    (
      event: SyntheticEvent,
      newValue: ProgrammingLanguage | null,
      reason: string
    ) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Backspace" &&
        reason === "removeOption"
      ) {
        return;
      }
      onChange(newValue || undefined);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (_: SyntheticEvent, __: string, reason: string) => {
      if (reason === "clear") {
        onClear();
      }
    },
    [onClear]
  );

  return (
    <Autocomplete
      fullWidth
      size="small"
      value={userSelectedLanguage || detectedLanguage || null}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onOpen={loadAllLanguages}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.displayName}
      options={languages}
      loading={loading}
      PaperComponent={(props) => (
        <Paper {...props} sx={{ borderRadius: "4px" }} />
      )}
      renderOption={(props, option) => (
        <ListItem {...props}>
          <ListItemIcon
            sx={{ minWidth: "auto", paddingInlineEnd: theme.spacing(2) }}
          >
            <LanguageIcon language={option} />
          </ListItemIcon>
          <ListItemText>{option.displayName}</ListItemText>
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select language"
          InputProps={{
            ...params.InputProps,
            style: { paddingInlineStart: 16 },
            startAdornment: (
              <LanguageIcon
                language={userSelectedLanguage || detectedLanguage}
              />
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

interface LanguageSelectorProps {
  detectedLanguage?: ProgrammingLanguage;
  userSelectedLanguage?: ProgrammingLanguage;
  onChange(newValue?: ProgrammingLanguage): void;
  onClear(): void;
}
