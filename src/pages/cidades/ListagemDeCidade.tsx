import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDepagina } from "../../shared/layouts";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableFooter,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CidadesServices,
  IListagemCidade,
} from "../../shared/services/api/cidades/CidadesServices";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  //-------------------------Pagination
  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);
  //----------------------End Pagination

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  //* -------------------------Ação do botão delete */
  const handleDelete = (id: number) => {
    if (confirm("Deseja apagar o dado?")) {
      CidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          alert("Registro apagado com sucesso.");
        }
      });
    }
  };

  return (
    <LayoutBaseDepagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          //-------------------------Editar detelhes da cidade
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
          //-------------------------Pagination
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome da Cidade</TableCell>
              <TableCell>Sigla Estado</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {/* -------------------------Ação dos botões */}
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  {/* -------------------------End ação dos botões */}
                </TableCell>
                <TableCell>{row.nomeCidade}</TableCell>
                <TableCell>{row.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {/*-------------------------Pagination*/}
            {totalCount > 0 && totalCount > Environment.LIMETE_DElINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMETE_DElINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
            {/*-------------------------End Pagination*/}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDepagina>
  );
};
