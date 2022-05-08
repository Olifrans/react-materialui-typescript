import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";
import { LinearProgress, TextField } from "@mui/material";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string;
  nomeCompleto: string;
  cidadeId: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const formRef = useRef<FormHandles>(null);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
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
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
        />
      }
    >
      {/* Form da Lib  Unform formulários leves e combináveis ​​com base em componentes ultraextensíveis. */}
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField name="nomeCompleto" />
        <VTextField name="email" />
        <VTextField name="cidadeId" />
      </Form>

      {/* {isLoading && <LinearProgress variant="indeterminate" />}
      <p>DetalheDePessoa {id}</p> */}
    </LayoutBaseDepagina>
  );
};
