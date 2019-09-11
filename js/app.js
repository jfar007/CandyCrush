var fc = 7
var puntacion = 0
var movimientos = 0
var bcolor = false
var x = ""
var caramelos=[]
var temp=[]
var posiactual
var coordenadas = []
var ini = false
var fin = false


$(function(){
	
})

$(function(){
	$(".btn-reinicio")
	.on("click", function(){
			$(".col-1").switchClass("col-1","col-2",2000);
			if(ini){
				reini()
			}else{
				inic()			
			}
	})
	$( "#effect" ).toggle();
	var ele = $(".main-container h1")
	$(ele[0]).animate(
		{color:"white"},5000);
	cambiarColor($(".main-container h1")[0]);
	
	poblarCaramelos();
	// poblarCaramelos2();
	cargarTablero();
	
})

function reini(){
	ini = false	
	puntacion = 0
	movimientos = 0
	$(".btn-reinicio").text("Iniciar")
	$("#movimientos-text").text(movimientos)
	$("#score-text").text(puntacion)
	reinicio()

}

function inic(){
	if(fin){
		location.reload();
	}
	ini = true
	$(".btn-reinicio").text("Reiniciar")
	inicio()
	orquestaTablero();
	
}
function cargarTablero(x,y){
	var div = $(".panel-tablero div");
	for(var i = 0; i < fc; i++){		
		for(var f = 0; f  < fc; f++){
				var id = "id-" + f
				$(div[f]).attr("id",id)
				crearImagenDiv( i, f,id);
		}
	}
}


function cambiarColor(elemento){
		setTimeout(function(){ 
			if(bcolor){
						$(elemento).animate(
							{color:"#DCFF0E"},500);
							bcolor = false;
			}else{
						$(elemento).animate(
							{color:"#FFFFFF"},500);
							bcolor = true;
			}
			cambiarColor(elemento)
		}, 500);
}


function crearImagenDiv(fila,columna , div){
	var divv = document.getElementById(div);
	var cdiv = document.createElement("div");
	if(divv != null && divv.className != null && cdiv != null ){
		divv.appendChild(cdiv);
	}
	if(divv != null && divv.className != null){		
		var divanime = $("."+divv.className +" div")[fila];
		divanime.setAttribute("class","draggable");
		divanime.setAttribute("id","F"+fila+"C"+columna);
	}

	var cimg = document.createElement("img");
	cimg.setAttribute("src", "image/"+caramelos[fila][columna]+".png");
	cimg.setAttribute("class", "elemento");
	cdiv.appendChild(cimg);
}

 
 $( function() {
		  $(".draggable").draggable(
				{distance: 5}
			)
			.droppable({
			  drop: function(event, ui){
					event.preventDefault();
					var iddestino = ui.draggable.context.id;
					var idorigen = event.target.id;
					var vrtemp = caramelos[iddestino.substring(1, 2)][iddestino.substring(3, 4)] ;
					caramelos[iddestino.substring(1, 2)][iddestino.substring(3, 4)] = caramelos[idorigen.substring(1, 2)][idorigen.substring(3, 4)];
					caramelos[idorigen.substring(1, 2)][idorigen.substring(3, 4)] =  vrtemp;
					var dd = document.getElementById(iddestino)
					dd.style = ""
					dd.appendChild(event.target.childNodes[0]);
					event.target.appendChild(ui.draggable.context.childNodes[0]);
					if(ini){
												movimientos += 1
					}
					$("#movimientos-text").text(movimientos)
				}
		})
 
 });
 
 function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}


function Caramelo(columa, fila){
	this.fila = fila;
	this.columa = columa;
}

function poblarCaramelos(){
	for(var i = 0; i< fc; i++){
			if(caramelos.length != fc){
				var ccaramelos1 = ["","","","","","",""]
				caramelos.push(ccaramelos1)
			}
	}
	for(var i = 0; i< caramelos.length; i++){
		for(var f = 0; f<caramelos[0].length; f++){
			if(caramelos[i][f] == ""){
				var imag = 	Math.floor(Math.random() * 4) + ""; 
				imag = imag.replace("0","4");
				caramelos[i][f] = imag
			}			
		}
	}
}
function poblarCaramelos2(){
	
	var ccaramelos1 = ["1","1","2","2","2","4","1"]
	var ccaramelos2 = ["2","2","1","2","2","4","1"]
	var ccaramelos3 = ["3","2","1","3","3","1","3"]
	var ccaramelos4 = ["1","2","4","4","4","4","2"]
	var ccaramelos5 = ["1","2","2","4","1","4","2"]
	var ccaramelos6 = ["1","3","3","1","1","4","1"]
	var ccaramelos7 = ["3","3","1","1","2","2","2"]	
	caramelos = [ccaramelos1,ccaramelos2,ccaramelos3,ccaramelos4,ccaramelos5,ccaramelos6,ccaramelos7]
}

