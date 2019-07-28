import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Sending request');
    const modifiedRequest = req.clone({headers: req.headers.append('InterceptedKey', 'InterceptedValue')});
    return next.handle(modifiedRequest).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('Response Received. Response Body is');
        console.log(event.body);
      }
    }));
  }

}
