//import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDepagina
      titulo="Home"
      barraDeFerramentas={
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
        // <FerramentasDaListagem
        //   mostrarInputBusca
        //   textoBotaoNovo='Nova'
        // />
      }
    >
      A casa da benção
    </LayoutBaseDepagina>
  );
};
