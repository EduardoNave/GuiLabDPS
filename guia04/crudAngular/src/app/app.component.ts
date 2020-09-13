import { Component } from '@angular/core';
import { Alumno } from './models/alumno';
import { ArticulosService } from './articulos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudAngular';

  // CRUD ANGULAR PHP Y MYSQL
  articulos = null;
  art = {
    codigo: 0,
    descripcion: null,
    precio: null,
    proveedor: null,
    fabricante: null
  }
  constructor(private articulosServicio: ArticulosService) { }
  ngOnInit() {
    this.recuperarTodos();
  }
  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result => this.articulos = result);
  }
  alta() {
    this.articulosServicio.alta(this.art).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
        this.art = { codigo: 0, descripcion: null, precio: null, proveedor: null, fabricante: null};
      }
    });
  }
  baja(codigo) {
    if (confirm('¿Esta seguro de elimiar el Registro?')) {
      this.articulosServicio.baja(codigo).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
        }
      });
    }
  }
  modificacion() {
    this.articulosServicio.modificacion(this.art).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
        this.art = { codigo: 0, descripcion: null, precio: null, proveedor: null, fabricante: null};
      }
    });
  }
  seleccionar(codigo) {
    this.articulosServicio.seleccionar(codigo).subscribe(result => this.art = result[0]);
  }
  hayRegistros() {
    return true;
  }
  
  // arreglo del tipo Alumno, que tiene 3 registro almacenados
  alumnoArray: Alumno[] = [
    { id: 1, name: "Alex", lastname: "Campos", age: 35, direction: "San Salvador", tel: 222020222, email: "alex.campos@udb.edu.sv"}
  ]
  //atributo selecAlumno del tipo Alumno, por lo tanto, puede almacenar un objeto
  selectedAlumno: Alumno = { id: 0, name: '', lastname: '', age: 0, direction: '', tel: 0, email: '' };
  //un método que no retorna nada “void”, recibe como parámetro una variable del
  //tipo Alumno, para ser asignada al atributo selectAlumno y poder ser mostrado
  // en pantalla.
  openForEdit(alumno: Alumno): void {
    this.selectedAlumno = alumno;
  }
  //método que no retorna nada “void”, NO recibe parámetro, pero realiza dos
  //operaciones agregar / editar, si no hay registro seleccionado se guarda,
  //de lo contrario limpia el atributo selectedAlumno en pantalla. [(ngModel)]
  addOrEdit(): void {
    if (this.selectedAlumno.id === 0) // INSERT
    {
      this.selectedAlumno.id = this.alumnoArray.length + 1;
      this.alumnoArray.push(this.selectedAlumno);
    }
    this.selectedAlumno = { id: 0, name: '', lastname: '', age: 0, direction: '', tel: 0, email: '' };
  }
  //método que no retorna nada “void”, NO recibe parámetro, elimina del arreglo el
  //registro, pero antes muestra en pantalla un confirmar, se recorre el arreglo
  //realizando un “filter” para no almacenar el registro seleccionado en el nuevo
  //arreglo “alumnoArray” , por eso ocupados el operador “!=” y luego limpiamos
  //el registro seleccionado.
  delete(): void {
    if (confirm('¿Esta seguro de elimiar el Registro?')) {
      this.alumnoArray = this.alumnoArray.filter(x => x != this.selectedAlumno);
      this.selectedAlumno = { id: 0, name: '', lastname: '', age: 0, direction: '', tel: 0, email: '' };
    }
  }
}