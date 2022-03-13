import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRouter />
        Olifrans Olifrans
      </div>
    </BrowserRouter>
  );
};
