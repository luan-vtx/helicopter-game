// quando o jogo é iniciado a tela inicial é removida e são adicionados as divs do jogador, do amigo e dos inimigos
function start() {
	$("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	//Principais variáveis do jogo
	let jogo = {};

	let TECLA = {
		W: 87,
		S: 83,
		D: 68
	};

	let velocidadeInimigo1 = 5;
	let posicaoYDoInimigo1 = parseInt(Math.random() * 334);
	let podeAtirar = true;
	let fimdejogo = false;

	let pontosDoJogador = 0;
	let amigosSalvos = 0;
	let amigosPerdidos = 0;

	let energiaAtual = 3;

	let somDisparo=document.getElementById("somDisparo");
	let somExplosao=document.getElementById("somExplosao");
	let musica=document.getElementById("musica");
	let somGameover=document.getElementById("somGameover");
	let somPerdido=document.getElementById("somPerdido");
	let somResgate=document.getElementById("somResgate");

	jogo.pressionou = [];

	// música de fundo em loop
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();

	// verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	// função que movimenta a imagem de fundo do jogo
	function movefundo() {
		esquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position", esquerda - 5);
	}

	// função que movimenta o jogador para cima e para baixo na tela
	function movejogador() {
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo - 10);

			// esse condicional impede o jogador de sair da tela do jogo
			if (topo <= 0) {
				$("#jogador").css("top", topo + 10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {	
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo + 10);	

			// esse condicional impede o jogador de sair da tela do jogo
			if (topo >= 430) {	
				$("#jogador").css("top", topo - 10);
			}
		}
		
		if (jogo.pressionou[TECLA.D]) {
			// chama a função disparo
			disparo();
		}
	}

	// função responsável por movimentar o inimigo 1 para a esquerda
	function moveinimigo1() {
		posicaoXdoInimigo1 = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left", posicaoXdoInimigo1 - velocidadeInimigo1);
		$("#inimigo1").css("top", posicaoYDoInimigo1);
		
		// se o inimigo chegar no final da tela do jogo, esse condicional irá realocá-lo no inicio da tela
		if (posicaoXdoInimigo1 <= 0) {
			posicaoYDoInimigo1 = parseInt(Math.random() * 350);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoYDoInimigo1);
		}
	}

	// função responsável por movimentar o inimigo 2 para a direita
	function moveinimigo2() {
		posicaoXdoInimigo2 = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left", posicaoXdoInimigo2 - 3);
		
		// reposiciona o inimigo 2 quando ele chegar no limite da tela
		if (posicaoXdoInimigo2 <= 0) {
			$("#inimigo2").css("left",775);		
		}
	}

	// função que realiza a movimentação do amigo
	function moveamigo() {
		posicaoXdoAmigo = parseInt($("#amigo").css("left"));
		$("#amigo").css("left", posicaoXdoAmigo + 1);
					
		if (posicaoXdoAmigo > 906) {
			$("#amigo").css("left", 0);	
		}
	}

	// função que realiza o disparo do jogador
	function disparo() {
		if (podeAtirar === true) {
			somDisparo.play();
			podeAtirar = false;
			posicaoTopoDoJogador = parseInt($("#jogador").css("top"))
			posicaoXDoJogador = parseInt($("#jogador").css("left"))
			posicaoXdoTiro = posicaoXDoJogador + 190;
			posicaoTopoDoTiro = posicaoTopoDoJogador + 40;

			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top",posicaoTopoDoTiro);
			$("#disparo").css("left", posicaoXdoTiro);
			
			var tempoDisparo = window.setInterval(executaDisparo, 30);
		}

		// função que posiciona o tiro na frente do jogador
		function executaDisparo() {
			posicaoXDoTiro = parseInt($("#disparo").css("left"));
			$("#disparo").css("left", posicaoXDoTiro + 15);

			// condicional que controla quando o jogador pode atira novamente (apenas quando o tiro anterior tiver saido da tela)
			if (posicaoXDoTiro > 900) {
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;	
			}
		}
	}

	// funcao que realiza o efeito de explosão quando o jogador colide com o inimigo 1 (o helicoptero)
	function explosao1(inimigo1X,inimigo1Y) {
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");
		let tempoExplosao = window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	}

	// funcao que realiza o efeito de explosão quando o jogador colide com o inimigo 2 (o caminhão)
	function explosao2(inimigo2X,inimigo2Y) {
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");

		let div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({ width: 200, opacity: 0 }, "slow");
		
		let tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
		
		function removeExplosao2() {
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2 = null;
		}
	}

	// funcao que realiza o efeito de explosão quando o amigo colide com o inimigo 2 (o caminhão)
	function explosao3(amigoX, amigoY) {
		somPerdido.play();
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);

		let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

		function resetaExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3 = null;
		}
	}

	// funcão que reposiciona o inimigo 2 quando ele colide com o jogador
	function reposicionaInimigo2() {
		var tempoColisao4 = window.setInterval(reposiciona4, 5000);
	
		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4 = null;
				
			if (fimdejogo === false) {
				$("#fundoGame").append("<div id=inimigo2></div");
			}
		}	
	}
	
	// função que reposiciona o amigo quando o jogo ainda não foi finalizado
	function reposicionaAmigo() {
		var tempoAmigo = window.setInterval(reposiciona6, 5000);
		
		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;
			
			if (fimdejogo == false) {
				$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
			}
		}
	}

	// função responsável por gerenciar as possiveis colisões do jogo
	function colisao() {
		let colisao1 = ($("#jogador").collision($("#inimigo1")));
		let colisao2 = ($("#jogador").collision($("#inimigo2")));
		let colisao3 = ($("#disparo").collision($("#inimigo1")));
		let colisao4 = ($("#disparo").collision($("#inimigo2")));
		let colisao5 = ($("#jogador").collision($("#amigo")));
		let colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		// verifica colisão do jogador com o inimigo 1
		// caso haja colisão, a explosão ira ocorrer e o inimigo 1 será reposicionado na inicio da tela
		if (colisao1.length > 0) {
			energiaAtual -= 1;	
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X, inimigo1Y);

			posicaoYDoInimigo1 = parseInt(Math.random() * 350);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoYDoInimigo1);
		}

		// verifica colisão com o inimigo 2
		// caso haja colisão, a explosão ira ocorrer e o inimigo 2 será reposicionado na inicio da tela
    if (colisao2.length > 0) {
			energiaAtual -= 1;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X,inimigo2Y);
			$("#inimigo2").remove();
			reposicionaInimigo2();
		}

		// verifica se houve colisão entre o disparo do jogador e o inimigo 1
		// caso haja colisão, a explosão ira ocorrer e o inimigo 1 será reposicionado na inicio da tela
		if (colisao3.length > 0) {
			velocidadeInimigo1 += 1;
			pontosDoJogador += 100;
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			$("#disparo").css("left", 950);

			posicaoYDoInimigo1 = parseInt(Math.random() * 350);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoYDoInimigo1);
		}

		// verifica se houve colisão entre o disparo do jogador e o inimigo 2
		// caso haja colisão, a explosão ira ocorrer e o inimigo 2 será reposicionado na inicio da tela
		if (colisao4.length > 0) {
			pontosDoJogador += 50;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();
		
			explosao2(inimigo2X, inimigo2Y);
			$("#disparo").css("left",950);
			reposicionaInimigo2();
		}

		// verifica se houve colisao do jogador com o amigo e o "resgata" (remove-o da tela)
		if (colisao5.length > 0) {
			somResgate.play();
			amigosSalvos += 1;
			reposicionaAmigo();
			$("#amigo").remove();
		}

		// verifica se houve colisão do amigo com o inimigo 2
		// se houver colisão, o amigo explode e dps de alguns segundos outro amigo é reposicionado na tela
		if (colisao6.length > 0) {
			amigosPerdidos += 1;
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));

			explosao3(amigoX, amigoY);
			$("#amigo").remove();	
			reposicionaAmigo();
		}
	}

	function placar() {
		$("#placar").html("<h2> Pontos: " + pontosDoJogador + " Salvos: " + amigosSalvos + " Perdidos: " + amigosPerdidos + "</h2>");
	}

	// função que gerencia a imagem de energia que será mostrada no jogo
	function energia() {
		if (energiaAtual === 3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}

		if (energiaAtual === 2) {
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}

		if (energiaAtual === 1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}

		if (energiaAtual === 0) {
			$("#energia").css("background-image", "url(imgs/energia0.png)");
		}
	}

	// game Loop
	// esse timer irá executar as função que movimentam o jogo a cada 30 milissegundos
	jogo.timer = setInterval(loop, 30);

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
		placar();
		energia();
	}
} // fim da função start