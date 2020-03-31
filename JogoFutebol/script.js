mudaPagina = url => {
  document.getElementById("conteudoCentral").innerHTML = "";
  let pagina = new XMLHttpRequest();
  pagina.open("GET", url);
  pagina.onreadystatechange = () => {
    if (pagina.readyState == 4 && pagina.status == 200) {
      document.getElementById("conteudoCentral").innerHTML =
        pagina.responseText;
    }
  };
  pagina.send();
};

function zeroEsquerda(n, comprimento) {
  numero = n.toString();
  if (n < 0) {
    numero = numero.replace("-", "");
    while (numero.length < comprimento) numero = "0" + numero;
    return "-" + numero;
  } else {
    while (numero.length < comprimento) numero = "0" + numero;
    return numero;
  }
}

var altura = 0;
var largura = 0;
var pontosPositivos = 0;
var pontosNegativos = 0;
var tempo = 5;
var pontos = 0;
var contador = 1;
document.getElementById("cronometro").innerHTML = tempo;
document.getElementById("pontos").innerHTML = zeroEsquerda(pontos, 3);
document.getElementById("multiplicador").innerHTML = zeroEsquerda(contador, 2);

verificaTamanho = () => {
  altura = document.getElementById("jogo").scrollHeight;
  largura = document.getElementById("jogo").scrollWidth;
  return altura, largura;
};

verificaTamanho();
tamanhoBola = () => {
  let tamanho = Math.floor(Math.random() * 3);
  switch (tamanho) {
    case 0:
      return "tamanho0";

    case 1:
      return "tamanho1";

    case 2:
      return "tamanho2";
  }
};

ladoChute = () => {
  let lado = Math.floor(Math.random() * 2);
  switch (lado) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
};

posicaoAleatoria = () => {
  if (document.getElementById("bola")) {
    document.getElementById("bola").style.transform =
      "scale(0.3) translate(0px, 1000px)";
    document.getElementById("bola").style.transition = "0.5s";

    verificaPontos = () => {
      if (pontos > 0) {
        return pontos--;
      } else {
        return (pontos = 0);
      }
    };
    verificaPontos();
    verificaMult = () => {
      if (contador > 0) {
        return contador--;
      } else {
        return (contador = 0);
      }
    };
    verificaMult();
    document.getElementById("multiplicador").innerHTML = zeroEsquerda(
      contador,
      2
    );
    document.getElementById("pontos").innerHTML = zeroEsquerda(pontos, 3);
    pontosNegativos++;
    console.log(pontosNegativos);
    document.getElementById("errados").innerHTML = pontosNegativos;

    let imgBolaX = document.createElement("img");
    imgBolaX.src = "img/bolaX.png";
    imgBolaX.className = "bolaPlacar";
    document.getElementById("contadorNegativo").appendChild(imgBolaX);

    setTimeout(() => {
      document.getElementById("bola").remove();
    }, 500);
  }

  var posicaoX = Math.floor(Math.random() * largura);
  var posicaoY = Math.floor(Math.random() * altura);

  let bola = document.createElement("img");
  bola.src = "img/bola3.png";
  bola.className = `${tamanhoBola()} ${ladoChute()}`;
  bola.style.left = `${posicaoX}px`;
  bola.style.top = `${posicaoY}px`;
  bola.style.position = `absolute`;
  bola.style.padding = "2px";
  bola.id = "bola";
  bola.onclick = function clique() {
    pontos += contador;
    contador++;
    document.getElementById("multiplicador").innerHTML = zeroEsquerda(
      contador,
      2
    );
    document.getElementById("pontos").innerHTML = zeroEsquerda(pontos, 3);
    pontosPositivos++;
    document.getElementById("certos").innerHTML = pontosPositivos;
    bola.style.transform = "scale(0.1) translate(0px, -1000px)";
    bola.style.transition = "0.3s";
    let imgBola = document.createElement("img");
    imgBola.src = "img/bola1C.png";
    imgBola.className = "bolaPlacar";
    document.getElementById("contadorPositivo").appendChild(imgBola);
    setTimeout(() => {
      this.remove();
    }, 100);
  };

  document.getElementById("jogo").appendChild(bola);
};

let jogo = setInterval(() => {
  posicaoAleatoria();
}, 1500);

var cronometro = setInterval(() => {
  tempo -= 1;
  if (tempo < 0.1) {
    clearInterval(cronometro);
    clearInterval(jogo);

    if (pontosPositivos > pontosNegativos) {
      document.getElementById("modalTitle").style.color = "white";
      document.getElementById("modalTitle").innerHTML =
        "Parabéns, você ganhou! <i class='fas fa-thumbs-up'></i>";

      document.getElementById("modalBody").style.color = "white";
      document.getElementById(
        "modalBody"
      ).innerHTML = `Você acertou ${pontosPositivos} e errou apenas ${pontosNegativos}. Seu escore foi de ${pontos} pontos!`;
      document.getElementById("modalBotao1").className = "btn btn-info";
      document.getElementById("modalBotao2").className = "btn btn-primary";
      document.getElementById("modalBotao1").href = "";
      document.getElementById("modalBotao1").innerHTML = "Inicio";
      document.getElementById("modalBotao2").innerHTML = "Jogue novamente";
      document.getElementById("modalBotao2").href = "home.html";
      document.getElementById("estruturaModal").className =
        "bg-success modal-content";
      $("#modal").modal("show");
    } else if (pontosNegativos > pontosPositivos) {
      document.getElementById("modalTitle").style.color = "white";
      document.getElementById("modalTitle").innerHTML =
        "Fim de jogo, você perdeu! <i class='far fa-frown'></i>";

      document.getElementById("modalBody").style.color = "white";
      document.getElementById(
        "modalBody"
      ).innerHTML = `Você errou ${pontosNegativos} e acertou ${pontosPositivos}. Seu escore foi ${pontos}`;
      document.getElementById("modalBotao1").className = "btn btn-info";
      document.getElementById("modalBotao2").className = "btn btn-primary";
      document.getElementById("modalBotao1").href = "";
      document.getElementById("modalBotao1").innerHTML = "Inicio";
      document.getElementById("modalBotao2").innerHTML = "Jogue novamente";
      document.getElementById("modalBotao2").href = "home.html";
      document.getElementById("estruturaModal").className =
        "bg-danger modal-content";
      $("#modal").modal("show");
    } else {
      document.getElementById("modalTitle").style.color = "white";
      document.getElementById("modalTitle").innerHTML =
        "Fim de jogo, você empatou! <i class='far fa-frown'></i>";

      document.getElementById("modalBody").style.color = "white";
      document.getElementById(
        "modalBody"
      ).innerHTML = `Você errou ${pontosNegativos} e acertou ${pontosPositivos}. Seu escore foi ${pontos}.`;
      document.getElementById("modalBotao1").className = "btn btn-info";
      document.getElementById("modalBotao2").className = "btn btn-primary";
      document.getElementById("modalBotao1").href = "";
      document.getElementById("modalBotao1").innerHTML = "Inicio";
      document.getElementById("modalBotao2").innerHTML = "Jogue novamente";
      document.getElementById("modalBotao2").href = "home.html";
      document.getElementById("estruturaModal").className =
        "bg-dark modal-content";
      $("#modal").modal("show");
    }
  }
  document.getElementById("cronometro").innerHTML = tempo;
}, 1000);
