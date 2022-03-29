import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesServices";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);


  
  useEffect(() => {
    CidadesServices.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    });
  }, [busca]);




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
