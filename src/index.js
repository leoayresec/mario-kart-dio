const readline = require('readline');
const players = require('./players/players');
const blocks = require('./blocks/blocks');

function askQuestion(rl, text) {
    return new Promise((resolve) => rl.question(text, resolve));
}

function getPlayerByName(name) {
    return players.find(p => p.nome.toLowerCase() === name.toLowerCase());
}

async function selectPlayers() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Jogadores disponíveis:");
    players.forEach((p) => console.log(`- ${p.nome}`));

    const selected = {};

    const firstInput = await askQuestion(rl, 'Escolha o primeiro jogador (digite o nome): ');
    const firstPlayer = getPlayerByName(firstInput.trim());

    if (!firstPlayer) {
        console.log("Jogador não encontrado. Encerrando.");
        rl.close();
        return null;
    }

    selected.first = firstPlayer;
    console.log(`Primeiro jogador escolhido: ${selected.first.nome}`);

    const secondInput = await askQuestion(rl, 'Escolha o segundo jogador (diferente do primeiro): ');
    const secondPlayer = getPlayerByName(secondInput.trim());

    if (!secondPlayer) {
        console.log("Jogador não encontrado. Encerrando.");
        rl.close();
        return null;
    }

    if (secondPlayer.nome === firstPlayer.nome) {
        console.log("Você não pode escolher o mesmo jogador duas vezes.");
        rl.close();
        return null;
    }

    selected.second = secondPlayer;
    console.log(`Segundo jogador escolhido: ${selected.second.nome}`);

    console.log("Resumo da seleção:");
    console.log("Jogador 1:", selected.first);
    console.log("Jogador 2:", selected.second);

    rl.close();
    return selected;
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
}

async function playRaceEngine(players) {
    
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        const block = getRandomBlock();
        console.log(`Bloco sorteado: ${block.type}`);
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        let totalSkill1 = 0;
        let totalSkill2 = 0;
        totalSkill1 = diceResult1 + players.first[block.attribute]
        totalSkill2 = diceResult2 + players.second[block.attribute]
        console.log(`Resultado do Dado1:(${diceResult1}) atributo ${block.attribute} :(${players.first[block.attribute]}) Total: ${totalSkill1}`);
        console.log(`Resultado do Dado2:(${diceResult2}) atributo ${block.attribute} :(${players.second[block.attribute]}) Total: ${totalSkill2}`);
        if (block.type === 'CONFRONTO' && totalSkill1 > totalSkill2 && players.second.pontuacao > 0) {
            players.second.pontuacao --;
        }
        else if (block.type === 'CONFRONTO' && totalSkill2 > totalSkill1 && players.first.pontuacao > 0) {
            players.first.pontuacao --;
        }
        if (block.type === 'RETA' || block.type === 'CURVA'){
            if (totalSkill1 > totalSkill2){
                players.first.pontuacao ++;
            }else if(totalSkill2 > totalSkill1){
                players.second.pontuacao ++;
            }
        }
        console.log(`Pontuação atual ${players.first.nome}: ${players.first.pontuacao}`);
        console.log(`Pontuação atual ${players.second.nome}: ${players.second.pontuacao}`);
        console.log(`--------------------------------------------------------------------------`);
        if (players.first.pontuacao > players.second.pontuacao){
          console.log(`Vencedor: ${players.first.nome}`)  
        }
        else if (players.second.pontuacao > players.first.pontuacao){
          console.log(`Vencedor: ${players.second.nome}`)  
        }else{
          console.log(`Empate`)   
        }
    }
    
}

(async function main() {
    const players = await selectPlayers();
    if (players) {
        await playRaceEngine(players);
    }
})();
