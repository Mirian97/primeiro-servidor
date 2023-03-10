const express = require("express");
const app = express();

let minuto = 0;
let segundo = 0;
let minutoFormatado;
let segundoFormatado;
let pause = false;
let tempo;

function cronometro() {
    tempo = setInterval(() => {
        segundo++;
        if (segundo >= 60) {
            segundo = 0;
            minuto++;
        }
    }, 1000);
}

app.get("/", (req, res) => {
    minutoFormatado = String(minuto).padStart(2, "0");
    segundoFormatado = String(segundo).padStart(2, "0");
    res.send(`Tempo atual do cronômetro: ${minuto} minutos e ${segundo} segundos`);
})

app.get("/iniciar", (req, res) => {
    cronometro();
    res.send("Cronômetro iniciado!");
})

app.get("/pausar", (req, res) => {
    pause = true;
    clearInterval(tempo);
    res.send("Cronômetro pausado!");
})

app.get("/continuar", (req, res) => {
    if (pause) {
        cronometro();
        pause = false;

        return res.send("Cronômetro continuando!");
    }
    res.send("Você ainda não iniciou o cronômetro");
})

app.get("/zerar", (req, res) => {
    clearInterval(tempo);
    segundo = 0;
    minuto = 0;
    if (pause) {
        return res.send("Cronometro zerado, porém pausado, vá para o continuar");
    } else {
        cronometro();
    }
    res.send("Cronômetro zerado!");
})

app.listen(8000);