import { environment } from "../../environments/environment";

const BASE = environment.baseUrl;

export const ApiRoutes = {
  auth : {
    login: `${BASE}/api/auth/login`,
    loginWithCookie: `${BASE}/api/auth/loginWithCookie`,
    logout: `${BASE}/api/auth/logout`,
    checkAuth: `${BASE}/api/auth/check-auth`
  },
  user: {
    getCurrentUserInfo: `${BASE}/api/user`
  },
  plan: {
    getAll: `${BASE}/api/plan/all`,
    getById: (planId: number) => `${BASE}/api/plan/${planId}`,
    upsertTravelDay: (planId: number) => `${BASE}/api/plan/${planId}/travelDay`,
    getByUser: `${BASE}/api/plan`,
  },
  travelDay: {
    getById: (travelDayId: number) => `${BASE}/travelDay/${travelDayId}`,
  },
  destination: {

  },
  activity: {
    update: `${BASE}/api/activity`,
    updateActivities: `${BASE}/api/activity/bulkUpdate`,
  },
  destinations: (planId: number) => `${BASE}/plans/${planId}/destinations`,
  activities: (destinationId: number) => `${BASE}/destinations/${destinationId}/activities`,
  costs: (activityId: number) => `${BASE}/activities/${activityId}/costs`
};
