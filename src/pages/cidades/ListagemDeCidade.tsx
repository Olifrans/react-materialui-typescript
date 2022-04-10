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
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CidadesServices,
  IListagemCidade,
} from "../../shared/services/api/cidades/CidadesServices";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";



export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(1, busca).then((result) => {
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
                <TableCell>Ações</TableCell>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDepagina>
  );
};
