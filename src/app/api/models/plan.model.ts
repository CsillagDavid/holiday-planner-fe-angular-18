import { TravelDay } from "./travel-day.model";

export interface Plan {
    id: number;
    name: string;
    indexPictureId?: number;
    description?: string;
    travelFrom: Date;
    travelTo: Date;
    travelDays: TravelDay[];
}