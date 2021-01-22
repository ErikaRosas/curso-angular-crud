import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Comida } from '../model/comida.model';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'nombre', 'categoria', 'descripcion', 'accion'];
  dataSource = new MatTableDataSource<Comida>();
  constructor(private comidas: ComidaService, private router: Router) {
      this.comidas.getComida().subscribe(res => {
      this.dataSource.data = res;
    });
  }
  ngOnInit(): void {
  }

  refresh(): void{
    this.comidas.getComida().subscribe(res => {
      this.dataSource.data = res;
    });
  }
  delete(id: string): void{
    this.comidas.deleteComida(id).subscribe(() => {
      this.refresh();
    }, err => {
      alert('ocurrio un eror');
    }
    );
  }

  edit(id: string): void{
    this.router.navigate(['comida', id]);
  }

}
