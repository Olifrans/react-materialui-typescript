import { Api } from "../axios-config";
import { Environment } from "../../../environment";

interface IListagempessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

interface IDetalhepessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

type TPessoasComTotalCount = {
  data: IListagempessoa[];
  totalCount: number;
};



const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMETE_DElINHAS}&nomeCompleto_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);
    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMETE_DElINHAS
        ),
      };
    }
    return new Error("Erro ao listar os registros de usuarios");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao listar os registros de usuarios"
    );
  }
};



const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const PessoasServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
