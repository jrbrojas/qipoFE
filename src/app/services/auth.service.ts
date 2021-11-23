import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Auth, Login } from '../models/auth.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject!: BehaviorSubject<any>;

  public $currentUser!: Observable<any>;

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient, private utilService: UtilsService) {
    this.currentUserSubject = new BehaviorSubject<any>(this.utilService.getDataStore(this.utilService.nameStoreUser));
    this.$currentUser  = this.currentUserSubject.asObservable();

    //VALIDAR TOKEN

  }

  public login(login : Login): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/login`, login)
          .pipe(
            tap((data) => {
              this.utilService.createDataStore(this.utilService.nameStoreUser, data)
              this.currentUserSubject.next(data)
            }),
            catchError (e => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: e.error.message,
                showConfirmButton: false,
                timer: 2000
              })
              return throwError(() => e)
            })
          );
  }

  public loginT(login : Login){
    const user = '' //= lastValueFrom(this.loginSession(login));
    console.log(user);
    
  }

}
