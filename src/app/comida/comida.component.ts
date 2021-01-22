import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comida } from '../model/comida.model';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  formComida: FormGroup;
  id: string | undefined;
  constructor(private formBuilder: FormBuilder, private comidas: ComidaService, private route: ActivatedRoute, private router: Router) {
    this.formComida = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.route.params.subscribe(parameters => {
      if (parameters.id){
        console.log(parameters.id);
        this.id = parameters.id;
        this.comidas.getSingleComida(parameters.id).subscribe((res) => {
          this.formComida.get('nombre')?.setValue(res.nombre);
          this.formComida.get('categoria')?.setValue(res.categoria);
          this.formComida.get('descripcion')?.setValue(res.descripcion);
        });
      }
    });

  }

  ngOnInit(): void {
  }

  saveClick(): void{
    const data = new Comida();
    data.nombre = this.formComida.get('nombre')?.value;
    data.categoria = this.formComida.get('categoria')?.value;
    data.descripcion = this.formComida.get('descripcion')?.value;
    if (this.id){
      this.comidas.updateComida(this.id, data).subscribe(() => {
        this.router.navigate(['list']);
      }, error => {
        console.log('No se pudo actualizar');
      }
    );
    }else{
      this.comidas.saveComida(data).subscribe(() => {
        alert('elementos guardado con exito');
      }, error => {
        console.log('error al insertar');
      });
    }
  }

}
