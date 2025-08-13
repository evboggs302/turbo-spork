import { forwardRef } from "react";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export const FixedHeader = () => (
  <TableRow style={{ background: "black" }}>
    <TableCell sx={{ textAlign: "center" }}>First Name</TableCell>
    <TableCell sx={{ textAlign: "center" }}>Last Name</TableCell>
    <TableCell sx={{ textAlign: "center" }}>City</TableCell>
    <TableCell sx={{ textAlign: "center" }}>Degree</TableCell>
    <TableCell sx={{ textAlign: "center" }}>Specialties</TableCell>
    <TableCell sx={{ textAlign: "center" }}>Years of Experience</TableCell>
    <TableCell sx={{ textAlign: "center" }}>Phone Number</TableCell>
  </TableRow>
);

export const CustomScroller = forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer component={Paper} {...props} ref={ref} />
));
CustomScroller.displayName = "CustomScroller";

export const CustomTableHead = forwardRef<HTMLTableSectionElement>(
  (props, ref) => <TableHead {...props} ref={ref} />
);
CustomTableHead.displayName = "CustomTableHead";

export const CustomTableBody = forwardRef<HTMLTableSectionElement>(
  (props, ref) => <TableBody {...props} ref={ref} />
);
CustomTableBody.displayName = "TableBody";
