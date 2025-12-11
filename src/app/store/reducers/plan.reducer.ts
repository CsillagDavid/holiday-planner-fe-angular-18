import { createReducer } from "@ngrx/store";
import { Plan } from "../../api/models/plan.model";
import { ActionState } from "../../api/enums/action-state.enum";

export interface PlanState {
    plans: Plan[];
    actionState: ActionState;
}

const initialState = {
    plans: [],
    actionState: ActionState.Pending
} as PlanState;

export const planReducer = createReducer(initialState);