"use client";

import { AdvocatesContextProvider } from "./context/AdvocatesContext";
import { AdvocateTable } from "./components/AdvocateTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AdvocatesContextProvider>
        <main style={{ margin: "24px" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Solace Advocates
          </Typography>
          <AdvocateTable />
        </main>
      </AdvocatesContextProvider>
    </ThemeProvider>
  );
}
