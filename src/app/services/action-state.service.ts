import { Injectable } from "@angular/core";
import { ActionState } from "../api/enums/action-state.enum";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ActionStateService {
    private actionState: ActionState = ActionState.Pending;
    private actionState$ = new BehaviorSubject<ActionState>(this.actionState);

    constructor() {
        this.initializeValues();
    }

    getActionState(): Observable<ActionState> {
        return this,this.actionState$.asObservable();
    }

    setState(newState: ActionState) {
        this.actionState = newState;
    }

    // setState(f: () => ActionState){
    //     this.actionState = f();
    // }

    initializeValues() {
        this.actionState = ActionState.Pending;
    }
}