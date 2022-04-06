import { Api } from "../axios-config";
import { Environment } from "../../../environment";

export interface IListagemCidade {
  id: number;
  nomeCidade: string;
  estado: string;
  pessoaId: number;
}

export interface IDetalheCidade {
  id: number;
  nomeCidade: string;
  estado: string;
  pessoaId: number;
}

type TCidadeComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TCidadeComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMETE_DElINHAS}&nomeCidade_like=${filter}`;

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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registros de usuario");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao consultar o registros de usuario"
    );
  }
};

const create = async (
  dados: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>("/cidades", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registros de usuario");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao criar o registros de usuario"
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao atualizar o registros do usuario"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao excluir o registros do usuario"
    );
  }
};

export const CidadesServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
