import { environment } from "../../environments/environment";

const BASE = environment.baseUrl;

export const ApiRoutes = {
  plans: {
    getAll: `${BASE}/plan/all`,
    getById: (planId: number) => `${BASE}/plan/${planId}`,
    getByUser: `${BASE}/plan`,
  },
  destinations: (planId: number) => `${BASE}/plans/${planId}/destinations`,
  activities: (destinationId: number) => `${BASE}/destinations/${destinationId}/activities`,
  costs: (activityId: number) => `${BASE}/activities/${activityId}/costs`
};
