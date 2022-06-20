import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Profiles } from './models/profiles';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) {
  }

  findProfiles(){
    return this.httpClient.get<Profiles[]>(this.baseUrl + "findProfiles")
  }

  addProfile(values:Profiles){
    return this.httpClient.post<Profiles>(this.baseUrl + "addProfile",values)
  }

  deleteProfile(id:number){
    return this.httpClient.delete<Profiles>(this.baseUrl + "deleteProfile/" + id)
  }

  updateProfile(id:number, values:Profiles){
    return this.httpClient.put<Profiles>(this.baseUrl + "updateProfile/" + id, values)
  }
}

