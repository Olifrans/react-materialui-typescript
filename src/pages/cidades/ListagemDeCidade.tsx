import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  return (
    <LayoutBaseDepagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    ></LayoutBaseDepagina>
  );
};
