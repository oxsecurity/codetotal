import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";
import { BiSend } from "react-icons/bi";

export const SubmitButton: FC<SubmitButtonProps> = ({ loading, ...props }) => {
  return (
    <Button
      {...props}
      endIcon={<BiSend />}
      startIcon={
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

interface SubmitButtonProps extends Omit<ButtonProps, "startIcon" | "endIcon"> {
  loading: boolean;
}