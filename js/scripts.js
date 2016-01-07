"use strict";

function drawChart(csv)
{
		
		//parse the csv
		var csv = csv.split("\n");
		while(csv[0] == "") csv.shift();
		while(csv[csv.length - 1] == "") csv.pop();
		
		var sd = Date.parse(csv[0].split(',')[0]);
		var ed = Date.parse(csv[csv.length - 1].split(',')[0]);
		
		var d_daily   = {}, 
    d_weekly  = {}, 
    d_monthly = {};
		
		for(var d = sd; d < ed; d+=86400000)
		{
				if(!(d in d_daily)) d_daily[d] = 0;
				
				while(csv.length > 0)
				{
						if(d >= Date.parse(csv[0].split(',')[0])) 
						{
								d_daily[d] += parseInt(csv[0].split(',')[1]);
								csv.shift();
						}
						
						else break;
				}
		}
		
		var data = { labels: [], datasets: [] };

		//daily
		for(var i in d_daily) data.labels.push('');
		data.datasets.push({
				label: "Daily",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
		});
		for(var i in d_daily) data.datasets[0].data.push(d_daily[i]);

		var ctx = document.getElementById("chart").getContext("2d");
		var chart = new Chart(ctx).Line(data);
		
}




$(document).ready(function(){
		
		$.get('data/generateRandomCSVData.php', drawChart);
		
});
