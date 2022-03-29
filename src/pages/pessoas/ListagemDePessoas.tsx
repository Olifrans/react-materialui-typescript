import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  
  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);



  useEffect(() => {
    PessoasServices.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    });
  }, [busca]);




  return (
    <LayoutBaseDepagina
      titulo="Listagem de pessoas"
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
