import { Box, TextField, Button, Paper, useTheme, Icon, Divider } from "@mui/material";

interface IFerramentasDeDetalheProps {
  // textoDaBusca?: string;
  // mostrarInputBusca?: boolean;
  // aoMudarTextoDeBusca?: (novoTexto: string) => void;
  // textoBotaoNovo?: string;
  // mostrarBotaoNovo?: boolean;
  // aoClicarEmNovo?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = (
  {
    // textoDaBusca = "",
    // mostrarInputBusca = false,
    // aoMudarTextoDeBusca,
    // aoClicarEmNovo,
    // textoBotaoNovo = "Novo",
    // mostrarBotaoNovo = true,
  }
) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      <Button
        color="primary"
        disableElevation
        variant="contained"
        //onClick={aoClicarEmNovo}
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>

      <Button
        color="primary"
        disableElevation
        variant="outlined"
        //onClick={aoClicarEmNovo}
        startIcon={<Icon>save</Icon>}
      >
        Salvar e Voltar
      </Button>

      <Button
        color="primary"
        disableElevation
        variant="outlined"
        //onClick={aoClicarEmNovo}
        startIcon={<Icon>delete</Icon>}
      >
        Deletar
      </Button>

      <Button
        color="primary"
        disableElevation
        variant="outlined"
        //onClick={aoClicarEmNovo}
        startIcon={<Icon>add</Icon>}
      >
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />




      <Button
        color="primary"
        disableElevation
        variant="outlined"
        //onClick={aoClicarEmNovo}
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>



    // <Box

    // >
    //   {mostrarInputBusca && (
    //     <TextField
    //       size="small"
    //       value={textoDaBusca}
    //       placeholder="Pesquisar..."
    //       onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
    //     />
    //   )}

    //   <Box flex={1} display="flex" justifyContent="end">
    //     {mostrarBotaoNovo && (

    //     )}
    //   </Box>
    // </Box>
  );
};
