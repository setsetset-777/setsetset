import log from "./log.ts";

export type FetchData = Promise<Record<string, any>>;
/**
 * Fetches a record from PayloadCMS
 * Default to a collection type
 */
export const fetchPayload = async (
  slug: string,
  type: "global" | "collection" | "auth" = "collection",
): FetchData => {
  let path = "/";
  if (type === "global") {
    path += "globals/";
  }
  path += slug;
  const url = `${process.env.PAYLOAD_API_URL}${path}`;
  try {
    log.info(`Fetching data with ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    log.info(`Data received for ${url}: ${JSON.stringify(data)}`);
    return data;
  } catch (e) {
    throw `Something went wrong while fetching data with ${url}: ${e}`;
  }
};

/**
 * Fetches a global from PayloadCMS
 */
export const fetchGlobal = async (path: string): FetchData =>
  fetchPayload(path, "global");
