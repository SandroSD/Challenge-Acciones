import { TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { blue } from "@material-ui/core/colors";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: blue[800],
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: blue[50],
    },
  },
}))(TableRow);
