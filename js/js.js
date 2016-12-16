

// Declaración de variables
// ------------------------
var y = 10;				// altura inicial y0=10%, debe leerse del css
var alturaMax = 72;		// altura máxima
var v = 0;				// velocidad de la nave (m s-1)

var g = 1.622;			// gravedad lunar (m s-2)
var a = g;				// aceleración de la nave
var dt = 0.016683;		// intervalo temporal (ms)
var timer;				// temporizador

var fuel = 110;			// combustible de la nave en el depósito (%)
var fueltimer = null;	// temporizador para el fuel

var indice = 0;			// índice para seleccionar una nave
var maxindice = 5;		// número de naves disponibles

						// array de imágenes de nave
var nave = ["<img src='img/nave1.gif' alt=' '>",
			"<img src='img/nave2.png' alt=' '>",
			"<img src='img/nave3.png' alt=' '>",
			"<img src='img/nave4.png' alt=' '>",
			"<img src='img/nave5.png' alt=' '>"];

						// array de imágenes de nave con los motores activados (las naves 1 y 5 no muestran los motores)
var nave_motorOn = ["<img src='img/nave1.gif' alt='img nave'>",				
					"<img src='img/nave2_motorOn.png' alt=' '>",
					"<img src='img/nave3_motorOn.png' alt=' '>",
					"<img src='img/nave4_motorOn.png' alt=' '>",
					"<img src='img/nave5.png' alt=' '>"];




// Método para mover la nave
function start(){
	timer = setInterval(function(){moverNave(); }, dt*1000);		// setInterval(,ms)

	document.getElementById("musica").innerHTML = "<audio src='./audio/VWSymphony.mp3' type='audio/mp3' controls autoplay loop preload:none metadata auto></audio>"; // cargar música
}


// Método para parar la nave
function stop(){
	document.getElementById("musica").innerHTML = "<audio src='./audio/VWSymphony.mp3' type='audio/mp3' controls stop loop preload:none metadata auto></audio>"; // cargar música

	clearInterval(timer);
}


// Método llamado una vez cargada completamente la página
// para evitar que se cargue primero el JS antes que todos los tags del HTML y el JS no los encuentre
window.onload = function(){

	//document.body.style.background = "url('img/fondo.png')";										// cargar cielo

	//document.getElementsByClassName("d")[0].style.background = "url('img/luna.png') no-repeat";		// cargar superficie lunar
	//document.getElementsByClassName("d")[0].style.backgroundSize = "cover";

	document.getElementById("nave").innerHTML = nave[indice];										// cargar primera nave
	document.getElementById("cambioNave").onclick = cambiarNave;									// cambiar de nave
	
	start();	// mover la nave

	//document.onkeydown = motorOn; // activar motores al apretar una tecla del teclado
	//document.onkeyup = motorOff; // desactivar motores al desapretar una tecla del teclado
	
	document.getElementById("botonrojo").onmousedown = motorOn;		// activar motores al apretar el botón rojo
	document.getElementById("botonrojo").onmouseup = motorOff;		// desactivar motores al desapretar el botón rojo

	// Método para mostrar menú al clicar sobre el texto showm
    document.getElementById("showm").onclick = function () {
    	document.getElementById("cpanel").style.display = "none";
		document.getElementsByClassName("c")[0].style.display = "block";
		stop(); // parar nave
	}

	// Método para esconder menú al clicar sobre el texto hidem
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		document.getElementById("cpanel").style.display = "block";
		start(); // mover nave
	}

}


// Método que describe el movimiento de la nave
function moverNave(){
	v +=a*dt; // velocidad acumulada de la nave
	document.getElementById("velocidad").innerHTML = v.toFixed(2);

	y +=v*dt; // altura acumulada de la nave
	document.getElementById("altura").innerHTML = (alturaMax - y).toFixed(0);

	document.getElementById("fuel").innerHTML = fuel;	// fuel actualizado de la nave
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<=alturaMax){ 
		document.getElementById("nave").style.top = y+"%"; // y(%)
	} else { 
		stop();
		// cambiar imagen
		if (v<10){
			document.getElementById("nave").style.display = "none";
			document.body.style.background = "black url('img/astronauta.png') no-repeat center bottom"; 	// astronauta
		}
		else{
			document.getElementById("nave").innerHTML = "<img src='img/explosion.gif' alt='img nave'>"; 	// nave estrellada
		}
	}
}


// Método para "frenar" la nave al activar los motores
function motorOn(){
		a=-g; 																//la nave sube
		fueltimer = setInterval(function(){restarFuel();},100);				// restamos un 1% de fuel cada 100ms

		document.getElementById("nave").innerHTML = nave_motorOn[indice];	// cambiar a nave con los motores activados
		if (indice!=0&&indice!=4){
			document.getElementById("nave").style.height = "30%";
		}	
}

// Método para permitir que vuelva a bajar la nave al desactivar los motores
function motorOff(){	
	a=g; 															//la nave desciende
	clearInterval(fueltimer);
	fueltimer = null;

	document.getElementById("nave").style.height = "20%";
	document.getElementById("nave").innerHTML = nave[indice]; 		// cambiar a nave con los motores desactivados
}

// Método para restar combustible
function restarFuel(){
	fuel -= 1;
}


// Método cambiar nave
function cambiarNave(){
	if (y<=alturaMax){
		indice++;
		if (indice==maxindice) {indice=0};	
		document.getElementById("nave").innerHTML = nave[indice];
	}
}