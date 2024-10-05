import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './components/pages/edicao-clientes/edicao-clientes.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: 'pages/clientes/cadastro', //ROTA (URL)
        component: CadastroClientesComponent
    },
    {
        path: 'pages/clientes/consulta', //ROTA (URL)
        component: ConsultaClientesComponent
    },
    {
        path: 'pages/clientes/edicao/:id', //ROTA (URL)
        component: EdicaoClientesComponent
    },
    {
        path: 'pages/clientes/dashboard', //ROTA (URL)
        component: DashboardComponent
    },
    {
        path: '', pathMatch: 'full', //ROTA raiz do projeto
        redirectTo: '/pages/clientes/dashboard'
    }
];
