"use strict";

var ONE_DAY = 86400000;

function drawChart(csv)
{
		
		//parse the csv
		var csv = csv.split("\n");
		for(var i = 0; i < csv.length; i++)
		{
				if(!csv[i].match(/^\d{1,2}\/\d{1,2}\/\d{4}\,[0-9\.]+$/))
				{
						csv.splice(i, 1);
						i--;
				}
		}

		//populate daily
		var d_daily = [];
		for(var i = 0; i < csv.length; i++)
		{
				var entry = csv[i].split(',');
				
				var thisDate = Date.parse(entry[0]);
				var thisCount = parseInt(entry[1]);

				if(d_daily.length > 0)
				{
						var lastIndex = d_daily.length - 1;
						var currDate = d_daily[lastIndex][0];
						var currentAggregate = d_daily[lastIndex][1];

						if(thisDate == currDate) d_daily[lastIndex][1] += thisCount;
						else d_daily.push([thisDate, thisCount]);

				}

				else d_daily.push([thisDate, thisCount]);

		}
		
		//populate weekly

		//populate monthly



		//chart daily
		var data = { labels: [], datasets: [] };

		for(var i = 0; i < d_daily.length; i++) data.labels.push('');
		data.datasets.push({
				label: "Daily",
				bezierCurve : false,
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
		});
		for(var i = 0; i < d_daily.length; i++) data.datasets[0].data.push(d_daily[i][1]);

		//chart weekly

		//chart monthly

		//render

		var ctx = document.getElementById("chart").getContext("2d");
		var chart = new Chart(ctx).Line(data);
		
}




$(document).ready(function(){
		
		$.get('data/generateRandomCSVData.php', drawChart);
		
});
