var tFisico = new Array()
var tLogico = new Array()
var d
var choque = false
var yAuto1 = 0
var yAuto2 = 8
var yAuto3 = 12
var xAuto1 = 0
var xAuto2 = 3
var xAuto2 = 6
var contadorY = 0
var car = new Array(
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
    [1, 1, 1]

)

var playerF, playerC = 0;



window.addEventListener("load", function () {
    iniciarTablero()
    iniciarJuego()
    refrescarTablero()
    d = setInterval(autos, 500)
    autos()
})

window.addEventListener("keypress", function (e) {
    //console.log("fsdfsdfdfsd");
    if (e.key == "a") {
        moverIzquierda()
    } else if (e.key == "d") {
        moverDerecha()
    } else {

    }

})

function iniciarTablero() {
    for (let f = 0; f <= 28; f++) {
        tFisico[f] = new Array()
        tLogico[f] = new Array()
        for (let c = 0; c <= 8; c++) {
            tLogico[f][c] = 0
        }
    }
    for (let f = 4; f <= 24; f++) {
        tFisico[f] = new Array()
        for (let c = 0; c <= 8; c++) {
            tFisico[f][c] = document.createElement("div")
            tFisico[f][c].setAttribute("class", "casilla")
            document.querySelector("#contenedor").append(tFisico[f][c])

        }
    }


}

function iniciarJuego() {
    for (let f = 0; f < car.length; f++) {
        for (let c = 0; c < car[f].length; c++) {
            tLogico[f + 21][c + 3] = car[f][c]
        }
    }

    playerF = 21
    playerC = 3
}

function autos() {
    if (yAuto1 == 26) {
        yAuto1 = 0
        cerosAbajo()
    } else if (yAuto2 == 26) {
        yAuto2 = 0
        cerosAbajo()
    } else if (yAuto3 == 26) {
        yAuto3 = 0
        cerosAbajo()
    }
    if (tLogico[yAuto1 + 3][4] == 1 || tLogico[yAuto2 + 3][1] || tLogico[yAuto3 + 3][7]) {
        clearInterval(d)
        var favDialog = document.getElementById('dialogo1');
        favDialog.showModal();
        var cancelButton = document.getElementById('cerrar');
        cancelButton.addEventListener('click', function () {
            favDialog.close();
        });
    } else {
        try {
            for (let Y = 0; Y < car.length; Y++) {
                for (let X = 0; X < car[Y].length; X++) {
                    try {
                        tLogico[Y + (yAuto1 - 1)][X + 3] = 0
                    } catch (error) { }
                }
            }
        } catch (error) { }
        for (let Y = 0; Y < car.length; Y++) {
            for (let X = 0; X < car[Y].length; X++) {
                try {
                    tLogico[Y + yAuto1][X + 3] = car[Y][X]
                } catch (error) { }
            }
        }

        //auto 2
        try {
            for (let Y = 0; Y < car.length; Y++) {
                for (let X = 0; X < car[Y].length; X++) {
                    try {
                        tLogico[Y + (yAuto2 - 1)][X] = 0
                    } catch (error) { }
                }
            }
        } catch (error) { }
        for (let Y = 0; Y < car.length; Y++) {
            for (let X = 0; X < car[Y].length; X++) {
                try {
                    tLogico[Y + yAuto2][X] = car[Y][X]
                } catch (error) { }
            }
        }
        //auto 3
        try {
            for (let Y = 0; Y < car.length; Y++) {
                for (let X = 0; X < car[Y].length; X++) {
                    try {
                        tLogico[Y + (yAuto3 - 1)][X + 6] = 0
                    } catch (error) { }
                }
            }
        } catch (error) { }
        for (let Y = 0; Y < car.length; Y++) {
            for (let X = 0; X < car[Y].length; X++) {
                try {
                    tLogico[Y + yAuto3][X + 6] = car[Y][X]
                } catch (error) { }
            }
        }
        refrescarTablero()
        yAuto1++
        yAuto2++
        yAuto3++
    }
}
function cerosAbajo() {
    for (let y = 25; y < 29; y++) {
        for (let x = 0; x < 9; x++) {
            tLogico[y][x] = 0
        }
    }
}

function refrescarTablero() {
    var txtPos = document.createElement("label")

    for (let f = 0; f < tFisico.length; f++) {
        for (let c = 0; c < tFisico[f].length; c++) {
            if (tLogico[f][c] == 1) {
                tFisico[f][c].setAttribute("class", "player")
            } else {
                tFisico[f][c].setAttribute("class", "casilla")
            }
        }
    }
}

function moverDerecha() {
    try {
        if (tLogico[playerF][playerC + 3] == 0 && tLogico[playerF + 1][playerC + 3] == 0 && tLogico[playerF + 2][playerC + 3] == 0 && tLogico[playerF + 3][playerC + 3] == 0) {
            for (let f = 0; f < car.length; f++) {
                for (let c = 0; c < car[f].length; c++) {
                    tLogico[f + 21][(playerC + 3) + c] = car[f][c]
                    tLogico[playerF + f][playerC + c] = 0
                }
            }
            refrescarTablero()
            playerC = playerC + 3
            //clearInterval(d)
        } else {
            console.log("no puede mover derecha");
        }
    } catch (error) {

    }
    refrescarTablero();


}
function moverIzquierda() {
    try {
        if (tLogico[playerF][playerC - 3] == 0 && tLogico[playerF + 1][playerC - 3] == 0 && tLogico[playerF + 2][playerC - 3] == 0 && tLogico[playerF + 3][playerC - 3] == 0) {
            for (let f = 0; f < car.length; f++) {
                for (let c = 0; c < car[f].length; c++) {
                    tLogico[f + 21][(playerC - 3) + c] = car[f][c]
                    tLogico[playerF + f][playerC + c] = 0
                }
            }
            refrescarTablero()
            playerC = playerC - 3

        } else {
            console.log("no puede mover Izquierda");
        }
    } catch (error) {

    }
    refrescarTablero();
    console.log(tLogico);
}

function Bajar() {

}