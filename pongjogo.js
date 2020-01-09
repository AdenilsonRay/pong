var posicaoBarraJogador_LEFT
var posicaoBarraJogador_TOP
var posicaoBarraJogador_TOPINI
var posicaoBarraCpu_LEFT
var posicaoBarraCpu_TOP
var posicaoBarraCpu_LEFTINI
var posicaoBola_LEFT
var posicaoBola_TOP
var velocidade_RETA
var velocidade_INCL
var velocidade_BARRA

var sentidoMoveBarraJOG
var bolaEmMovimento
var jogoOcorrendo = false
var barraJogador
var moverBola
var barraCpu
var pontos
var bola
var animaBarraJOG
var animaBarraCPU
var sentidoBola
var alturaBola

function iniciarJogo(){
    posicaoBola_TOP = 240
    posicaoBola_LEFT = 490 
    posicaoBarraJogador_TOP = 200 
    posicaoBarraJogador_LEFT = 10
    posicaoBarraCpu_TOP=200
    posicaoBarraCpu_LEFT=997
    sentidoMoveBarraJOG = 0
    alturaBola = 0

    velocidade_INCL = 0
    velocidade_RETA = 4
    velocidade_BARRA = 7
    jogoOcorrendo=true
    sentidoBola = -1  // (-1)-Sentido Esq e (1)-Sentido Dir
    movimentaBola()
    animaBarra_Jogador()
    animaBarra_Cpu()
}

function animaBarra_Cpu(){

    //Se bola na direcao da barra CPU
    if (sentidoBola > 0) {
        var valorMovido

        //Define velocidade e sentido da barra
        if (alturaBola>0) {
            valorMovido = 2
        } else {
            valorMovido = -2
        }

        //Se barra vai sair da tela por CIMA para
        if (posicaoBarraCpu_TOP < 12 ) {
            posicaoBarraCpu_TOP = 12
        }

        //Se barra vai sair da tela por BAIXO para
        if (posicaoBarraCpu_TOP > 406 ) {
            posicaoBarraCpu_TOP = 406
        }

        //Se a bola estiver fora do alinhamento com a barra
        if ((posicaoBola_TOP < posicaoBarraCpu_TOP-8) || 
            (posicaoBola_TOP > posicaoBarraCpu_TOP+100)) {

            for (let i = 0; i < 40; i++) {
                //Define a nova possicao da barra
                posicaoBarraCpu_TOP += valorMovido 

                //Se barra vai sair da tela por CIMA para
                if (posicaoBarraCpu_TOP < 12 ) {
                    posicaoBarraCpu_TOP = 12
                }

                //Se barra vai sair da tela por BAIXO para
                if (posicaoBarraCpu_TOP > 406 ) {
                    posicaoBarraCpu_TOP = 406
                }

                //Muda posicao da barra
                barraCpu.style.top = posicaoBarraCpu_TOP + "px"
            }
        }
    }

    //Roda esta funcao novamente
    animaBarraCPU = requestAnimationFrame(animaBarra_Cpu)
}

function animaBarra_Jogador(){
    //Define velocidade e sentido da barra
    var valorMovido = velocidade_BARRA * sentidoMoveBarraJOG

    //Define a nova possicao da barra
    posicaoBarraJogador_TOP += valorMovido 

    //Se barra vai sair da tela por CIMA para
    if (posicaoBarraJogador_TOP < 12 ) {
        posicaoBarraJogador_TOP = 12
    }

    //Se barra vai sair da tela por BAIXO para
    if (posicaoBarraJogador_TOP > 406 ) {
        posicaoBarraJogador_TOP = 406
    }

    //Muda posicao da barra
    barraJogador.style.top = posicaoBarraJogador_TOP + "px"

    //Roda esta funcao novamente
    animaBarraJOG = requestAnimationFrame(animaBarra_Jogador)
}

function moveBarraJogador(event) {
    var tecla = event.keyCode

    if (tecla==38) {
        if (posicaoBarraJogador_TOP >= 11 ) {
            sentidoMoveBarraJOG = -1
        }else{
            sentidoMoveBarraJOG = 0
        }
    } else if(tecla==40){
        if (posicaoBarraJogador_TOP <= 403) {
            sentidoMoveBarraJOG = 1
        }else{
            sentidoMoveBarraJOG = 0
        }
    }
}
function paraBarraJogador(event) {
    var tecla = event.keyCode
    if (tecla == 38 || tecla == 40) {
        sentidoMoveBarraJOG = 0
    }
}

function movimentaBola(){
    //Define sentido e valor 
    posicaoBola_LEFT += (sentidoBola*velocidade_RETA)
    posicaoBola_TOP += (alturaBola)

    //Repassa nova possicao para bola
    document.querySelector("div#dvBola").style.top = posicaoBola_TOP+"px"
    document.querySelector("div#dvBola").style.left = posicaoBola_LEFT+"px"

    //Verifica se jogo foi finalizado
    if(jogoFinalizado(posicaoBola_LEFT,posicaoBola_TOP)){
        alert("Jogo FINALIZADO")
        cancelAnimationFrame(animaBarraCPU)
        cancelAnimationFrame(animaBarraJOG)
        cancelAnimationFrame(bolaEmMovimento)
        return
    }

    bolaEmMovimento = requestAnimationFrame(movimentaBola)
}

