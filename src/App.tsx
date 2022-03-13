import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <div className="App">
          <AppRouter />
          Olifrans Olifrans
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};
