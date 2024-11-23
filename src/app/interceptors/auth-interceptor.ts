import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";

//Lista de endpoints que precisam de TOKEN JWT para autenticação da requisição
const endpoints = [
    "api/clientes",
    "api/tipos",
    "api/dashboard"
];

//interceotar as requisições feitas pelo Angular e , se necessario, enviar o TOKEN JWT

export const AuthInyterceptor: HttpInterceptorFn = (req, next) => {
    //verificar se a requisição feita pelo Angular é para algum dos endpoints definidos acima
    if (endpoints.some(endpoint => req.url.includes(endpoint))) {
        //captar os dados do usuario autenticado

        //verificar se existe um usuario autenticado
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            // Converte o objeto de string para JSON
            const usuarioData = JSON.parse(usuario);
            const token = usuarioData.token;

            // Adiciona o token no cabeçalho da requisição
            const request = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });

            return next(request);
        }
    }

    //enviando a requisição para a API sem 'anexar' o TOKEN JWT
    return next(req);
}