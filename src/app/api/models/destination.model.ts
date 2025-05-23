import { Activity } from "./activity.model";

export interface Destination {
  id: number;
  name: string;
  destinationTypeCd: string;
  travelTime: string | null;
  durationTime: string;
  sortOrder: number;
  activities: Activity[];
}
