## Sobre o Projeto

## Getting Started

_Para executar este projeto localmente siga estas simples etapas._

### Pré-requisitos

Antes de iniciar é necessário ter o NPM instalado.
```sh
npm install npm@latest -g
```

Além disso, faz-se necessário ter configurado um projeto no [Firebase](https://console.firebase.google.com/).

### Instalação

_Siga o passo-a-passo para instalar o projeto em sua máquina._

1. Clone o repositório: 
```sh
   git clone https://github.com/marllefH/linktoo.git
```
2. Instale as dependências necessárias:
```sh
   npm install
```
3. Adicione as variaveis de ambiente necessárias seguindo o exemplo do arquivo `.env.example`.

4. Gere os modelos do `Prisma Client` com o seguinte comando:
```sh
   npm prisma generate
```

### Utilização

_Para iniciar o servidor local execute o seguinte comando:_
```sh
   npm run dev
```
