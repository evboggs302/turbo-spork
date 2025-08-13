import { type ChangeEventHandler, useCallback, useState } from "react";
import { SearchInput } from "./SearchInput";
import type { Advocate } from "@db/schema";
import { useAdvocatesContext } from "@app/context/AdvocatesContext";
import { clamp } from "ramda";
import { TableVirtuoso, TableVirtuosoProps } from "react-virtuoso";
import MuiTable from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  CustomScroller,
  CustomTableBody,
  CustomTableHead,
  FixedHeader,
} from "./TableComponents";

const customComponents: TableVirtuosoProps<any, unknown>["components"] = {
  Scroller: CustomScroller,
  Table: (props) => (
    <MuiTable {...props} style={{ borderCollapse: "separate" }} />
  ),
  TableHead: CustomTableHead,
  TableRow,
  TableBody: CustomTableBody,
};

export const AdvocateTable = () => {
  const { advocates, loading, error } = useAdvocatesContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  const resetSearch = useCallback(() => setSearchTerm(""), []);

  const filteredAdvocates = advocates.filter((advocate) => {
    const includedFields =
      advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.yearsOfExperience === Number(searchTerm) ||
      advocate.specialties.some((spc) =>
        spc.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return includedFields;
  });

  // This is a fixed height for teh virtulaized list that's calculated prior to render
  const height = clamp(120, 697, filteredAdvocates.length * 250 + 57);

  return (
    <>
      <SearchInput
        onChange={onChange}
        resetSearch={resetSearch}
        searchTerm={searchTerm}
      />
      <TableVirtuoso
        data-testid="filtered-advocates-table"
        style={{ height, width: "100%", overflow: "auto" }}
        data={filteredAdvocates}
        components={customComponents}
        fixedHeaderContent={FixedHeader}
        itemContent={(_index, advocate: Advocate) => (
          <>
            <TableCell sx={{ textAlign: "center" }}>
              {advocate.firstName}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {advocate.lastName}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>{advocate.city}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {advocate.degree}
            </TableCell>
            <TableCell sx={{ textAlign: "center", maxWidth: 220 }}>
              {advocate.specialties.join(", ")}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {advocate.yearsOfExperience}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {advocate.phoneNumber}
            </TableCell>
          </>
        )}
      />
    </>
  );
};
