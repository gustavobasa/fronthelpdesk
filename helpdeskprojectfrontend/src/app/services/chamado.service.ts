import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChamadoDTO } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private base = `${API_CONFIG.baseUrl}/chamados`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<ChamadoDTO[]> {
    return this.http.get<ChamadoDTO[]>(this.base);
  }

  findById(id: number): Observable<ChamadoDTO> {
    return this.http.get<ChamadoDTO>(`${this.base}/${id}`);
  }

  create(obj: ChamadoDTO): Observable<any> {
    return this.http.post(this.base, obj, { observe: 'response', responseType: 'text' });
  }

  update(id: number, obj: ChamadoDTO): Observable<any> {
    return this.http.put(`${this.base}/${id}`, obj, { observe: 'response', responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response', responseType: 'text' });
  }
}
