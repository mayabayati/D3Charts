function  CreateBinaryChart_Doughnut(values, element_id, color, pie_width, pie_height) {
	function render() {
		var dataset = [{
		  color: color,
		  value: values[0]
			}, {
		  color: "transparent",
		  value: values[1]
		}];
		
		var $container = $(element_id),
			t = 2 * Math.PI,
			width = 150,
			height = 150,
			radius = Math.min(width,height)/2;
			
		var pie = d3.layout.pie()
		  .sort(null).value(function(d) {
		    return d.value;
		  });

		var arc1 = d3.svg.arc()
		  .innerRadius(radius - radius*0.12)
		  .outerRadius(radius - radius*0.087);

		var arc = d3.svg.arc()
		  .innerRadius(radius - radius*0.133)
		  .outerRadius(radius - radius*0.067);

		var svg = d3.select(element_id).append("svg")
			.attr("width", '100%')
			.attr("height", '100%')
			.attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
			.attr('preserveAspectRatio','xMinYMin')
			.append("g")
			.attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");	

		var path = svg.selectAll(".background")
		  .data(pie([{
		    color: "gray",
		    value: 1
		  }]))
		  .enter().append("path")
		  .attr("class", "background")
		  .attr("fill", function(d, i) {
		    return d.data.color;
		  })
		  .attr("d", arc1);

		var path = svg.selectAll(".foreground")
		  .data(pie(dataset))
		  .enter().append("path")
		  .attr("class", "foreground")
		  .attr("stroke-linejoin", "round")
		  .attr("stroke-linecap", "round")
		  .attr("stroke-width", "10")
		  .attr("stroke","none")
		  .attr("stroke", function(d, i) {
		    return d.data.color;
		  })
		  .attr("fill", "none")
		  .attr("d", arc);
		  
		svg.append("text")
		  .text(function() { return values[0] + '%'; })
		  .attr("class", "units-label")
		  .attr("x", radius/10 - radius*0.067)
		  .attr("text-anchor", "middle")
		  .attr("font-size", "20px")
		  .style("fill", color)
		  .attr("y", radius/10);
	}
  render();
}