import { useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";
import { LinearProgress } from "@mui/material";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();

  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const { debounce } = useDebounce();
  const navigate = useNavigate();

  //   const [rows, setRows] = useState<IListagemPessoa[]>([]);
  //   const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = () => {
    console.log("Save");
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasServices.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(`Alterando dados de: ${result.nomeCompleto}`);
          console.log(result);
        }
      });
    }
  }, [id]);

  //* -------------------------Ação do botão delete */
  const handleDelete = (id: number) => {
    if (confirm("Deseja apagar o dado?")) {
      PessoasServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso.");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDepagina
      titulo={id === "nova" ? "Cadastrando uma nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          //-------------------------Ação do botoes
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <p>DetalheDePessoa {id}</p>
    </LayoutBaseDepagina>
  );
};
