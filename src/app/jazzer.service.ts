import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class JazzerService {
	private API_URL = "http://localhost:3000/";

	constructor(private http: HttpClient) {}

	public signup(payload:any): Observable<any> {
		return this.http.post<any>(
			this.API_URL + "signup",
			payload
		);
	}
	
	public login(payload:any): Observable<any> {
		return this.http.post(
			this.API_URL + "login",
			payload
		);
	}

	public getAll_TD_credentials(): Observable<any> {
		return this.http.get(
			this.API_URL + "tdcredentials"
		);
	}

	public connectTD(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `connect/${payload._id}`,
			{}
		);
	}

	public disconnectTD(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `disconnect/${payload._id}`,
			{}
		);
	}

	public addNewTDCredential(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `tdcredential`,
			payload
		);
	}
	
	public getAllBases(): Observable<any> {
		return this.http.get(
			this.API_URL + "bases"
		);
	}

	public getAllCampaigns(): Observable<any> {
		return this.http.get(
			this.API_URL + "campaigns"
		);
	}

	public createCampaign(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `campaign`,
			payload
		);
	}

	public createBase(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `base`,
			payload
		);
	}

	public getCurrentUser(): Observable<any> {
		return this.http.get(
			this.API_URL + "user"
		);
	}

	public execute(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `runCampaign/${payload._id}`,
			{}
		);
	}
}