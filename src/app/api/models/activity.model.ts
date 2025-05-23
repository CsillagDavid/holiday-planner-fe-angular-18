import { Cost } from "./cost.model";

export interface Activity {
  id: number;
  name: string;
  plannedDurationTime: string;
  sortOrder: number;
  costs: Cost[];
}