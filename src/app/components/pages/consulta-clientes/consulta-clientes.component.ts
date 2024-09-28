import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})

export class ConsultaClientesComponent {


  //atributos
  clientes: any[] = [];//array de objetos vazio

  //método construdo
  constructor(
    //declarando e inicializando a classe HttpClient
    private httpClient: HttpClient
  ){}

  //função executada ao carregar o componente
  ngOnInit(){

    //fazendo uma requisição para o serviço de consulta de cliente da API
    this.httpClient.get('http://localhost:8081/api/clientes')
    .subscribe({//aguardando a API retornar uma resposta
      
      next: (data) => {// capturando os dados da api 
        //data: nome da variavel que está capturando o retorno da api
        //armazenar os dados obtidos no atributo da classe
        this.clientes = data as any[];

      }

    })
  }
}
