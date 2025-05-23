import { Destination } from "./destination.model";

export interface TravelDay {
  id: number;
  name: string;
  travelDate: Date;
  startDayAt: string;
  destinations: Destination[];
}