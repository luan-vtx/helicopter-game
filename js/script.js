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

	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
	
	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});
	
	//Game Loop
	jogo.timer = setInterval(loop,30);

	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
	}

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
} // Fim da função start