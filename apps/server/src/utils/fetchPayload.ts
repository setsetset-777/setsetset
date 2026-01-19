import log from "./log.ts";

export type FetchData = Promise<Record<string, any>>;
type Locale = string;

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

const getPayloadToken = async () => {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${process.env.PAYLOAD_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.PAYLOAD_SERVICE_USER,
        password: process.env.PAYLOAD_SERVICE_PASSWORD,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to login to Payload");
    }

    const data = await res.json();
    cachedToken = data.token;
    tokenExpiresAt = data.exp * 1000;

    return cachedToken;
  } catch (e) {
    throw `getPayloadToken failed: ${e}`;
  }
};

/**
 * Fetches a record from PayloadCMS
 * Default to a collection type
 */
export const fetchPayload = async (
  slug: string,
  type?: "global" | "collection" | "auth" | null,
  locale?: Locale,
): FetchData => {
  const token = await getPayloadToken();

  type Params = {
    locale?: Locale;
  };

  let params: Params = {};

  if (["global", "collection"].includes(type as string)) {
    params.locale = locale;
  }

  let path = "/";

  if (type === "global") {
    path += "globals/";
  }

  path += slug;

  if (Object.keys(params).length > 0) {
    path += `?${Object.entries(params).map(([k, v]) => `${k}=${v}`)}`;
  }

  const url = `${process.env.PAYLOAD_API_URL}${path}`;

  console.log("fetchPaylod", slug, type, locale, url);

  log.info(`Fetching data with ${url}`);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          process.env.NODE_ENV !== "development" ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw `Something went wrong while fetching data with ${url}`;
    }

    const data = await res.json();
    log.info(`Data received for ${url}: ${JSON.stringify(data)}`);
    return data;
  } catch (e) {
    throw `fetchPayload failed: ${e}`;
  }
};

/**
 * Fetches a global from PayloadCMS
 */
export const fetchGlobal = async (path: string, locale?: string): FetchData =>
  fetchPayload(path, "global", locale);

export const fetchCollection = async (
  path: string,
  locale?: string,
): FetchData => fetchPayload(path, "global", locale);

export const fetchPage = async (path: string, locale?: string) => {
  return fetchGlobal(path, locale) ?? fetchCollection(path, locale);
};
