const express = require("express")
const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

let i = 0;

app.get("/", (req, res) => {
    let jogadaDaVez = `É a vez de ${jogadores[i]} jogar`;

    i++;
    if (i >= jogadores.length) {
        i = 0;
    }
    res.send(jogadaDaVez);
})

app.listen(3000);