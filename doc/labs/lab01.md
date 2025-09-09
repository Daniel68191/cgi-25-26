# Aula prática 1 - Configuração do Ambiente de Desenvolvimento e exemplos introdutórios

Nas aulas de Computação Gráfica e Interfaces iremos usar a API WebGL para o desenvolvimento dos nossos programas e projetos. Embora as nossas aplicações, por serem executadas num browser, não necessitem de grande ajuda em termos de IDE - por exemplo não é necessário compilar os nossos programas - a utilização dum IDE tem outras vantagens.

O IDE escolhido é o Microsoft Visual Studio Code, o qual tem versões para MacOS, Windows e Linux. Este IDE é extensível, sendo possível instalar uma série de extensões atendendo às mais diversas necessidades. No nosso caso iremos, para já, necessitar das seguintes extensões:

- Live server - um servidor web com suporte para live reload de páginas estáticas e dinâmicas
- WebGL GLSL Editor - suporte para syntax highliting nos shaders
- 
Para abrir o painel das extensões podemos fazer **CTRL**+**SHIFT**+**X** (Windows e Linux) ou  **CMD**+**Shift**+**X** (Mac), procurar a extensão digitando o seu nome e escolher a opção "Install".

**Hint**: Shortcuts do Visual Studio Code para [Mac](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf_), [Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf_) e [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf).

## Repositório para CGI

Durante o semestre iremos adoptar uma estrutura rígida para as nossas pastas. A estrutura adoptada está exemplificada de seguida:

```
.
├── doc
│   ├── labs
│   │   └── lab01.md
│   └── prjs
├── README.md
└── src
    ├── labs
    │   └── ex01
    │       ├── app.js
    │       ├── index.html
    │       └── shaders
    │           ├── shader.frag
    │           └── shader.vert
    ├── libs
    │   ├── dat.gui.min.js
    │   ├── dat.gui.module.js
    │   ├── dat.gui.module.js.map
    │   ├── MV.js
    │   ├── objects
    │   │   ├── ...
    │   │   └── ...
    │   ├── stack.js
    │   ├── three.module.js
    │   └── utils.js
    └── prjs
        ├── prj1
        ├── prj2
        └── prj3
```

Desta estrutura destaca-se o seguinte:

- Uma pasta ```doc``` onde estarão todos os guiões das aulas práticas e enunciados de projetos.
- Uma pasta ```src`` onde ficará todo o código fonte.

Dentro da pasta ```src``` a estrutura é a seguinte: 
- Uma pasta ```libs``` onde ficam guardados os ficheiros correspondentes às bibliotecas usadas
- Uma pasta ```labs``` para guardar as pastas com o código relacionado com os exercícios a resolver em aula prática.
- Uma pasta ```exNN```, dentro da pasta ```labs```, por cada exercício proposto. Esta pasta irá ter todos os ficheiros necessários para a resolução do respetivo exercício, excepto as bibliotecas referidas anteriormente. O conteúdo destas pastas não deverá ser editado pelos alunos, pois irá sendo atualizado no repositório pela equipa docente (por exemplo para disponibilizar as soluções).
- Uma pasta ```my-exNN``` que deverá ser inicializada com uma cópia integral da pasta ```exNN``` para iniciar a resolução do exercício. Será nesta pasta que cada aluno/grupo deverá escrever o seu código.
- Uma pasta ```projects``` para guardar as soluções dos projetos para avaliação.

Para cada exercício iremos ainda seguir a seguinte convenção para arrumarmos os ficheiros respetivos (ver ```ex01``` acima):

- Um ficheiro ```index.html``` com o código HTML correspondente à estrutura da nossa aplicação
Um ficheiro ```app.js``` com o código principal da aplicação
- Uma pasta ```shaders``` para guardar todos os shaders usados pela aplicação (as extensões para estes shaders serão ```.vert``` e ```.frag``` para os vertex e fragment shaders, respectivamente.
- Caso existam mais ficheiros javascript necessários, que não os da biblioteca, estes poderão ficar ao mesmo nível do ficheiro principal, ou arrumados dentro duma pasta de nome ```js```.

Para fazermos o setup inicial das nossas pastas vamos começar por clonar o repositório oficial da cadeira. Este repositório irá sendo atualizado ao longo do semestre, pelo que irá ser frequente a atualização das vossas cópias locais.

1. Escolher uma localização no file system para guardar todo o código de CGI
2. clonar [este repositório](https://gitlab.com/CGI-Code/cgi-25-26) nesse local
3. Abrir o Visual Studio Code e escolher a opção "Open Folder" para abrir toda a árvore de ficheiros de CGI