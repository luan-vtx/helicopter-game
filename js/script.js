function start() {
	$("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

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

	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	//Função que movimenta o fundo do jogo
	function movefundo() {
		esquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position", esquerda - 5);
	}

	// função que movimenta o jogador
	function movejogador() {
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo - 10);

			if (topo <= 0) {
				$("#jogador").css("top", topo + 10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {	
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo + 10);	

			if (topo >= 430) {	
				$("#jogador").css("top", topo - 10);
			}
		}
		
		if (jogo.pressionou[TECLA.D]) {
			//Chama função Disparo
			disparo();
		}
	}

	function moveinimigo1() {
		posicaoXdoInimigo1 = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left", posicaoXdoInimigo1 - velocidadeInimigo1);
		$("#inimigo1").css("top", posicaoYDoInimigo1);
			
		if (posicaoXdoInimigo1 <= 0) {
			posicaoYDoInimigo1 = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top", posicaoYDoInimigo1);
		}
	}

	function moveinimigo2() {
		posicaoXdoInimigo2 = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left", posicaoXdoInimigo2 - 3);
				
		if (posicaoXdoInimigo2 <= 0) {
			$("#inimigo2").css("left",775);		
		}
	}

	function moveamigo() {
		posicaoXdoAmigo = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoXdoAmigo + 1);
					
		if (posicaoXdoAmigo > 906) {
			$("#amigo").css("left", 0);	
		}
	}

	function disparo() {
		if (podeAtirar === true) {
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
	 
		function executaDisparo() {
			posicaoXDoTiro = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoXDoTiro + 15); 
	
			if (posicaoXDoTiro > 900) {
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#disparo").remove();
				podeAtirar=true;	
			}
		}
	}

	// funcao que realiza o efeito de explosão quando o jogador colide com o inimigo 1 (o helicoptero)
	function explosao1(inimigo1X,inimigo1Y) {
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");
		var tempoExplosao = window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	}

	// funcao que realiza o efeito de explosão quando o jogador colide com o inimigo 2 (o caminhão)
	function explosao2(inimigo2X,inimigo2Y) {
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

	function colisao() {
		let colisao1 = ($("#jogador").collision($("#inimigo1")));
		let colisao2 = ($("#jogador").collision($("#inimigo2")));
		let colisao3 = ($("#disparo").collision($("#inimigo1")));
		let colisao4 = ($("#disparo").collision($("#inimigo2")));
		let colisao5 = ($("#jogador").collision($("#amigo")));
		let colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		// verifica colisão com o inimigo 1
		if (colisao1.length > 0) {	
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X, inimigo1Y);
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
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

		// verifica colisão com o inimigo 2
    if (colisao2.length > 0) {
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X,inimigo2Y);
			$("#inimigo2").remove();
			reposicionaInimigo2();
		}

		// verifica se houve colisão entre o disparo do jogador e o inimigo 1
		if (colisao3.length > 0) {
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			$("#disparo").css("left",950);
				
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
		}

		// verifica se houve colisão entre o disparo do jogador e o inimigo 2
		if (colisao4.length > 0) {
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();
		
			explosao2(inimigo2X,inimigo2Y);
			$("#disparo").css("left",950);
			
			reposicionaInimigo2();
		}
	}

	//Game Loop
	jogo.timer = setInterval(loop, 30);

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
	}
} // Fim da função start