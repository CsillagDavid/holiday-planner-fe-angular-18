import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiRoutes } from "../api/api-routes";
import { Activity } from "../api/models/activity.model";

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {

    constructor(private http: HttpClient) { }

    uploadImage(fd: FormData): Observable<number> {
        return this.http.post<number>(ApiRoutes.attachment.uploadImage, fd);
    }
}