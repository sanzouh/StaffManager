import { createContext, useContext } from "react";
import { useEmployes } from "@/hooks/useEmployes";

type EmployesContextType = ReturnType<typeof useEmployes>;

export const EmployesContext = createContext<EmployesContextType>(
	{} as EmployesContextType,
);

export const useEmployesContext = () => useContext(EmployesContext);
