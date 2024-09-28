import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './components/pages/edicao-clientes/edicao-clientes.component';

export const routes: Routes = [
    {
        path:'pages/clientes/cadastro',//Mapeando a rota (link)
        component: CadastroClientesComponent
    },
    {
        path:'pages/clientes/consulta',//Mapeando a rota (link)
        component: ConsultaClientesComponent
    },
    {
        path:'pages/clientes/edicao',//Mapeando a rota (link)
        component:EdicaoClientesComponent
    },
    {
        path: '', pathMatch: 'full', //ROTA raiz do projeto
        redirectTo: '/pages/clientes/consulta'
    }

];
