import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary">Teste</Button>} />
      {/* <Route path="/pagina-inicial" element={<p>Home</p>} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
