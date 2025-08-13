import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler } from "react";

type SearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  resetSearch: () => void;
  searchTerm: string;
};

export const SearchInput = ({
  onChange,
  resetSearch,
  searchTerm,
}: SearchInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        margin: "14px auto",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "75%",
        }}
      >
        <InputLabel sx={{ width: 215 }}>Searching advocates:</InputLabel>
        <TextField
          placeholder={`ie. Doe, 8, or New York`}
          color={"primary"}
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={onChange}
        />
      </Box>
      <Button color="warning" onClick={resetSearch}>
        Reset Search
      </Button>
    </Box>
  );
};
