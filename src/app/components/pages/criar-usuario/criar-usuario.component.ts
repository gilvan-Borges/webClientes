import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environments';


@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    RouterLink, //navegação em rotas
    CommonModule, //diretivas básicas do angular
    FormsModule, //formulários reativos
    ReactiveFormsModule //formulários reativos
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: String = '';
  mensagemErro: String = '';

  //metodo construtor (injeção de dependência)
  constructor(
    private httpClient: HttpClient
  ){  
  }

  //construindo a estrutura do formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/)]),
    senhaConfirmacao : new FormControl('', [Validators.required])
  },
  { validators: this.senhaConfirmacaoValidator  }
  );  


  senhaConfirmacaoValidator(abstractControl: AbstractControl) {
    let senha = abstractControl.get('senha')?.value;
    let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;
    if (senhaConfirmacao.length > 0 && senhaConfirmacao != senha) {
      abstractControl.get('senhaConfirmacao')?.setErrors({
        matchPassword: true,
      });
    }
    return null;
  }

  //função auxiliar para que possamos exibir
  //na página HTML as mensagens de validação
  get f() {
    return this.formulario.controls;
  }

  criarUsuario() {

      //limpar messagens
  this.mensagemSucesso = '';
  this.mensagemErro = '';

    //faznedo a chamada para a api
    this.httpClient.post(environment.apiUsuarios + '/criar', this.formulario.value)
      .subscribe({//capturar o retorno da api
        next: (data: any) =>{//capturar sucesso..
          this.mensagemSucesso = data.mensagem;
          this.formulario.reset();
        },
        error: (e) =>{//capturar erro
          this.mensagemErro = e.error[0];
        }
      })
  }
}




