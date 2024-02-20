import { useEffect, useState } from "react";

interface TApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (body: any) => Promise<void>;
}

export function useApi<T>(url: string): TApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
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

      const jsonData: T = await response.json();
      setData(jsonData);
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

  useEffect(() => {
    fetchData(defaultMethod);
  }, [url]);

  return { data, error, isLoading, postData };
}
