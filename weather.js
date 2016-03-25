$(document).ready(function(){

	var apiKey = '051d225f889787cb457e6eb4cb6a32f5';
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID=' + apiKey;

	$.getJSON(weatherURL, function(weatherData){
		var currTemp = weatherData.main.temp;
		var canvas = $('#current-temp');
		var context = canvas[0].getContext('2d');
		var currPerc = 0;
		var shadeColor;

		if(currTemp < 32){
			shadeColor = '#d4foff';
		}else if((currTemp >=32)&& (currTemp < 59)){
			shadeColor = '#129793';
		}else if((currTemp>=59)&&(currTemp<75)){
			shadeColor = '#7cfc00';
		}else if((currTemp>=75)&&(currTemp<90)){
			shadeColor = '#ff6600';
		}else{
			shadeColor = '#e317od';
		}

		function animate(current){
			context.fillStyle = '#ccc';
			context.beginPath();
			context.arc(155,75,65,0,2*Math.PI);
			context.closePath();
			context.fill();

			context.lineWidth = 10;
			context.strokeStyle = shadeColor;
			context.beginPath();
			context.arc(155,75,70,Math.PI*1.5, (Math.PI * 2 * current) + Math.PI *1.5 );
			context.stroke();

			context.font= '48px Myriad Pro';
			context.fillStyle = '#0000ff';
			context.textBaseLine = 'bottom';
			context.fillText(currTemp, 175-70,(85-70)*6);
			currPerc++;
			if(currPerc < currTemp){
				requestAnimationFrame(function(){
					animate(currPerc / 100);
				})
			}
		}
		animate();
	});
});


	// (currTemp/100)*Math.PI