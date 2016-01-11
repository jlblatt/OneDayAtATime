"use strict";

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

		if(csv.length < 2) return;

		for(var i = 0; i < csv.length; i++)
		{
				var entry = csv[i].split(',');
				
				var thisDate = Date.parse(entry[0]);
				var thisVal = parseInt(entry[1]);

				csv[i] = { x: thisDate, y: thisVal };
		}

		csv.sort(function(a, b)
		{
				return a.x > b.x;
		});

		//populate daily
		var dd = { name: 'daily', data: [] };
		var sd = csv[0].x;
		var ed = csv[csv.length - 1].x;

		for(var d = sd; d < ed; d+=86400000)
		{
				var thisVal = 0;

				while(d >= csv[0].x)
				{
						thisVal += csv[0].y;
						csv.shift();
				}

				dd.data.push({ x: d, y: thisVal });
		}
		
		//populate weekly
		var dw = { name: 'weekly', data: [] };
		for(var i = 0; i < dd.data.length; i++)
		{
				if(i % 7 == 0 && i > 0)
				{
						var agg = 0;

						for(var j = 0; j < 7; j++)
						{
								agg += dd.data[i - j].y;
						}

						dw.data.push({ x: dd.data[i].x, y: agg / 7 });
				}
		}

		//populate monthly
		var dm = { name: 'monthly', data: [] };
		for(var i = 0; i < dd.data.length; i++)
		{
				if(i % 30 == 0 && i > 0)
				{
						var agg = 0;

						for(var j = 0; j < 30; j++)
						{
								agg += dd.data[i - j].y;
						}

						dm.data.push({ x: dd.data[i].x, y: agg / 30 });
				}
		}

		var chart = new Chartist.Line('.ct-chart', {
				series: [dd, dw, dm]
		}, {
				axisX: {
						type: Chartist.AutoScaleAxis,
						showLabel: false
				},
				series: {
						'daily': {
								showLine: false
						},
						'weekly': {

						},
						'monthly': {

						}
				}
		});
		
}




$(document).ready(function(){
		
		$.get('data/generateRandomCSVData.php', drawChart);
		
});
