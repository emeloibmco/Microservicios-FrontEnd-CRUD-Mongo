import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { Clientmodel} from '../../services/clientmodel';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [QueryService]

})
export class ListaComponent implements OnInit {

  constructor(public queryservice: QueryService, private http: HttpClient) { }

  ngOnInit() {
    this.getClients();
  }

  public getClients(){
    console.log('entro');
    this.queryservice.getClient()
    .subscribe(res => {
      console.log('Respuesta recibida');
      this.queryservice.client = res as Clientmodel[];
      console.log(res);
    },
    (err) => console.log(err),
    );
  }

  public deleteData(id){
    this.queryservice.deleteTransaction(id).subscribe(res => {
      console.log('Respuesta recibida');
      console.log(res);
    },
      (err) => console.log(err),
    );
  }
}
