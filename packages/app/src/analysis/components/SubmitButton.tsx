import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

export const SubmitButton: FC<SubmitButtonProps> = ({ loading, ...props }) => {
  return (
    <Button
      {...props}
      endIcon={
        loading && (
          <CircularProgress
            color="inherit"
            size="small"
            sx={{ width: "1em", height: "1em" }}
          />
        )
      }
    />
  );
};

interface SubmitButtonProps extends ButtonProps {
  loading: boolean;
}
