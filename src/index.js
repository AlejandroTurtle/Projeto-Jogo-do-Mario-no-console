const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0
}

const nome = "mario"

 const rollDice = async () => {
  return Math.floor(Math.random() * 6 + 1)
}

const getRamdomBlock = async () => {
    let ramdom = Math.random()
    let result 

    switch (true) {
        case ramdom < 0.33:
            result = "Reta"
            break;
        case ramdom < 0.66:
            result = "Curva"
            break
        default:
            result = "Confronto"
            break;
    }
    
   return result
}


const logRollResult = async (characterName, block, diceRsult, attribute) => {

    console.log(`${characterName} 🎲 rolou um dado de ${block} o resultado do dado foi ${diceRsult} + ${attribute} = ${diceRsult + attribute} `)
}

const playRaceEngine = async (character1, character2) => {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        let block = await getRamdomBlock()
        console.log(`Bloco: ${block}`)
   


    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    let totalSkill1 = 0
    let totalSkill2 = 0

    if(block === "Reta") {
        totalSkill1 = diceResult1 + character1.velocidade
        totalSkill2 = diceResult2 + character2.velocidade

        await logRollResult(
            character1.nome, 
            "Velocidade", 
            diceResult1, 
            character1.velocidade)

        await logRollResult(
            character2.nome, 
            "Velocidade", 
            diceResult2, 
            character2.velocidade)

    }
    if(block === "Curva") {
        totalSkill1 = diceResult1 + character1.manobrabilidade
        totalSkill2 = diceResult2 + character2.manobrabilidade

        await logRollResult(
            character1.nome, 
            "manobrabilidade", 
            diceResult1, 
            character1.manobrabilidade)

        await logRollResult(
            character2.nome, 
            "manobrabilidade", 
            diceResult2, 
            character2.manobrabilidade)
     }
    if(block === "Confronto") {
        let powerResult1 = diceResult1 + character1.poder
        let powerResult2 = diceResult2 + character2.poder

        console.log(`${character1.nome} confrontou com ${character2.nome} 🥊`)

        await logRollResult(
            character1.nome, 
            "poder", 
            diceResult1, 
            character1.poder
        )

        await logRollResult(
            character2.nome, 
            "poder", 
            diceResult2, 
            character2.poder
        )

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto `)
                character2.pontos--
            }


            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto `)
                character1.pontos--
            }

            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "")

       }
 
       if (totalSkill1 > totalSkill2) {
        console.log(`${character1.nome} marcou um ponto`)
        character1.pontos++
       } else if (totalSkill2 > totalSkill1) {
        console.log(`${character2.nome} marcou um ponto`)
        character2.pontos++
       }
        console.log("----------------")
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);
  
    if (character1.pontos > character2.pontos)
      console.log(`\n${character1.nome} venceu a corrida! Parabéns! 🏆`);
    else if (character2.pontos > character1.pontos)
      console.log(`\n${character2.nome} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate");
  }



const main = (async () => {
     console.log(`🏁🛑 Corrida entre ${player1.nome} e ${player2.nome}`) 

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()
