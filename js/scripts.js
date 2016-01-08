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
		var d_weekly = [];
		for(var i = 0; i < d_daily.length; i++)
		{
				if(i % 7 == 0 && i > 0)
				{
						var agg = 0;

						for(var j = 0; j < 7; j++)
						{
								agg += d_daily[i - j][1];
						}

						d_weekly.push([d_daily[i][0], agg / 7]);
				}
		}

		//populate monthly
		var d_monthly = [];
		for(var i = 0; i < d_daily.length; i++)
		{
				if(i % 30 == 0 && i > 0)
				{
						var agg = 0;

						for(var j = 0; j < 30; j++)
						{
								agg += d_daily[i - j][1];
						}

						d_monthly.push([d_daily[i][0], agg / 30]);
				}
		}

		//chart daily
		var daily_options = { bezierCurve : false };
		var daily_data = { labels: [], datasets: [] };

		for(var i = 0; i < d_daily.length; i++) daily_data.labels.push('');
		daily_data.datasets.push({
				label: "Daily",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
		});
		for(var i = 0; i < d_daily.length; i++) daily_data.datasets[0].data.push(d_daily[i][1]);

		var ctx_daily = document.getElementById("chart-daily").getContext("2d");
		var chart_daily = new Chart(ctx_daily).Line(daily_data, daily_options);

		//chart weekly
		var weekly_options = { bezierCurve : false };
		var weekly_data = { labels: [], datasets: [] };

		for(var i = 0; i < d_weekly.length; i++) weekly_data.labels.push('');
		weekly_data.datasets.push({
				label: "Weekly",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
		});
		for(var i = 0; i < d_weekly.length; i++) weekly_data.datasets[0].data.push(d_weekly[i][1]);

		var ctx_weekly = document.getElementById("chart-weekly").getContext("2d");
		var chart_weekly = new Chart(ctx_weekly).Line(weekly_data, weekly_options);

		//chart monthly
		var monthly_options = { bezierCurve : false };
		var monthly_data = { labels: [], datasets: [] };

		for(var i = 0; i < d_monthly.length; i++) monthly_data.labels.push('');
		monthly_data.datasets.push({
				label: "Monthly",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
		});
		for(var i = 0; i < d_monthly.length; i++) monthly_data.datasets[0].data.push(d_monthly[i][1]);

		var ctx_monthly = document.getElementById("chart-monthly").getContext("2d");
		var chart_monthly = new Chart(ctx_monthly).Line(monthly_data, monthly_options);
		
}




$(document).ready(function(){
		
		$.get('data/generateRandomCSVData.php', drawChart);
		
});
