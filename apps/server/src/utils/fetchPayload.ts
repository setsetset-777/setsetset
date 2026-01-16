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
  const response = await fetch(`${process.env.PAYLOAD_API_URL}${path}`);
  const data = await response.json();
  return data;
};

/**
 * Fetches a global from PayloadCMS
 */
export const fetchGlobal = async (path: string): FetchData =>
  fetchPayload(path, "global");
