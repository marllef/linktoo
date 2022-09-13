# 🔗 [LinkToo](http://linktoo.tk) - Agregador de Links 🔗

Um simples agregador de links para utilizar em redes sociais.

## Tecnologias Utilizadas

<div align='center'>

Estas são as tecnologias utilizadas na elaboração deste projeto.

![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-F29D0C?style=for-the-badge&logo=firebase&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## Telas do Aplicativo

A seguir estão algumas das telas do app.

<div align='center'>

<img src="public/img/LinkToo(1).png" alt='Tela de login'  width="200">
<img src="public/img/LinkToo(3).png" alt='Tela principal'  width="200">
<img src="public/img/LinkToo(6).png" alt="Editar perfil"  width="200">
<img src="public/img/LinkToo(5).png" alt="Listagem de links" width="200">

_Telas internas do aplicativo_

</div>

# ⚠️ Informações Importantes ⚠️

- Este projeto pode ser acessado em produção [clicando aqui](http://linktoo.tk).

- Para executar este projeto localmente siga as etapas descritas neste documento.

## Pré-requisitos

Antes de iniciar é necessário ter o yarn instalado.

```sh
npm install -g yarn@latest
```

Além disso, faz-se necessário ter um projeto configurado no [Firebase](https://console.firebase.google.com/).

## Instalação

_Siga o passo-a-passo para instalar o projeto em sua máquina._

1. Clone o repositório:

```sh
   git clone https://github.com/marllefH/linktoo.git
```

2. Instale as dependências necessárias:

```sh
   yarn install
```

3. Adicione as variaveis de ambiente necessárias seguindo o exemplo do arquivo `.env.example`.

4. Gere os modelos do `Prisma Client` com o seguinte comando:

```sh
   yarn prisma generate
```

5. Execute o projeto.

```sh
   yarn dev
```

## Licença

Este projeto está licenciado sob licença do MIT.

Copyright (c) 2022 [Marllef Hyorrane Alves De Freitas](http://github.com/marllef)
