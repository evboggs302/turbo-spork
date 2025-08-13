import type { Advocate } from "@db/schema";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type AdvocatesContextValue = {
  advocates: Advocate[];
  loading: boolean;
  error?: unknown;
};

export const AdvocatesContext = createContext<
  AdvocatesContextValue | undefined
>(undefined);

export const useAdvocatesContext = () => {
  const context = useContext(AdvocatesContext);

  if (!context) {
    throw new Error(
      "useAdvocatesContext must be used within a AdvocatesContext provider"
    );
  }

  return context;
};

export const AdvocatesContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    fetch("/api/advocates")
      .then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
        });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdvocatesContext.Provider value={{ advocates, loading, error }}>
      {children}
    </AdvocatesContext.Provider>
  );
};
