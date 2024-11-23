import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-edicao-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './edicao-clientes.component.html',
  styleUrl: './edicao-clientes.component.css'
})
export class EdicaoClientesComponent {

  //atributos
  mensagem: string = '';//variavel para exibir a resposta
  id: string = '';//variavel para capturar o id do cliente
  tipos: string[] = [];//array para armazenar os tipos de clientes


  //metodo construtor
  constructor (
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ){}

  //função executada quando abrir a pagina
  ngOnInit(){
    //capturar o id do cliente enviado pela URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar o cliente na API através do ID
    this.httpClient.get('http://localhost:8081/api/clientes/' + this.id)
    .subscribe({
      next: (data) => {
        //preencher o formulario com os dados do cliente
        this.formulario.patchValue(data);
      }  
    });

    this.httpClient.get('http://localhost:8081/api/tipos')
    .subscribe({
      next: (data) => {
        this.tipos = data as string[];
      }
    });
  }
  
   //Criar objeto para capturar o formulario
   //os campos devem ter os mesmos nomes

  formulario = new FormGroup({//conjunto do formulario
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),//campo do formulario
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),//expressão regular
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    tipo: new FormControl('', [Validators.required])
  });

  //criando um objeto para exibir na pagina
  //as menssagens de validação para cada campo dp formulario
  get f() {

    return this.formulario.controls;
  }

  //função atualizar cliente
  atualizarCliente() {
    //enviar uma requisição PUT para a API(atualizar o cliente)
    this.httpClient.put('http://localhost:8081/api/clientes/' + this.id, 
      this.formulario.value,//enviando os dados do formulario
      {responseType: 'text'}//api retornar uma mensagem
    ).subscribe({
      next: (data) => {
        //exibir a mensagem obtida da API
        this.mensagem = data;
      }
    })
  }
}