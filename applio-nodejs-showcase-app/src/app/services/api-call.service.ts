import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})


export class ApiCallService {
 

  constructor(private http: HttpClient ) {}

  getOccupationData(): Observable<[]>
    {
        return this.http.get<[]>('/getzonestate');
    }

    gettempratureData(): Observable<[]>
    {
      return this.http.get<[]>('/gettemperaturestate');
    }

    getblueprintsData(): Observable<[]>
    {
      return this.http.get<[]>('/getblueprints')
    }
}

