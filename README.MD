📚 Inspiração
Este projeto foi inspirado no desafio da DIO, mas desenvolvido do zero com base na descrição original:
👉 https://github.com/digitalinnovationone/formacao-nodejs/tree/main/03-projeto-mario-kart


🏎️ Mario Kart Console Game (Node.js)
Este projeto é uma simulação simples de corrida inspirada no universo Mario Kart, feita inteiramente para rodar no console utilizando Node.js. A ideia principal é permitir que dois jogadores sejam selecionados e compitam em uma série de rodadas, com base em atributos e sorte (rolagem de dados).

📁 Estrutura do Projeto
bash
Copiar
Editar
src/
├── index.js            # Arquivo principal: inicia o jogo
├── players/
│   └── players.js      # Lista de jogadores com atributos
├── blocks/
│   └── blocks.js       # Tipos de blocos da pista (reta, curva, confronto)
🚀 Como executar
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/mario-kart-console.git
cd mario-kart-console
Instale o Node.js (se ainda não tiver):

https://nodejs.org/

Rode o jogo:

bash
Copiar
Editar
node src/index.js
🎮 Regras do Jogo
Você escolhe dois personagens disponíveis pelo nome.

A corrida acontece em 5 rodadas.

Em cada rodada, um bloco da pista é sorteado:

RETA: compara velocidade + dado

CURVA: compara manobrabilidade + dado

CONFRONTO: compara poder + dado, quem perde, perde 1 ponto

Jogadores não podem ter pontuação negativa.

Ao final das rodadas, o jogador com mais pontos vence.

👾 Jogadores disponíveis
Cada jogador possui os seguintes atributos:

velocidade

manobrabilidade

poder

pontuação (iniciada em 0)

Exemplo:

js
Copiar
Editar
{
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontuacao: 0
}
🔧 Ideias para melhorias
Interface com inquirer para seleção interativa.

Sistema de campeonato com múltiplas corridas.

Power-ups aleatórios.

Persistência dos resultados.

🧑‍💻 Autor
Feito por Leonardo Ayres como parte de um projeto de aprendizado em Node.js.