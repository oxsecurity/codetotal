import { Fade, Theme, darken, keyframes } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AnalysisStatus } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { usePrevious } from "../../common/hooks/usePrevious";
import { useReportStore } from "../stores/fe-report-store";

export const SuccessfulAnalysisNotice: FC = () => {
  const { classes } = useStyles();
  const { progress, status, score } = useReportStore();
  const prevStatus = usePrevious(status);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const noRisksFound = score === 0;
    const completed = status === AnalysisStatus.Completed;
    const justChanged = prevStatus === AnalysisStatus.Created;

    if (justChanged && completed && noRisksFound) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 10000);
    }
  }, [prevStatus, progress, status, score]);

  const handleClose = () => {
    setShow(false);
  };

  return createPortal(
    <Fade in={show} timeout={1000}>
      <div className={classes.container}>
        <div className={classes.circle}>
          🥰
          <br />
          You Rock!
          <br />
          No Issues Found
        </div>
        <Confetti style={{ overflow: "hidden", zIndex: 1 }} />
        <div
          className={classes.closeButton}
          role="button"
          onClick={handleClose}
        >
          <IoCloseOutline />
          <span>Close</span>
        </div>
      </div>
    </Fade>,
    document.body
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    zIndex: 11,
    display: "grid",
    placeItems: "center",
    background: "#000000AA",
  },
  circle: {
    width: 300,
    height: 300,
    display: "grid",
    placeItems: "center",
    background: `radial-gradient(${darken(theme.palette.success.light, 0.2)}, ${
      theme.palette.success.light
    })`,
    color: theme.palette.common.white,
    borderRadius: "50%",
    fontSize: 30,
    textAlign: "center",
    boxShadow: `0 0 25px 5px ${theme.palette.divider}`,
    zIndex: 20,
    "&:before": {
      zIndex: -1,
      position: "absolute",
      transformOrigin: "center center",
      content: "''",
      width: 300,
      height: 300,
      display: "block",
      borderRadius: "50%",
      backgroundColor: theme.palette.success.light,
      animation: `${keyframes`
      0% {
        opacity: .5;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(1.5);
      }
    `} 2s infinite ease-in-out`,
    },
  },
  closeButton: {
    display: "flex",
    flexDirection: "row-reverse",
    // gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    minWidth: "4rem",
    height: "4rem",
    // overflow: "hidden",
    position: "absolute",
    borderRadius: "100vh",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transition: theme.transitions.create("width"),
    fontSize: 20,
    paddingInline: theme.spacing(2),
    cursor: "pointer",

    "& > svg": {
      width: "2rem",
      height: "2rem",
    },

    "& > span": {
      transform: "scaleX(0)",
      transition: theme.transitions.create("all"),
      width: 0,
    },
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      "& > span": {
        width: "4rem",
        transform: "scaleX(1)",
      },
    },
  },
}));
