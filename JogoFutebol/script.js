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
  altura = window.innerHeight;
  largura = window.innerWidth;
  return altura, largura;
};

verificaTamanho();

posicaoAleatoria = () => {
  var posicaoX = Math.floor(Math.random() * largura) - 100;
  var posicaoY = Math.floor(Math.random() * altura) - 100;

  posicaoY = posicaoY < 0 ? 0 : posicaoY;
  posicaoX = posicaoX < 0 ? 0 : posicaoX;

  console.log(posicaoX, posicaoY, largura, altura);

  let bola = document.createElement("img");
  bola.src = "img/bola1.png";
  bola.style.width = "50px";
  bola.style.left = `${posicaoX}px`;
  bola.style.top = `${posicaoY}px`;
  bola.style.position = `absolute`;
  bola.style;
  bola.id = "bola";

  document.getElementById("jogo").appendChild(bola);
};
posicaoAleatoria();
