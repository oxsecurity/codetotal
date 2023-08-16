import { IconButton, Tooltip } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const BackButton: FC = () => {
  const navigate = useNavigate();

  const navigateBack = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Tooltip arrow title="Back to homepage">
      <IconButton size="small" href="/" onClick={navigateBack}>
        <IoMdArrowBack />
      </IconButton>
    </Tooltip>
  );
};
