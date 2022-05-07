import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  Dashboard,
  DetalheDeCidade,
  DetalheDePessoas,
  ListagemDeCidade,
} from "../pages";
import { ListagemDePessoas } from "../pages/pessoas/ListagemDePessoas";

// import { DetalheDePessoas } from "../pages/pessoas/DetalheDePessoas";
// import { DetalheDeCidade } from "../pages/cidades/DetalheDeCidade";

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
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

      <Route path="/cidades" element={<ListagemDeCidade />} />
      {/* <Route path="/cidades/detalhe/:id" element={<DetalheDeCidade />} /> */}

      {/* <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidade />} />  */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
