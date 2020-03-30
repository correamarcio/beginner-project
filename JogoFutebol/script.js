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

var altura = 0;
var largura = 0;

verificaTamanho = () => {
  altura = document.getElementById("jogo").scrollHeight;
  largura = document.getElementById("jogo").scrollWidth;
  altura -= 100;
  largura -= 100;
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
    //document.getElementById("bola").remove();

    let imgBolaX = document.createElement("img");
    imgBolaX.src = "img/bolaX.png";
    imgBolaX.className = "bolaPlacar";
    document.getElementById("contadorNegativo").appendChild(imgBolaX);
  }

  var posicaoX = Math.floor(Math.random() * largura);
  var posicaoY = Math.floor(Math.random() * altura);

  console.log(largura, posicaoX);
  console.log(altura, posicaoY);

  let bola = document.createElement("img");
  bola.src = "img/bola3.png";
  bola.className = `${tamanhoBola()} ${ladoChute()}`;
  bola.style.left = `${posicaoX}px`;
  bola.style.top = `${posicaoY}px`;
  bola.style.position = `absolute`;
  bola.style.padding = "2px";
  bola.id = "bola";
  bola.onclick = function clique() {
    bola.style.transform = "scale(0.1) translate(-1000px, -1000px)";
    bola.style.transition = "0.5s";
    let imgBola = document.createElement("img");
    imgBola.src = "img/bola3.png";
    imgBola.className = "bolaPlacar";
    document.getElementById("contadorPositivo").appendChild(imgBola);
  };

  document.getElementById("jogo").appendChild(bola);
};

setInterval(() => {
  posicaoAleatoria();
}, 1000);

console.time(0);
console.timeEnd(30);
