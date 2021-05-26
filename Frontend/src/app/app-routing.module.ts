import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListaComponent } from './components/lista/lista.component';


const routes: Routes =[
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio', component: BienvenidaComponent
  },
  {
    path: 'agregar', component: AgregarComponent
  },
  {
    path: 'verTransacciones', component: ListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
