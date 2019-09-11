var centesimas = 0;
var segundos = 59;
var minutos = 1;
var horas = 0;
var control;
function inicio() {
	Minutos.innerHTML = "01";
	Segundos.innerHTML = ":59";
	control = setInterval(cronometro,10);

}
function parar () {
	clearInterval(control);

}
function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 59;
	minutos = 1;
	horas = 0;
	// Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = "02";
	// Horas.innerHTML = "00";

}
function cronometro () {
	var lm = false;
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		// Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0 && lm == false) {
		segundos --;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}

	if ( (centesimas == 0)&&(segundos == 0) ) {
		 if (minutos == 0) {
			 minutos = 0;
			 lm = true
		 }else{
			minutos--;
		 }

		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ""+minutos;
	}
	if (segundos == 0 && lm == false) {
		 if (lm) {
			parar ()
		 }else{
			segundos = 59;
		 }
	}else{
		if (lm) {
			parar ()
			ini = false
			presentarResultado()
		 }
	}
}
