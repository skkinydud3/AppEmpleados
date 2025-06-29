import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IEmpleado } from '../interfaces/empleado';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listaEmpleados: IEmpleado[] = [];
  idResultLoaded = false;
  isUpdateFormActive = false;
  isEditMode = false; 

  empleado: IEmpleado = {
    noEmpleado: 0,
    nombre: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    sexo: ''  
  };

  constructor(private _empleadoService: EmpleadoService) {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this._empleadoService.getList().subscribe({
      next: (data) => {
        this.listaEmpleados = data;
        this.idResultLoaded = true;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  guardarEmpleado() {
    if (this.isEditMode) {
      this.modificarEmpleado();
    } else {
      this.agregarEmpleado();
    }
  }

  agregarEmpleado() {
    const request: IEmpleado = {
      noEmpleado: 0, 
      nombre: this.empleado.nombre,
      correo: this.empleado.correo,
      telefono: this.empleado.telefono,
      fechaNacimiento: this.empleado.fechaNacimiento,
      sexo: this.empleado.sexo
    }
    
    this._empleadoService.add(request).subscribe({
      next: (data) => {
        console.log('Empleado agregado exitosamente');
        this.resetEmpleado();
        this.obtenerEmpleados();
      },
      error: (e) => {
        console.error('Error al agregar empleado:', e);
      },
    });
  }

  modificarEmpleado() {
    this._empleadoService.update(this.empleado).subscribe({
      next: () => {
        console.log('Empleado actualizado exitosamente');
        this.resetEmpleado();
        this.obtenerEmpleados();
      },
      error: (e) => {
        console.error('Error al actualizar empleado:', e);
      },
    });
  }

  eliminarEmpleado(empleado: IEmpleado) {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this._empleadoService.delete(empleado.noEmpleado).subscribe({
        next: () => {
          console.log('Empleado eliminado exitosamente');
          this.obtenerEmpleados();
        },
        error: (e) => {
          console.error('Error al eliminar empleado:', e);
        },
      });
    }
  }

  editarEmpleado(data: IEmpleado) {
    this.empleado = { ...data };
    this.isEditMode = true; 
  }

  cancelarEdicion() {
    this.resetEmpleado();
  }

  resetEmpleado() {
    this.empleado = {
      noEmpleado: 0,
      nombre: '',
      correo: '',
      telefono: '',
      fechaNacimiento: '',
      sexo: ''
    };
    this.isEditMode = false; 
  }
}