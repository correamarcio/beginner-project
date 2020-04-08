var JOGO = (function () {


  var alturaPalcoJogo = 0;
  var larguraPalcoJogo = 0;
  var posicaoHorizontalBola = 0;
  var posicaoVerticalBola = 0
  var bolasAcertadas = 0
  var bolasPerdidas = 0
  var tempoDeJogo = 30
  var multiplicadorPontos = 1
  var pontos = 0
  var tempoDaBola = 0

  let verificaTamanhoPalcoJogo = function () {
    return alturaPalcoJogo = document.querySelector('#jogo').scrollHeight,
      larguraPalcoJogo = document.querySelector('#jogo').scrollWidth
  }();

  nivel = window.location.search
  nivel = nivel.replace('?', '')

  switch (parseInt(nivel)) {
    case 1:
      tempoDaBola = 1500
      var multiplicadorPontos = 1
      break;

    case 2:
      tempoDaBola = 1200
      var multiplicadorPontos = 10
      break;

    case 3:
      tempoDaBola = 900
      var multiplicadorPontos = 20
      break;
    default:
      tempoDaBola = 1500
      var multiplicadorPontos = 1
      break;
  }


  let tempodaBola = setInterval(() => {
    novaBola()
  }, tempoDaBola);


  novaBola = () => {
    removeBolas()
    criarBolas()
  }

  removeBolas = () => {
    let bola = document.querySelector('#bola')
    if (bola) {
      somaDesacertos()
      multiplicador('subtrair')
      bola.classList.add('bolaPerdida')
      setTimeout(() => {
        bola.remove()
      }, 200);
    }
  }


  criarBolas = () => {
    posicaoVerticalBola = Math.trunc(Math.random() * alturaPalcoJogo);
    posicaoHorizontalBola = Math.trunc(Math.random() * larguraPalcoJogo);

    let bola = document.createElement('img');
    bola.src = "img/bola.png";
    bola.style.position = 'absolute'
    bola.style.left = `${posicaoHorizontalBola}px`
    bola.style.top = `${posicaoVerticalBola}px`
    bola.style.margin = '10px'
    bola.id = "bola";
    bola.className = `${tamanhoAleatorioBola()}`

    bola.onclick = () => {
      somaAcertos()
      pontosJogo()
      multiplicador('somar')
      bola.classList.add('bolaCerta')


      setTimeout(() => {
        bola.remove()
      }, 200);
    }

    document.querySelector('#jogo').appendChild(bola)
  }

  tamanhoAleatorioBola = () => {
    let tamanho = Math.round(Math.random() * 2);
    switch (tamanho) {
      case 0:
        return "tamanho0"
      case 1:
        return "tamanho1"
      case 2:
        return "tamanho2"
    }
  }


  somaAcertos = () => {
    bolasAcertadas++
    document.querySelector('.bolasAcertadas').innerHTML =
      bolasAcertadas.toString().padStart(2, '0');
  }

  somaDesacertos = () => {
    bolasPerdidas++
    document.querySelector('.bolasPerdidas').innerHTML = bolasPerdidas.toString().padStart(2, '0');
  }

  multiplicador = (acao) => {
    if (acao == 'somar') {
      multiplicadorPontos++

    } else if (acao == 'subtrair' && multiplicadorPontos > 00) {
      multiplicadorPontos--
    }
    document.querySelector('.multiplicadorPontos').innerHTML =
      multiplicadorPontos.toString().padStart(2, '0');
    return multiplicadorPontos
  }

  pontosJogo = function () {
    pontos += multiplicador()
    document.querySelector('.pontosPartida').innerHTML = pontos.toString().padStart(3, '0')
  };

  var cronometroDeJogo = setInterval(() => {
    document.querySelector('.cronometroJogo').innerHTML = tempoDeJogo
    tempoDeJogo--
    if (tempoDeJogo == -1) {
      clearInterval(tempodaBola)
      clearInterval(cronometroDeJogo)
      fimJogo()
    }
  }, 1000);


  var ganhou = document.querySelector('#resultadoPositivo')
  ganhou.classList.remove('d-flex')

  var perdeu = document.querySelector('#resultadoNegativo')
  perdeu.classList.remove('d-flex')
  fimJogo = () => {

    if (bolasAcertadas > bolasPerdidas) {
      console.log('Parabéns, você granhou!', bolasAcertadas, bolasPerdidas);
      ganhou.classList.add('d-flex')

    } else if (bolasAcertadas < bolasPerdidas) {
      console.log('Perdeu ladrão hahaha', bolasAcertadas, bolasPerdidas);
      perdeu.classList.add('d-flex')
    } else {
      console.log('empatou!', bolasAcertadas, bolasPerdidas);

    }

  }


})()