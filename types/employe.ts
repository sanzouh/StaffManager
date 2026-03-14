import type {
	Employe,
	EmployeInsert,
	EmployeUpdate,
} from "@/lib/database.types";

export type { Employe, EmployeInsert, EmployeUpdate };

export type Observation = "médiocre" | "moyen" | "grand";

export interface EmployeWithObs extends Employe {
	observation: Observation;
}
