import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemDeCidade } from "../pages";
import { ListagemDePessoas } from "../pages/pessoas/ListagemDePessoas";

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
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
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
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/cidades" element={<ListagemDeCidade />} />
      {/* <Route path="/pessoas/detalhe/:id" element={<ListagemDePessoas />} /> */}
      {/* <Route path="/cidades/detalhe/:id" element={<ListagemDeCidade />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
