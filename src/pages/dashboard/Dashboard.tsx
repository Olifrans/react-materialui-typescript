import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDepagina
      titulo="Home"
      barraDeFerramentas={
        <FerramentasDaListagem 
          mostrarInputBusca 
          textoBotaoNovo='Nova' 
        />
      }
    >
      A casa da benção
    </LayoutBaseDepagina>
  );
};
