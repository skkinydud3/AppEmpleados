import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../../interfaces/empleado';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private _endPoint: string = environment.endPoint;
  private _apiUrl: string = this._endPoint + "Empleados"

  constructor(private http: HttpClient) { }

  //Metodos

  //obtener los empleados
  getList(): Observable<IEmpleado[]>{
    return this.http.get<IEmpleado[]>(`${this._apiUrl}`);
  }

  //agregar un empleado
    add(request: IEmpleado): Observable<IEmpleado>{
    return this.http.post<IEmpleado>(`${this._apiUrl}/AgregarEmpleado`, request);
  }

  //actualizar un empleado
  update(request: IEmpleado): Observable<void>{
    return this.http.put<void>(`${this._apiUrl}/ModificarEmpleado/${request.noEmpleado}`, request);
  }

  //borrar un empleado
    delete(noEmpleado: number): Observable<void>{
    return this.http.delete<void>(`${this._apiUrl}/EliminarEmpleado/${noEmpleado}`);
  }
}
