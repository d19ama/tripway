interface UseHttpServiceReturn {
  getData: <T>(url: string) => Promise<T | undefined>;
  postData: <T, K extends T = T>(url: string, body: K) => Promise<T | undefined>;
  patchData: <T, K extends T = T>(url: string, body: K) => Promise<T | undefined>;
  deleteData: (url: string) => Promise<boolean>;
}

export function useHttpService(): UseHttpServiceReturn {
  const DEFAULT_HEADERS: HeadersInit = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  async function getData<T>(url: string): Promise<T | undefined> {
    const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'GET',
    });

    return response.ok
      ? await response.json()
      : undefined;
  }

  async function postData<T, K extends T = T>(url: string, body: K): Promise<T | undefined> {
    const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        ...body,
      }),
    });

    return response.ok
      ? await response.json()
      : undefined;
  }

  async function patchData<T, K extends T = T>(url: string, body: K): Promise<T | undefined> {
    const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        ...body,
      }),
    });

    return response.ok
      ? await response.json()
      : undefined;
  }

  async function deleteData(url: string): Promise<boolean> {
    const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'DELETE',
    });

    return response.ok;
  }

  return {
    getData,
    postData,
    patchData,
    deleteData,
  };
}
