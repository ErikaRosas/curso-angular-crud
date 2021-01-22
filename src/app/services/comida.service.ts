import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comida } from '../model/comida.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http: HttpClient) { }

  getComida(): Observable<[Comida]>{
    return this.http.get<[Comida]>('https://super-rest.herokuapp.com/test/erika/');
  }

  saveComida(data: Comida): Observable<[Comida]>{
    return this.http.post<[Comida]>('https://super-rest.herokuapp.com/test/erika/', data);
  }

  updateComida(id: string, data: Comida): Observable<[Comida]>{
    return this.http.put<[Comida]>('https://super-rest.herokuapp.com/test/erika/' + id, data);
  }

  deleteComida(id: string): Observable<any>{
    return this.http.delete('https://super-rest.herokuapp.com/test/erika/' + id);
  }

  getSingleComida(id: string): Observable<Comida>{
    return this.http.get<Comida>('https://super-rest.herokuapp.com/test/erika/' + id);
  }
}
