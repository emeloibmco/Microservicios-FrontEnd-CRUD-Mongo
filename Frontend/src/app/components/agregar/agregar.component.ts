import { Component, OnInit, Query } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public form = {
    nombre: null,
    apellido: null,
    direccion: null,
    ciudad: null,
    fecha: null,
    valor: null,
    tipo: null,
    cedular: null
  }

  constructor(private queryService: QueryService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {

    this.queryService.createTransaction(this.form).subscribe(
      res => {
        console.log(res);
       },
       error => {
         console.error(error);
       });

    this.router.navigate(['/inicio']);

  }
}
