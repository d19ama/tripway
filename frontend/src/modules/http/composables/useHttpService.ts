interface UseHttpServiceReturn {
  getData: <RETURN>(url: string) => Promise<RETURN | undefined>;
  postData: <RETURN, BODY extends RETURN = RETURN>(url: string, body: BODY) => Promise<RETURN | undefined>;
  patchData: <RETURN, BODY extends Partial<RETURN> = Partial<RETURN>>(url: string, body: BODY) => Promise<RETURN | undefined>;
  deleteData: (url: string) => Promise<boolean>;
}

export function useHttpService(): UseHttpServiceReturn {
  const DEFAULT_HEADERS: HeadersInit = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  async function getData<RETURN>(url: string): Promise<RETURN | undefined> {
    const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'GET',
    });

    return response.ok
      ? await response.json()
      : undefined;
  }

  async function postData<RETURN, BODY extends RETURN = RETURN>(url: string, body: BODY): Promise<RETURN | undefined> {
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

  async function patchData<RETURN, BODY extends Partial<RETURN> = Partial<RETURN>>(url: string, body: BODY): Promise<RETURN | undefined> {
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
