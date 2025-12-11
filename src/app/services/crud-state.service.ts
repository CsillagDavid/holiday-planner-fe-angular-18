import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CrudState } from "../api/enums/crud-state.enum";

@Injectable()
export class CrudStateService {
    private CrudState: CrudState = CrudState.READ;
    private CrudState$ = new BehaviorSubject<CrudState>(this.CrudState);

    constructor() {
        this.initializeValues();
    }

    getCrudState(): Observable<CrudState> {
        return this,this.CrudState$.asObservable();
    }

    setState(newState: CrudState) {
        this.CrudState = newState;
        this.CrudState$.next(newState);
    }

    // setState(f: () => CrudState){
    //     this.CrudState = f();
    // }

    initializeValues() {
        this.CrudState = CrudState.READ;
    }
}