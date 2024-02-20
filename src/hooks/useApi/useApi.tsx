import { useEffect, useState } from "react";

interface TApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (body: any) => Promise<void>;
  putData: (body: any) => Promise<void>;
}

interface ICache {
  [key: string]: any;
}

const cache: ICache = {};

export function useApi<T>(key: string, url: string): TApiResponse<T> {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const defaultMethod = "GET";
  const fetchData = async (method: string, body?: any) => {
    try {
      const options: RequestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(`${process.env.REACT_APP_API}${url}`, options);

      cache[key] = await response.json();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (body: any) => {
    setIsLoading(true);
    await fetchData("POST", body);
  };

  const putData = async (body: any) => {
    setIsLoading(true);
    await fetchData("PUT", body);
  };

  useEffect(() => {
    fetchData(defaultMethod);
  }, [url]);

  return { data: cache[key], error, isLoading, postData, putData };
}

export const getFetchedData = (key: string) => cache[key];
