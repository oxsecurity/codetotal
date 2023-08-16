import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC, useCallback } from "react";
import { BiSend } from "react-icons/bi";

export const SubmitButton: FC<SubmitButtonProps> = ({ loading, ...props }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      props.onClick && props.onClick(e);
    },
    [props]
  );

  return (
    <Button
      type="submit"
      {...props}
      onClick={handleClick}
      endIcon={
        loading ? (
          <CircularProgress
            color="inherit"
            size="small"
            sx={{ width: "1em", height: "1em" }}
          />
        ) : (
          <BiSend />
        )
      }
    />
  );
};

interface SubmitButtonProps extends Omit<ButtonProps, "startIcon" | "endIcon"> {
  loading: boolean;
}
