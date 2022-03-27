import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemDeCidade } from "../pages";

export const AppRouter = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home",
      },
      {
        icon: "location_city",
        path: "/cidades",
        label: "Cidades",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/cidades" element={<ListagemDeCidade />} />
      {/* <Route path="/cidades/detalhe/:id" element={<ListagemDeCidade />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
