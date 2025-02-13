import { useState, useEffect } from "react";
import {
  fetchedDataInterface,
  transformedDataInterface,
} from "../utils/interface";

export function useFetch(
  apiUrl: string,
  fn: (data: fetchedDataInterface[]) => transformedDataInterface[]
): {
  fetchedData: transformedDataInterface[];
  isLoading: boolean;
  isError: boolean;
  setFetchedData: React.Dispatch<
    React.SetStateAction<transformedDataInterface[]>
  >;
} {
  const [fetchedData, setFetchedData] = useState<transformedDataInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        const results: transformedDataInterface[] = fn(data.results);

        setFetchedData(results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    })();
  }, [apiUrl]);
  return {
    fetchedData,
    isLoading,
    isError,
    setFetchedData,
  };
}
