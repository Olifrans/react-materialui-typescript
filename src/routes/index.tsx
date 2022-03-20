import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRouter = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
     
      {
        icon: "home",
        path: "/home",
        label: "Home",
      },

      {
        icon: "star",
        path: "/sobre",
        label: "Sobre",
      },





    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}
          >
            toggleDrawer
          </Button>
        }
      />
      {/* <Route path="/pagina-inicial" element={<p>Home</p>} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
