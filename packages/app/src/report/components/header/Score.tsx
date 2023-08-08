import { Theme, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress/CircularProgress";
import { FC, LegacyRef } from "react";
import CountUp from "react-countup";
import { makeStyles } from "tss-react/mui";

const TIMEOUT_IN_SECONDS = 1;
const sharedProps: Partial<CircularProgressProps> = {
  variant: "determinate",
  thickness: 5,
};

export const Score: FC<ScoreProps> = ({
  value,
  color,
  ready,
  size,
  className,
}) => {
  const { classes } = useStyles();

  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        display: "inline-flex",
        color,
      }}
    >
      <CircularProgress
        {...sharedProps}
        size={size}
        value={value}
        classes={{
          circle: classes.circle,
        }}
        sx={{ zIndex: 1 }}
        color="inherit"
      />
      <div className={classes.centerAbsolute}>
        {/* The background for the "incomplete" CircularProgress above */}
        <CircularProgress
          {...sharedProps}
          size={size}
          value={100}
          className={classes.centerAbsolute}
          sx={{
            zIndex: 0,
            color: "#d9d9d9",
          }}
        />
        {ready && (
          <div
            style={{ textAlign: "center" }}
            className={classes.counterContainer}
          >
            <CountUp end={value} duration={TIMEOUT_IN_SECONDS}>
              {({ countUpRef }) => (
                <div
                  ref={countUpRef as LegacyRef<HTMLDivElement>}
                  className={classes.countUp}
                  style={{ color }}
                  data-cy="score"
                />
              )}
            </CountUp>
            <Typography
              variant="caption"
              color="text.secondary"
              className={classes.label}
            >
              Score
            </Typography>
          </div>
        )}
      </div>
    </Box>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  circle: {
    transitionDuration: `${TIMEOUT_IN_SECONDS}s`,
  },
  centerAbsolute: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: {
    textAlign: "center",
  },
  countUp: {
    fontSize: 20,
    [theme.breakpoints.up("sm")]: {
      fontSize: 35,
    },
    fontWeight: 700,
    lineHeight: 1,
  },
  label: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

interface ScoreProps extends Omit<CircularProgressProps, "color"> {
  value: number;
  ready: boolean;
  className?: string;
  color: string;
}