function jogoFinalizado(posBola_LEFT, posBola_TOP){

    //Verifica se bola tocou na barra JOGADOR
    if (posicaoBola_LEFT <= posicaoBarraJogador_LEFT+10 && 
        (
         (posicaoBola_TOP+10 >= posicaoBarraJogador_TOP) && 
         (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP + 100)
        )
       ) {
           //Se na posicao 1/6 da barra
           if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP) &&
              (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+20)){
                alturaBola = alturaBola > 0 ? 8:-8
                sentidoBola = 1
                return false
             //Se na posicao 2/6 da barra
            } else if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP+20) &&
                       (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+40)){
                alturaBola = alturaBola > 0 ? 6:-6
                sentidoBola = 1
                return false
                    //Se na posicao 3/6 da barra
            } else if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP+40) &&
                       (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+50)){
                alturaBola = alturaBola > 0 ? 4.5:-4.5
                sentidoBola = 1
                return false
                    //Se na posicao 4/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP+50) &&
                      (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+60)){
                alturaBola = alturaBola > 0 ? 4.5:-4.5
                sentidoBola = 1
                return false
                    //Se na posicao 5/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP+60) &&
                      (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+80)){
                alturaBola = alturaBola > 0 ? 6:-6
                sentidoBola = 1
                return false
                    //Se na posicao 5/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraJogador_TOP+80) &&
                      (posicaoBola_TOP+10 <= posicaoBarraJogador_TOP+100)){
                alturaBola = alturaBola > 0 ? 8:-8
                sentidoBola = 1
                return false
            }
    }

    //Verifica se bola tocou na barra CPU
    if (posicaoBola_LEFT+20 >= posicaoBarraCpu_LEFT && 
        (
         (posicaoBola_TOP+10 >= posicaoBarraCpu_TOP) && 
         (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP + 100)
        )
       ) {
           //Se na posicao 1/6 da barra
           if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP) &&
              (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+20)){
                alturaBola = alturaBola > 0 ? 8:-8
                sentidoBola = -1
                return false
             //Se na posicao 2/6 da barra
            } else if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP+20) &&
                       (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+40)){
                alturaBola = alturaBola > 0 ? 6:-6
                sentidoBola = -1
                return false
                    //Se na posicao 3/6 da barra
            } else if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP+40) &&
                       (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+50)){
                alturaBola = alturaBola > 0 ? 4.5:-4.5
                sentidoBola = -1
                return false
                    //Se na posicao 4/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP+50) &&
                      (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+60)){
                alturaBola = alturaBola > 0 ? 4.5:-4.5
                sentidoBola = -1
                return false
                    //Se na posicao 5/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP+60) &&
                      (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+80)){
                alturaBola = alturaBola > 0 ? 6:-6
                sentidoBola = -1
                return false
                    //Se na posicao 5/6 da barra
            }else if ((posicaoBola_TOP+10 >= posicaoBarraCpu_TOP+80) &&
                      (posicaoBola_TOP+10 <= posicaoBarraCpu_TOP+100)){
                alturaBola = alturaBola > 0 ? 8:-8
                sentidoBola =- 1
                return false
            }
    }

    //Verifica se bola NAO tocou na barra CPU
    if ((posicaoBola_LEFT+12 >= 1000) && 
        (
         (posicaoBola_TOP+20 < posicaoBarraCpu_TOP) ||
         (posicaoBola_TOP > posicaoBarraCpu_TOP + 100)
        )
       ) {
        alert("A CPU perdeu. voce GANHOU")
        return true
    }

    //Verifica se bola NAO tocou na barra jogador
    if ((posicaoBola_LEFT-6 <= 0) && 
        (
         (posicaoBola_TOP+20 < posicaoBarraJogador_TOP) ||
         (posicaoBola_TOP > posicaoBarraJogador_TOP + 100)
        )
       ) {
        alert("Voce perdeu. a cpu GANHOU")
        return true
    }

    //Verifica se bola tocou na BASE da area
    if (posicaoBola_TOP+10 >= 500) {
            alturaBola = alturaBola * (-1)
            return false
    }

    //Verifica se bola tocou no TOPO da area
    if (posicaoBola_TOP <= 10) {
        alturaBola = alturaBola * (-1)
        return false
    }
}

function iniciandoElementos(){
    document.addEventListener("keydown",moveBarraJogador)
    document.addEventListener("keyup",paraBarraJogador)
    document.querySelector("button#btIniciar").addEventListener("click",iniciarJogo)
    pontos = document.querySelector("input#txtPontos")
    bola = document.querySelector("div#dvBola")
    barraJogador = document.querySelector("div#dvBarraJogador")
    barraCpu = document.querySelector("div#dvBarraCpu")
    bola.innerHTML = `\u{26BD}`
}
window.addEventListener("load",iniciandoElementos)