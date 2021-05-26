import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Clientmodel} from './clientmodel';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  selectclients: Clientmodel;
  client: Clientmodel[];

  readonly URL_API_CREATE_TRANSACTION = 'http://65b071b7-us-south.lb.appdomain.cloud:8080/api/customers';
  readonly URL_API_GET_TRANSACTIONS = 'http://65b071b7-us-south.lb.appdomain.cloud:8080/api/customers';
  readonly URL_API_DELETE = 'http://65b071b7-us-south.lb.appdomain.cloud:8080/api/customers';

  constructor(public httpClient: HttpClient)
  {
    this.selectclients = new Clientmodel();
  }

  public getClient()
  {
    return this.httpClient.get(this.URL_API_GET_TRANSACTIONS);
  }

  public createTransaction(form)
  {
    return this.httpClient.post( this.URL_API_CREATE_TRANSACTION, form);
  }

  public deleteTransaction(id)
  {
    return this.httpClient.delete(this.URL_API_DELETE + '/' + id);
  }

}
