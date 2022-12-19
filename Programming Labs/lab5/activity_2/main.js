var width = 500;
var height = 500;

d3.csv("cereals.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].Calories = Number(csv[i].Calories)
    csv[i].Fat = Number(csv[i].Fat);
    csv[i].Carb = Number(csv[i].Carb);
    csv[i].Fiber = Number(csv[i].Fiber);
    csv[i].Protein = Number(csv[i].Protein);
  }

  console.log(csv);

  // COMPLETE THESE FUNCTIONS TO SEE THE SCATTERPLOTS +++++++++++++++
  var fatExtent = d3.extent(csv, function (row) {
    return row.Fat;
  });
  var carbExtent = d3.extent(csv, function (row) {
    return row.Carb;
  });
  var fiberExtent = d3.extent(csv, function (row) {
    return row.Fiber;
  });
  var proteinExtent = d3.extent(csv, function (row) {
    return row.Protein;
  });

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Axis setup
  var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

  var xScale2 = d3.scaleLinear().domain(fiberExtent).range([50, 470]);
  var yScale2 = d3.scaleLinear().domain(proteinExtent).range([470, 30]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var xAxis2 = d3.axisBottom().scale(xScale2);
  var yAxis2 = d3.axisLeft().scale(yScale2);

  //Legend
  //Hint: Append circles to each selection to represent the calorie level
  d3.select("#LowCalorie").append('circle')
    .attr('class', 'legend-circles')
    .attr('cx', '6.5')
    .attr('cy', '6.5')
    .attr('r', 5)
    .style('fill', '#F6BDC0');

  d3.select("#MedCalorie").append('circle')
    .attr('class', 'legend-circles')
    .attr('cx', '6.5')
    .attr('cy', '6.5')
    .attr('r', 5)
    .style('fill', '#F07470');

  d3.select("#HighCalorie").append('circle')
    .attr('class', 'legend-circles')
    .attr('cx', '6.5')
    .attr('cy', '6.5')
    .attr('r', 5)
    .style('fill', '#DC1C13');

  // populate data


  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

  var chart2 = d3
    .select("#chart2")
    .append("svg:svg")
    .attr("id", "svg2")
    .attr("width", width)
    .attr("height", height);

  //Labels for Charts
  var title1 = d3
    .select("#svg1")
    .append("text")
    .attr("x", width / 2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fat vs Carb");

  var title2 = d3
    .select("#svg2")
    .append("text")
    .attr("x", width / 2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fiber vs Protein");

  //Labels for Axes
  var fatLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fat");

  var carbLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", -width / 2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Carb");

  var fiberLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fiber");

  var proteinLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", -width / 2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Protein");

  /******************************************

    Create Circles for Each Scatterplot

   ******************************************/

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis2)
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis2)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  // creating group to append circles for each cereal on left scatterplot
  var circlesOne = chart1.append('g')
    .attr('class', 'scatterplot-one')
    .selectAll('circle')
    .data(csv)
    .enter()
    .append('g')
    .attr('class', 'g-circles-one');

  circlesOne.append('circle')
    .attr('class', 'circles-one')
    .attr('cx', function (d) {
      return xScale(d.Fat);
    })
    .attr('cy', function (d) {
      return yScale(d.Carb);
    })
    .attr('r', 5)
    .attr("class", function (d) {
      if (d.Calories <= 100) {
        return 'low-cal';
      } else if (d.Calories <= 130 && d.Calories > 100) {
        return 'med-cal'
      } else {
        return 'high-cal'
      }
    });


  // creating group to append circles for each cereal on right scatterplot
  var circlesTwo = chart2.append('g')
    .attr('class', 'scatterplot-two')
    .selectAll('circle')
    .data(csv)
    .enter()
    .append('g')
    .attr('class', 'g-circles-two');

  circlesTwo.append('circle')
    .attr('class', 'circles-two')
    .attr('cx', function (d) {
      return xScale2(d.Fiber);
    })
    .attr('cy', function (d) {
      return yScale2(d.Protein);
    })
    .attr('r', 5)
    .attr("class", function (d) {
      if (d.Calories <= 100) {
        return 'low-cal';
      } else if (d.Calories <= 130 && d.Calories > 100) {
        return 'med-cal'
      } else {
        return 'high-cal'
      }
    });

  // --------- brushing and linking for chart 1 ----------

  var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start", brushstart)
    .on("brush", highlightBrushedCircles)
    .on("end", displayValues);

  chart1.append('g')
    .attr('id', 'brush')
    .call(brush);

  var brush2 = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start", brushstart2)
    .on("brush", highlightBrushedCircles2)
    .on("end", displayValues2);

  chart2.append('g')
    .attr('id', 'brush2')
    .call(brush2);

  // clear any old brushes and setup the new brush
  function brushstart() {
    d3.select("#chart1").selectAll("circle").attr("class", "non_brushed");
    d3.select("#brush2").call(brush2.move, null); //using `.call()` to call the brush function on each elements
  }

  // the actual brushing occurs here, hide any circles that that are outside the bounds of the brush's bounds
  function highlightBrushedCircles() {

    // Get the extent or bounding box of the brush event, this is a 2x2 array
    var e = d3.event.selection;
    if (e) {
      //Revert circles to initial style
      chart1.selectAll('circle').attr("class", "non_brushed");
      chart2.selectAll('circle').attr("class", "non_brushed");

      //Select the instance of brush selection (access coordinates of the selection area)
      var coords = d3.brushSelection(this);

      var selected = chart1.selectAll('circle').filter(function (d) {
        var x0 = coords[0][0]
        var x1 = coords[1][0]
        var y0 = coords[0][1]
        var y1 = coords[1][1]
        var cx = xScale(d.Fat)
        var cy = yScale(d.Carb)
        //console.log(x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
        return (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
      })
        .attr("class", function (d) { // Use the function to assign different classes based on calorie values
          if (d.Calories <= 100) {
            return 'low-cal';
          } else if (d.Calories <= 130 && d.Calories > 100) {
            return 'med-cal'
          } else {
            return 'high-cal'
          }
        })

      var selectedOther = chart2.selectAll('circle').filter(function (d) {
        var x0 = coords[0][0]
        var x1 = coords[1][0]
        var y0 = coords[0][1]
        var y1 = coords[1][1]
        var cx = xScale(d.Fat)
        var cy = yScale(d.Carb)
        //console.log(x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
        return (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
      })

        .attr("class", function (d) { // Use the function to assign different classes based on calorie values
          if (d.Calories <= 100) {
            return 'low-cal';
          } else if (d.Calories <= 130 && d.Calories > 100) {
            return 'med-cal'
          } else {
            return 'high-cal'
          }
        })
    }
  }

  // clean up the brush if its been cleared by the user, bring back any hidden circles
  function displayValues() {
    // If there is no longer an extent or bounding box then the brush has been removed
    if (!d3.event.selection) {
      // Bring back all non brushed circle elements to original color gradient
      d3.selectAll(".non_brushed").attr("class", function (d) { // Use the function to assign different classes based on calorie values
        if (d.Calories <= 100) {
          return 'low-cal';
        } else if (d.Calories <= 130 && d.Calories > 100) {
          return 'med-cal'
        } else {
          return 'high-cal'
        }
      })

    }
  }


  // -------- brushing and linking for chart 2 -----------

  // clear any old brushes and setup the new brush
  function brushstart2() {
    d3.select("#chart2").selectAll("circle").attr("class", "non_brushed");
    d3.select("#brush").call(brush.move, null); //using `.call()` to call the brush function on each elements
  }

  // the actual brushing occurs here, hide any circles that that are outside the bounds of the brush's bounds
  function highlightBrushedCircles2() {

    // Get the extent or bounding box of the brush event, this is a 2x2 array
    var e = d3.event.selection;
    if (e) {
      //Revert circles to initial style
      chart1.selectAll('circle').attr("class", "non_brushed");
      chart2.selectAll('circle').attr("class", "non_brushed");

      //Select the instance of brush selection (access coordinates of the selection area)
      var coords = d3.brushSelection(this);

      var selected2 = chart2.selectAll('circle').filter(function (d) {
        var x0 = coords[0][0]
        var x1 = coords[1][0]
        var y0 = coords[0][1]
        var y1 = coords[1][1]
        var cx = xScale2(d.Fiber)
        var cy = yScale2(d.Protein)
        //console.log(x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
        return (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
      })
        .attr("class", function (d) { // Use the function to assign different classes based on calorie values
          if (d.Calories <= 100) {
            return 'low-cal';
          } else if (d.Calories <= 130 && d.Calories > 100) {
            return 'med-cal'
          } else {
            return 'high-cal'
          }
        })

      var selected2Other = chart1.selectAll('circle').filter(function (d) {
        var x0 = coords[0][0]
        var x1 = coords[1][0]
        var y0 = coords[0][1]
        var y1 = coords[1][1]
        var cx = xScale2(d.Fiber)
        var cy = yScale2(d.Protein)
        //console.log(x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
        return (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1);
      })

        .attr("class", function (d) { // Use the function to assign different classes based on calorie values
          if (d.Calories <= 100) {
            return 'low-cal';
          } else if (d.Calories <= 130 && d.Calories > 100) {
            return 'med-cal'
          } else {
            return 'high-cal'
          }
        })
    }
  }

  // clean up the brush if its been cleared by the user, bring back any hidden circles
  function displayValues2() {
    // If there is no longer an extent or bounding box then the brush has been removed
    if (!d3.event.selection) {
      // Bring back all non brushed circle elements to original color gradient
      d3.selectAll(".non_brushed").attr("class", function (d) { // Use the function to assign different classes based on calorie values
        if (d.Calories <= 100) {
          return 'low-cal';
        } else if (d.Calories <= 130 && d.Calories > 100) {
          return 'med-cal'
        } else {
          return 'high-cal'
        }
      })

    }

  }

});