function CreateStackBarChart_Horizontal(stackbar_data, element_id){
	var colors = ["#0076cb" ,"	#76cb00" , "#fa9100"];

	function render(){
		var data = stackbar_data;
		var labelWidth = 55;
		var labelHeight = 40
		var gutterWidth = 25;
		var chartContainer = element_id;

		var margins = {
		    left: labelWidth,
		    bottom: labelHeight,
		    right: gutterWidth
		};
		    
		var width = 550;
		var height = 180;

		var series = data.map(function (d) {
		        return d.source;
		    });

		var dataset = data.map(function (d) {
		        return d.data.map(function (o, i) {
		            // Structure it so that your numeric axis (the stacked amount) is y
		            return {
		                y: o.count,
		                x: o.target.name
		            };
		        });
		    });

		d3.layout.stack()(dataset);

		var dataset = dataset.map(function (group) {
		    return group.map(function (d) {
		        // Invert the x and y values, and y0 becomes x0
		        return {
		            x: d.y,
		            y: d.x,
		            x0: d.y0
		        };
		    });
		});

		var svg = d3.select(chartContainer)
		        .append('svg')
		        .attr('width', '100%')
		        .attr('height', '100%')
		        .append('g')
		        .attr('transform', 'translate(' + margins.left + ', 0)');

		var units = dataset[0].map(function (d) {
		        return d.y;
		    });

		var yScale = d3.scale.ordinal()
		        .domain(units)
		        .rangeRoundBands([0, height], .1);

		var yAxis = d3.svg.axis()
		        .scale(yScale)
		        .orient('left');

		var xScale = d3.scale.linear()
		        .domain([0, 100])
		        .range([0, width]);

		var xAxis = d3.svg.axis()
		        .scale(xScale)
		        .orient('bottom'); 

		var groups = svg.selectAll('g')
		        .data(dataset)
		        .enter()
		        .append('g')
		        .style('fill', function (d, i) {
		        return colors[i];
		    });

		groups.selectAll('rect')
		        .data(function (d) {return d;})
		        .enter()
		        .append('rect')
		        .attr('x', function (d) {
		            return xScale(d.x0);
		        })
		        .attr('y', function (d, i) {return yScale(d.y);})
		        .attr('height', function (d) {return yScale.rangeBand();})
		        .attr('width', function (d) {return xScale(d.x);})
		        .on('mouseover', function (d) {
		            var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
		            var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;
		            d3.select('#tooltip')
		                .style('left', xPos + 'px')
		                .style('top', yPos + 'px')
		                .select('#value')
		                .text(d.x);
		        });

		svg.append('g')
		    .attr('class', 'bc-x-axis bc-axis')
		    .attr('transform', 'translate(0,' + height + ')')
		    .call(xAxis);

		svg.append('g')
		    .attr('class', 'bc-y-axis bc-axis')
		    .call(yAxis);


	     var text = groups.selectAll("text")
	        .data(function (d) { return d; })
			.enter()
			.append("text")
			.attr("class","text")
			.style("stroke", "white")
			.attr("x", function (d) { return xScale(d.x)/2 + xScale(d.x0);})
			.attr("y", function (d, i) {return yScale(d.y)+45;})
			.attr("text-anchor", "middle")
			.attr("font-size", "17px")
			.attr("font-family", "Arial")
			.attr('fill', "white")
		 	.text(function(d) { return d.x +'%';});}
	
	render();
}
