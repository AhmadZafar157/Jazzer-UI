import * as CryptoJS from 'crypto-js';
const OBJ_ENC_KEY = "7061737323313288";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class JazzerService {
	
	baseFormType: string = "default";
	private API_URL = "http://localhost:3000/";
	private secret = 'ahmadzafar55'
	loader = new BehaviorSubject<Boolean>(false);
	baseChange = new BehaviorSubject<any>(0);
	campaignChange = new BehaviorSubject<any>(0);

	constructor(private http: HttpClient) { }

	decrypt(ciphertext: any) {
		var bytes = CryptoJS.AES.decrypt(ciphertext, this.secret);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	}

	encrypt(password: any) {
		return CryptoJS.AES.encrypt(JSON.stringify(password), this.secret).toString();
	}

	openBaseForm(formType: string) {
		this.baseFormType = formType;
	}
	getBaseForm() {
		return this.baseFormType
	}

	getTeamById(team_id: any): Observable<any> {
		return this.http.get<any>(
			this.API_URL + "team/" + team_id,
		);
	}

	public signup(payload: any): Observable<any> {
		return this.http.post<any>(
			this.API_URL + "signup",
			payload
		);
	}
	public getTeam(): Observable<any> {
		return this.http.get<any>(
			this.API_URL + "teams"
		);
	}
	public login(payload: any): Observable<any> {
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
	public deleteTeam(id: any): Observable<any> {
		return this.http.delete(
			this.API_URL + "team/" + id
		);
	}
	public getAllCampaigns(): Observable<any> {
		return this.http.get(
			this.API_URL + "campaigns"
		);
	}
	public getAllTeams(): Observable<any> {
		return this.http.get(
			this.API_URL + "teams"
		);
	}

	public createCampaign(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `campaign`,
			payload
		);
	}
	public createTeam(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `team`,
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

	public parkRequest(payload: any): Observable<any> {
		return this.http.post(
			this.API_URL + `requestApproval/${payload._id}`,
			{}
		);
	}
}