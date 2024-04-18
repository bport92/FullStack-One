import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }
  
  private apiBaseUrl = 'http://localhost:3000/api';

  getTrip(): Observable<Trip[]> { 
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);  
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, formData);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${formData.code}`, formData);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}