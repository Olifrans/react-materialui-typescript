import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard } from "../pages";

export const AppRouter = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home",
      },

      // {
      //   icon: "star",
      //   path: "/sobre",
      //   label: "Sobre",
      // },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