function evaluarMatriz(){
	var ressatisfactorio = []
	var satisfactorio = []

	for(var j = 1; j < 5 ; j++){
		temp = []
		for (var h = 0 ; h < fc ; h++){
			var a = ["","","","","","",""]
			temp.push(a);
		}
		for(var i = 0; i<fc; i++){
			for(var f = 0; f<fc; f++){
				posiactual = i + "" + f;
				if(parseInt(caramelos[i][f]) == j && temp[i][f] == ""){
					temp[i][f] = "2"
					var satis = [i,f]
					ressatisfactorio.push(satis)
					coordenadasasig = posicionesasignadas(posiactual);
				
					for(var g = 0 ; g < coordenadasasig.length ; g++)
					{
						if(temp[coordenadasasig[g][0]][coordenadasasig[g][1]] == "" ){
							temp[coordenadasasig[g][0]][coordenadasasig[g][1]] = "1"
							if(parseInt(caramelos[coordenadasasig[g][0]][coordenadasasig[g][1]]) == j){
									temp[coordenadasasig[g][0]][coordenadasasig[g][1]] = "2"
									ressatisfactorio.push(coordenadasasig[g])
									posiahija = coordenadasasig[g][0] + "" + coordenadasasig[g][1];	
									coordenadasasig = coordenadasasig.concat(posicionesasignadas(posiahija))
							}
						}
					}
					
					if(esSatisfactorio(ressatisfactorio)){
						puntacion +=100
						satisfactorio = satisfactorio.concat(ressatisfactorio)
					}
					ressatisfactorio = []
				}else{
					if(temp[i][f] == ""){
						temp[i][f] = "1"
					}
				}
			}
		}
	}
	return satisfactorio;
}



function orquestaTablero(){
	setTimeout(function(){
		if(ini){
			var mat  = evaluarMatriz();
			setTimeout(function(){
				for(var f = 0; f<12; f++){
					togglePos(mat)
				}
			}, 500);
		
			setTimeout(function(){
			actualizarTablero(mat)
			desplazarMatriz()
			poblarCaramelos()
			actualizarTab()
			}, 2000);
			orquestaTablero()
			$("#score-text").text(puntacion)
		}			
	}, 2000);
}

function togglePos(mat){
	for(var f = 0; f< mat.length; f++){
		$("#F"+mat[f][0]+"C"+mat[f][1]).toggle( "fade",  100 );
	}
}

function actualizarTablero(mat){
	for(var f = 0; f< mat.length; f++){
		caramelos[mat[f][0]][+mat[f][1]] = ""
	}
}


function desplazarMatriz(){
	var posiactual = ""
	for(var g = 6; g >=0 ; g--){
		var f = 6
			posiactual = f + "" + g
			var desplazo = ""
			desplazo = buscarDesplazamiento(f,g,posiactual);
	}
}

function buscarDesplazamiento(f, g, posiactual){
	var resultf = false
		var validar = false
		switch(f){
			case 0:
				if(caramelos[f][g] != ""){
					if(caramelos[f+1][g] == ""){
						validar = true
					}else{							
						resultf = true
					}
				}else{
					resultf = true
				}
				break
			case 6:
				validar = true
				break
			default:
				validar = true
				break
		}
		
		if(validar){
			if((caramelos[f][g] == "") || (caramelos[f][g] != "" && f == 6)){
				f -=1
			}else if(caramelos[f][g] != ""){
				if(caramelos[f+1][g] == ""){
					caramelos[f+1][g] = caramelos[f][g]
					caramelos[f][g] = ""
					f = parseInt(posiactual.substring(0, 1))				
				}else{
					f -=1
				}
			}		
		}
			
	if(resultf){
		return resultf
	}else{
		buscarDesplazamiento(f,g,posiactual)
	}
}

function actualizarTab(){
	for(var f = 0; f< caramelos.length; f++){
		for(var g = 0; g< caramelos[0].length; g++){
			var cimg = document.createElement("img");
				cimg.setAttribute("src", "image/"+caramelos[f][g]+".png");
				cimg.setAttribute("class", "elemento");
				$("#F"+f+"C"+g).find("img").replaceWith(cimg)
				$("F"+f+"C"+g).slideDown(1500)
		}
	}
}

