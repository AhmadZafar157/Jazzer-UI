import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { JazzerService } from "./jazzer.service";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private _snackBar: MatSnackBar,
		private jazzerService: JazzerService
	) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): any {
		const access_token = localStorage.getItem('token') as string;
		// console.log('token -> ' + access_token);
		if (access_token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${access_token}`,
				},
			});

			this.jazzerService.loader.next(true);

		} else {
			this._snackBar.open("Invalid or expired token, Please login again!", "", {
				duration: 3000
			});
			this.router.navigate(["/login"]);
		}

		return next.handle(request).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					this.jazzerService.loader.next(false);
					// Handle successful response
					const { body } = event;

					if (body.statusCode == 200) {
						this._snackBar.open(body.message, "", {
							duration: 3000
						});
					} else {
						this._snackBar.open(body.message, "", {
							duration: 3000
						});
					}
				}
			}),
			catchError<any, any>((err) => {
				console.log(err);

				this.jazzerService.loader.next(false);

				// token expired or removed
				if (err.status == 401) {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					this.router.navigate(['/login']);
				}

				this._snackBar.open("Something went wrong while making API call!", "", {
					duration: 3000
				});
			})
		);
	}
}