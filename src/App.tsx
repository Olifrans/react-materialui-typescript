import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <div className="App">
          <AppRouter />
          <div>
            <h1>Olifrans Olifrans</h1>
          </div>
        </div>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
