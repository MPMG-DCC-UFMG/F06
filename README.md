# F06
Sistema Inteligente de Suporte ao Procon/MG

## Instalando dependências

Após clonar o projeto, rode o comando `npm install` para instalar as dependências.

## Instalando dependências

Execute o projeto no modo de desenvolvimento rodando o comando:
### `npm start`

Abra [http://localhost:3000](http://localhost:3000) para executar no navegador.

## Compilando o projeto

Compile o projeto para produção na pasta `build` executando o comando:
### `npm run build`

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Exportar imagem docker

Antes de exportar a image, faça a compilação do projeto para produção.

Build do projeto
`docker build -t procon-front .`

Execute a imagem no Docker
`docker run --rm -itd -p 3000:80 procon-front`

Salvar a imagem para arquivo
`docker save -o procon-front.tar.gz procon-front`