import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent {

  //atributo
  mensagem: string = ''//variavel para exibir a resposta;

  //metodo construtor
  constructor (private httpClient: HttpClient) { }

  //Criar objeto para capturar o formulario
  //os campos devem ter os mesmos nomes

  formulario = new FormGroup({//conjunto do formulario
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),//campo do formulario
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),//expressão regular
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)])
  });

  //criando um objeto para exibir na pagina
  //as menssagens de validação para cada campo dp formulario
  get f() {

    return this.formulario.controls;
  }


  //função executada quando clicar no submit

  cadastrarCliente() {

    //fazendo uma requisição post
    this.httpClient
      .post('http://localHost:8081/api/clientes', this.formulario.value,
        { responseType: 'text' })
      .subscribe({
        next: (data) => {
          //capturar o retorno da api
          this.mensagem = data;
          if(data.includes('sucesso')){
          //limpar os campos do formulario
          this.formulario.reset();
          }
        }
      });
  }

}
