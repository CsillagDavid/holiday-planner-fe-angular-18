import { TravelDay } from "./travel-day.model";

export interface Plan {
  id: number;
  name: string;
  travelFrom: Date;
  travelTo: Date;
  travelDays: TravelDay[];
}