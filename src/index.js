const readline = require('readline');
const players = require('./players/players');

// Mapear nome -> Chave
const nameToKey = {};
for (const [key, value] of Object.entries(players)) {
    nameToKey[value.nome.toLowerCase()] = key;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Jogadores disponíveis:");
Object.values(players).forEach((p) => console.log(`- ${p.nome}`));

let selected = {};

rl.question('Escolha o primeiro jogador (digite o nome): ', (firstInput) => {
    const firstName = firstInput.trim().toLowerCase();
    const firstKey = nameToKey[firstName];

    if (!firstKey) {
        console.log("Jogador não encontrado. Encerrando.");
        rl.close();
        return;
    }

    selected.first = players[firstKey];
    console.log(`Primeiro jogador escolhido: ${selected.first.nome}`);

    rl.question('Escolha o segundo jogador (diferente do primeiro): ', (secondInput) => {
        const secondName = secondInput.trim().toLowerCase();
        const secondKey = nameToKey[secondName];

        if (!secondKey)
            console.log("Jogador não encontrado. Encerrando.");
        else if (secondKey === firstKey)
            console.log("Você não pode escolher o mesmo jogador duas vezes.");
        else
            selected.second = players[secondKey];
        console.log(`Segundo jogador escolhido: ${selected.second.nome}`);

        console.log("Resumo da seleção:");
        console.log("Jogador 1:", selected.first);
        console.log("Jogador 2:", selected.second);


        rl.close();
    });
});