function presentarResultado(){
		var options = {};
		$( "#effect" ).toggle()
		options = { percent: 0 };
		$(".panel-score")
		.animate(
			{width: 1000}
			,
			{ 
				step: function(){						
					$(".panel-tablero").effect("size", options, 1);
					$(".time").effect("size", options, 1);
				},
				queue: false,
				duration: 1000,
			
			},
		) 
		.delay(1000)
		.animate(
			{width: 2000}
			,0, function(){
				$(".panel-tablero").toggle()
				 $(".time").toggle()
			
			}
		)
		fin = true
}


function esSatisfactorio(ressatisfactorio){	
	var tempevalua = [{posicion : "", cantidad: 0}]
	for(var g = 0 ; g < ressatisfactorio.length ; g++)
	{
		for(var f = 0 ; f < ressatisfactorio[0].length ; f++)
		{
			var valor=""
			switch(f){
				case 0: 
					valor = "F"
					break
				case 1:
					valor = "C"
					break
			}
			valor = valor + ressatisfactorio[g][f]
			var index = tempevalua.findIndex(posicion => posicion.posicion === valor)
			if(index != -1){
				tempevalua[index].cantidad += 1
			}else{
				var temp = {posicion : valor, cantidad: 1}
				tempevalua.push(temp)				
			}
		}	
	}
	
	for(var f = 0 ; f < tempevalua.length ; f++)
	{
		if(tempevalua[f].cantidad >= 3){
			return true
		}
	}
	return false
}


function posicionesasignadas(posiactual){
	coordenadas = [];
	if(esEsquina(posiactual)){
		coodenadasEsquina(posiactual)
	}else if(esLateral(posiactual)){
		coordenadasLateral(posiactual)
	}else{
		coordenadasNormal(posiactual)
	}
	return coordenadas;
}

function esEsquina(posiactual){
	switch(posiactual){
		case "00" : return true
		case "06" : return true
		case "60" : return true
		case "66" : return true
		default : return false
	}
}

function coodenadasEsquina(posiactual){
	switch(posiactual){
		case "00" : 
				var coordenada1 = [0,1]
				var coordenada2 = [1,0]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)	
				break
		case "06" : 
				var coordenada1 = [0,5]
				var coordenada2 = [1,6]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				break
		case "60" : 
				var coordenada1 = [5,0]
				var coordenada2 = [6,1]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				break
		case "66" : 
				var coordenada1 = [5,6]
				var coordenada2 = [6,5]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				break
		default : return false
	}
}

function esLateral(posiactual){
	var x = posiactual.substring(0, 1)	
	switch(x){
		case "0" : return true
		case "6" : return true
	}
	var y = posiactual.substring(1, 2)	
	switch(y){
		case "0" : return true
		case "6" : return true
	}
}

function coordenadasLateral(posiactual){
	var x = posiactual.substring(0, 1)	
	var y = posiactual.substring(1, 2)	
	var revisary = true
	switch(x){
		case "0" : 
				var coordenada1 = [0,parseInt(y)+1]
				var coordenada2 = [0,parseInt(y)-1]
				var coordenada3 = [1,parseInt(y)]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				coordenadas.push(coordenada3)
				revisary = false
				break
		case "6" : 
				var coordenada1 = [6,parseInt(y)+1]
				var coordenada2 = [6,parseInt(y)-1]
				var coordenada3 = [5,parseInt(y)]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				coordenadas.push(coordenada3)
				revisary = false
				break
	}
	if(revisary){
		switch(y){
		case "0" : 			
				var coordenada1 = [parseInt(x)+1,0]
				var coordenada2 = [parseInt(x)-1,1]
				var coordenada3 = [parseInt(x),1]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				coordenadas.push(coordenada3)
				break
		case "6" :
				var coordenada1 = [parseInt(x)+1,6]
				var coordenada2 = [parseInt(x)-1,5]
				var coordenada3 = [parseInt(x),5]
				coordenadas.push(coordenada1)
				coordenadas.push(coordenada2)
				coordenadas.push(coordenada3)
				break

		}
	}	
}

function coordenadasNormal(posiactual){
	var x = posiactual.substring(0, 1)	
	var y = posiactual.substring(1, 2)	

	var coordenada1 = [parseInt(x)+1,parseInt(y)]
	var coordenada2 = [parseInt(x)-1,parseInt(y)]
	var coordenada3 = [parseInt(x),parseInt(y)+1]
	var coordenada4 = [parseInt(x),parseInt(y)-1]

	coordenadas.push(coordenada1)
	coordenadas.push(coordenada2)
	coordenadas.push(coordenada3)
	coordenadas.push(coordenada4)
}
