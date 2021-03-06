import axios from "axios";
import { Constituent } from "./types";

import config from "./config";

const DEFAULT_HEADERS = Object.freeze({
  Accept: "application/json",
});

const DEFAULT_AXIOS_CONFIG = Object.freeze({
  headers: DEFAULT_HEADERS,
});

// TODO
const ROOT_BACKEND_API_PATH = `${config.api_base_url}/item`;
const USE_BACKEND_API = process.env.REACT_APP_USE_BACKEND_API;

export const PATHS = Object.freeze({
  GET_CONSTITUENTS: "constituents",
});

const getAllConstituents = async (): Promise<Constituent[]> => {
  const url = `${ROOT_BACKEND_API_PATH}`;

  const response = await axios.get(url, DEFAULT_AXIOS_CONFIG);
  return response.data.Items as Constituent[];
};

const searchConstituents = async (
  emailQuery: string
): Promise<Constituent[]> => {
  const url = `${ROOT_BACKEND_API_PATH}/${emailQuery}`;

  const response = await axios.get(url, DEFAULT_AXIOS_CONFIG);
  return response.data.Items as Constituent[];
};

const ConstituentApiClient = Object.freeze({
  getAllConstituents,
  searchConstituents,
});

export default ConstituentApiClient;

const fakeData: Constituent[] = [
  {
    email: "goku@foo.com",
    firstName: "Goku",
    lastName: "Saiyan",
    zipCode: "92660",
  },
  {
    email: "frieza@foo.com",
    firstName: "Frieza",
    lastName: "フリーザ",
    zipCode: "namek-2242",
  },
  {
    email: "spartan117@unsc.gov",
    firstName: "John",
    lastName: "Spartan",
    zipCode: "92660",
  },
  {
    email: "wTheRockb@gmail.com",
    firstName: "Woody",
    lastName: '"The Rock" Butler',
    zipCode: "92660-0155",
  },
];
