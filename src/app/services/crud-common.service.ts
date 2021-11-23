import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudOperations } from "../models/crud-common.model";


export abstract   class CrudCommonService<T, ID> implements CrudOperations<T, ID>  {

  private readonly _base = environment.API_URL +  this.getResourceUrl();

  constructor(protected _http: HttpClient) { }
  
  abstract getResourceUrl(): string;

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t)
      .pipe(
        catchError( e => {
          console.error(e.error.message);

          if (e.status = 400){
            return throwError(() => e)
          }

          return throwError(() => e)
        })
      )
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t, {})
      .pipe(
        catchError( e => {
          console.error(e.error.message);
          return throwError(() => e)
        })
      )
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`)
      .pipe(
        catchError( e => {
          console.error(e.error.message);
          return throwError(() => e)
        })
      )
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id)
      .pipe(
        catchError( e => {
          console.error(e.error.message);
          return throwError(() => e)
        })
      )
  }
}
