import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    NgxMaskPipe
  ],
  providers:[
    provideNgxMask()
  ],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})

export class ConsultaClientesComponent {


  //atributos
  clientes: any[] = [];//array de objetos vazio
  mensagem: string = '';//variavel para exibir a resposta
  paginador: number = 1;//variavel para marcar a página atual

  //método construdo
  //declarando e inicializando a classe HttpClient
  constructor ( private httpClient: HttpClient){}

  //função executada ao carregar o componente
  ngOnInit(){

    //fazendo uma requisição para o serviço de consulta de cliente da API
    this.httpClient.get(environment.apiClientes + '/clientes')
    .subscribe({//aguardando a API retornar uma resposta
      
      next: (data) => {// capturando os dados da api 
        //data: nome da variavel que está capturando o retorno da API
        //armazenar os dados obtidos no atributo da classe
        this.clientes = data as any[];

      }

    });

  }

  //função para excluir um cliente
  excluirCliente(id: string){

    if(confirm('Deseja realmente excluir o cliente selecionado? ')){

      this.httpClient.delete('http://localhost:8081/api/clientes/' + id, 
        {responseType: 'text'}
      ).subscribe({
        next: (data) => {
          //armazenar a mensagem
          this.mensagem = data;
          //executar a consulta novamente
          this.ngOnInit();
        }
      });

    }
  }

  //função para fazer o recurso de 'avançar' e 'voltar' a paginação
  handlePageChange(event: any){
    this.paginador = event;
  }
}
