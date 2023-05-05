class Bola {
    constructor(jogo) {
      this.posicaoX = width / 2;
  
      this.posicaoY = height / 2;
  
      this.velocidadeX = random([-5, -3, 3, 5]);
  
      this.velocidadeY = random([-5, -3, 3, 5]);
  
      this.diametro = 20;
  
      this.jogo = jogo;
    }
  
    centralizar() {
      this.posicaoX = width / 2;
  
      this.posicaoY = height / 2;
    }
  
    desenhar() {
      circle(this.posicaoX, this.posicaoY, this.diametro);
    }
  
    movimentar() {
      this.posicaoX += this.velocidadeX;
  
      this.posicaoY += this.velocidadeY;
    }
  
    checarBordas() {
      if (this.posicaoX - this.diametro / 2 <= 0) {
        this.jogo.pontuar(2);
  
        this.jogo.parar();
      } else if (this.posicaoX + this.diametro / 2 >= width) {
        this.jogo.pontuar(1);
  
        this.jogo.parar();
      }
  
      if (this.posicaoY - this.diametro / 2 <= 0) {
        this.velocidadeY *= -1;
      }
  
      if (this.posicaoY + this.diametro / 2 >= height) {
        this.velocidadeY *= -1;
      }
    }
  
    checarColisaoPlayer(jogador) {
      this.ymenor = jogador.posicaoY;
  
      this.ymaior = jogador.posicaoY + jogador.altura;
  
      if (jogador.id == 1) {
        this.xreferencia = jogador.posicaoX + jogador.largura;
  
        if (
          this.posicaoX - this.diametro / 2 <= this.xreferencia &&
          this.posicaoX - this.diametro / 2 > 0
        ) {
          if (this.posicaoY >= this.ymenor && this.posicaoY <= this.ymaior) {
            this.velocidadeX *= -1;
          }
        }
      } else if (jogador.id == 2) {
        this.xreferencia = jogador.posicaoX;
  
        if (
          this.posicaoX + this.diametro / 2 >= this.xreferencia &&
          this.posicaoX < width
        ) {
          if (this.posicaoY >= this.ymenor && this.posicaoY <= this.ymaior) {
            this.velocidadeX *= -1;
          }
        }
      }
    }
  }
  
  class Jogador {
    constructor(tipoJ) {
      this.id = tipoJ;
  
      this.altura = 80;
  
      this.largura = 20;
  
      if (this.id == 1) {
        this.posicaoX = 0;
      } else if (this.id == 2) {
        this.posicaoX = width - this.largura;
      }
  
      this.posicaoY = 150
  
      this.velocidadeY = 10;
    }
  
    movimentar() {
      if (this.id == 1) {
        if (keyIsDown(SHIFT)) {
          if (this.posicaoY > 0) {
            this.posicaoY -= this.velocidadeY;
          } else {
            this.posicaoY = 0;
          }
        }
  
        if (keyIsDown(CONTROL)) {
          this.posicaoY += this.velocidadeY;
  
          if (this.posicaoY + this.altura > height) {
            this.posicaoY = height - this.altura;
          }
        }
      } else if (this.id == 2) {
        if (keyIsDown(UP_ARROW)) {
          if (this.posicaoY > 0) {
            this.posicaoY -= this.velocidadeY;
          } else {
            this.posicaoY = 0;
          }
        }
  
        if (keyIsDown(DOWN_ARROW)) {
          this.posicaoY += this.velocidadeY;
  
          if (this.posicaoY + this.altura > height) {
            this.posicaoY = height - this.altura;
          }
        }
      }
    }
  
    desenhar() {
      rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    }
  }
  
  class Jogo {
    constructor() {
      this.rodando = false;
  
      this.pontosP1 = 0;
  
      this.pontosP2 = 0;
    }
  
    parar() {
      this.rodando = false;
    }
  
    iniciar() {
      this.bola.centralizar();
  
      this.rodando = true;
    }
  
    pontuar(p) {
      if (p == 1) {
        this.pontosP1++;
      } else if (p == 2) {
        this.pontosP2++;
      }
  
      print("Pontos p1:" + this.pontosP1 + " /Pontos p2:" + this.pontosP2);
    }
  
    zerarPontos() {
      this.pontosP1 = this.pontosP2 = 0;
    }
  
    setarBola(bola) {
      this.bola = bola;
    }
  }
  
  function setup() {
    createCanvas(600, 400);
    jogo = new Jogo();
  
    bola1 = new Bola(jogo);
  
    jogador1 = new Jogador(1);
  
    jogador2 = new Jogador(2);
  
    jogo.setarBola(bola1);
  }
  
  function draw() {
    background("black");
  
    jogador1.desenhar(fill(255, 0, 0), stroke(255, 255, 255));
  
    jogador2.desenhar(fill(0, 0, 255), stroke(255, 255, 255));
  
    if (jogo.rodando == true) {
      bola1.desenhar(fill(255, 255, 255), stroke(255, 255, 0));
  
      bola1.movimentar();
  
      bola1.checarBordas();
  
      jogador1.movimentar();
  
      jogador2.movimentar();
  
      bola1.checarColisaoPlayer(jogador1);
  
      bola1.checarColisaoPlayer(jogador2);
    } else {
      if (keyIsDown(ENTER)) {
        jogo.iniciar();
      }
    }
  }
  