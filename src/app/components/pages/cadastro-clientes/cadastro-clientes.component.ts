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

  //metodo construtor
  constructor(
    private httpClient: HttpClient
  ){}

  //Criar objeto para capturar o formulario
  //os campos devem ter os mesmos nomes

  formulario = new FormGroup({//conjunto do formulario
    nome : new FormControl('',[Validators.required]),//campo do formulario
    cpf : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    telefone : new FormControl('',[Validators.required])
  });

  //função executada quando clicar no submit

  cadastrarCliente() {

    //fazendo uma requisição post
    this.httpClient
    .post('http://localHost:8081/api/clientes', this.formulario.value, 
      {responseType: 'text'})
      .subscribe({
        next: (data) => {
          console.log(data);
        }
      });
  }

}
