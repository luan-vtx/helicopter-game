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

	//Game Loop
	jogo.timer = setInterval(loop, 30);

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
	}
} // Fim da função start