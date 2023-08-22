import {
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CSSProperties, Fragment, ReactNode } from "react";
import { makeStyles } from "tss-react/mui";

export const ResponsiveTable = <P extends object>({
  options,
  data,
}: ResponsiveTableProps<P>) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { cells } = options;

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 3 }}>
        {options.emptyMessage}
      </Typography>
    );
  }

  if (!matches) {
    return (
      <List>
        {data.map((row, index) => (
          <ListItem
            key={index}
            divider={index < data.length - 1}
            className={classes.listItem}
          >
            <div className={classes.listItemContent}>
              {cells.map((cell, cellIndex) => (
                <div key={cellIndex}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="p"
                  >
                    {cell.label}
                  </Typography>
                  {cell.key && (
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {row[cell.key]}
                    </Typography>
                  )}
                  {cell.cellRenderer && <>{cell.cellRenderer(row)}</>}
                </div>
              ))}
            </div>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <TableContainer>
      <Table padding="normal" style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {cells.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={classes.headerCell}
                style={cell.headerCellStyle}
              >
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className={classes.tableRow}>
              {cells.map((cell, cellIndex) => (
                <Fragment key={cellIndex}>
                  {cell.key && (
                    <TableCell
                      className={cx(
                        classes.bodyCell,
                        (row[cell.key] as string | number).toString().length <
                          20 && classes.keepAll
                      )}
                      style={cell.cellStyle}
                    >
                      {row[cell.key]}
                    </TableCell>
                  )}
                  {cell.cellRenderer && (
                    <TableCell className={classes.bodyCell}>
                      {cell.cellRenderer(row)}
                    </TableCell>
                  )}
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  headerCell: {
    fontWeight: 400,
    fontSize: theme.typography.caption.fontSize,
  },
  bodyCell: {
    height: 50,
    padding: theme.spacing(1, 2),
    wordBreak: "break-word",
  },
  tableRow: {
    "&:last-of-type td": {
      borderBottom: "none",
    },
  },
  listItem: {
    padding: theme.spacing(2, 2, 3),
  },
  listItemContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  keepAll: {
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
  },
}));

interface ResponsiveTableProps<TData> {
  options: TableOptions<TData>;
  data: TData[];
}

export interface CellOptions<TData> {
  key?: keyof TData;
  label?: string;
  cellRenderer?: (row: TData) => ReactNode;
  headerCellStyle?: CSSProperties;
  cellStyle?: CSSProperties;
}

export interface TableOptions<TData> {
  emptyMessage: string;
  cells: CellOptions<TData>[];
}
