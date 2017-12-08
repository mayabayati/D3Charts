function  main5catogories_doughnut(element_id) {
	function render() {
		var dataset = {
			  values: [22, 55,1,3, 19],
			};

		var width = 400,
		    height = 400,
		    radius = Math.min(width, height) / 2;

		var pie = d3.layout.pie()
		    .sort(null);

		var i = -1;
		var j = -1;

		var color = ["#0F46A7", "#003283", "#0076cb" ,"#fa9100" , "#008fd3"];

		var piedata = pie(dataset.values);

		var arc = d3.svg.arc()
		    .innerRadius(radius - 100)
		    .outerRadius(radius - 50);
			
		var svg = d3.select(element_id).append('svg')
			.attr("width", '100%')
			.attr("height", '100%')
			.attr('viewBox','0 0 '+ width +' '+ width)
			.attr('preserveAspectRatio','xMinYMin')
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var path = svg.selectAll("path")
		    .data(piedata)
			.enter().append("path")
			.attr('stroke', 'black') 
			.attr('stroke-width', '4')
		    .attr("fill", function() { ++i; return color[i]; })
		    .attr("d", arc);

		svg.selectAll("text").data(piedata)
		    .enter()
		    .append("text")
		    .attr("text-anchor", "middle")
		    .attr("x", function(d) {
		        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
		        d.cx = Math.cos(a) * (radius - 75);
		        return d.x = Math.cos(a) * (radius - 20);
		    })
		    .attr("y", function(d) {
		        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
		        d.cy = Math.sin(a) * (radius - 75);
		        return d.y = Math.sin(a) * (radius - 20);
		    })
		    .text(function(d) { return d.value + '%'; })
		    .attr("fill", function() { ++j; return color[j]; })
		    .attr("font-size", "30px")
		    .each(function(d) {
		        var bbox = this.getBBox();
		        d.sx = d.x - bbox.width/2 - 2;
		        d.ox = d.x + bbox.width/2 + 2;
		        d.sy = d.oy = d.y + 5;
		    });

		svg.append("defs").append("marker")
		    .attr("id", "circ")
		    .attr("markerWidth", 6)
		    .attr("markerHeight", 6)
		    .attr("refX", 3)
		    .attr("refY", 3)
		    .append("circle")
		    .attr("cx", 3)
		    .attr("cy", 3)
		    .style("fill", "white")
		    .style("stroke-width", 8)
		    .attr("r", 3);

		svg.selectAll("path.pointer").data(piedata).enter()
		    .append("path")
		    .attr("class", "pointer")
		    .style("fill", "none")
		    .style("stroke", "white")
		    .attr("marker-end", "url(#circ)")
		    .attr("d", function(d) {
		        if(d.cx > d.ox) {
		            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
		        } else {
		            return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
		        }
	        });
	       
    }
     render();
}
