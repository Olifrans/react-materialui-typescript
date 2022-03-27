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

const getById = async (id: number): Promise<IDetalhepessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

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
  dados: Omit<IDetalhepessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhepessoa>("/pessoas", dados);

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
  dados: IDetalhepessoa
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
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
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao excluir o registros do usuario"
    );
  }
};

export const PessoasServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
