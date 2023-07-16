import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private _snackBar: MatSnackBar
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
		} else {
			this._snackBar.open("Invalid or expired token, Please login again!", "", {
				duration: 3000
			});
			this.router.navigate(["/login"]);
		}

		return next.handle(request).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				  // Handle successful response
				  const {body} = event;
				  console.log(body);
				  if (body.statusCode == 200) {
					this._snackBar.open(body.message, "", {
						duration: 3000
					  });
				  } else {
					console.log(body.error);
					this._snackBar.open(body.message, "", {
						duration: 3000
					});
				  }
				}
			}),
			catchError<any, any>((err) => {
				console.log(err.message);
				this._snackBar.open("Something went wrong while making API call!", "", {
					duration: 3000
				});
			})
		);
	}
}