export function shootingsByYear() {

// set the dimensions and margins of the graph
var padding = { top: 60, right: 20, bottom: 80, left: 100 };
var chartWidth = 1000 - padding.left - padding.right;
var chartHeight = 600 - padding.top - padding.bottom;

var elemDiv = document.createElement('div');
document.body.appendChild(elemDiv);
elemDiv.setAttribute('id', 'main');

// append the svg object to the body of the page
var svg = d3.select("#main")
    .append("svg")
    .attr("width", chartWidth + padding.left + padding.right)
    .attr("height", chartHeight + padding.top + padding.bottom)
    .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
    }))
    .append("g")
    .attr("transform",
        "translate(" + padding.left + "," + padding.top + ")");

var barBand;
var barWidth;

// Parse the Data
d3.csv("MassShootingsDatabase_1982_2022.csv").then(function (data) {
    barBand = chartWidth / data.length;
    barWidth = 0.7 * barBand;


    // creating title of chart
    svg.append('text')
        .attr('class', 'title')
        .text('Mass Shootings by Year')
        .attr('transform', 'translate(310, -10)');

    // creating x axis label
    svg.append('text')
        .attr('class', 'x-axis-label')
        .text('Years')
        .attr('transform', 'translate(370, 500)');

    // creating y axis label
    svg.append('text')
        .attr('class', 'y-axis-label')
        .text('Total Victims')
        .attr('transform', 'translate(-35, 250) rotate(-90)');

    // creating legend
    svg.append('g').attr('id', 'Fatalities').append('text').text('Fatalities:');
    d3.select("#Fatalities").append('rect')
        .attr('class', 'legend-rects')
        .attr('x', '55')
        .attr('y', '-7')
        .attr('width', 8)
        .attr('height', 8)
        .style('fill', '#ff0000');

    svg.append('g').attr('id', 'Injuries').append('text').text('Injuries:');
    d3.select("#Injuries").append('rect')
        .attr('class', 'legend-rects')
        .attr('x', '55')
        .attr('y', '-6.5')
        .attr('width', 8)
        .attr('height', 8)
        .style('fill', '#F6BDC0')

    // creating texts for data population on click
    svg.append('g').attr('class', 'populate-text').append('text').text('Case:').attr('transform', 'translate(0, 0)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Date:').attr('transform', 'translate(0, 10)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Location:').attr('transform', 'translate(0, 20)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Fatalities:').attr('transform', 'translate(0, 30)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Injuries:').attr('transform', 'translate(0, 40)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Total Victims:').attr('transform', 'translate(0, 50)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Location Type:').attr('transform', 'translate(0, 60)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Age:').attr('transform', 'translate(0, 70)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Race:').attr('transform', 'translate(0, 80)');
    svg.append('g').attr('class', 'populate-text').append('text').text('Gender:').attr('transform', 'translate(0, 90)');

    // creating texts for individual attribute texts
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(33, 0)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(32, 10)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(52, 20)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(55, 30)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(45, 40)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(70, 50)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(80, 60)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(28, 70)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(30, 80)');
    svg.append('g').attr('class', 'attr-text').append('text').attr('transform', 'translate(45, 90)');

    // Add Y axis
    var yScale = d3.scaleLinear()
        .domain([105, 0])
        .range([0, chartHeight]);
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // two different colors for fatalities vs injuries
    var color = d3.scaleOrdinal()
        .domain(["Fatalities", "Injuries"])
        .range(['#ff0000', '#ff7b7b',])

    // gets fatalities and injuries columns
    var keys = data.columns.slice(4, 6);
    var stackKeys = d3.stack().keys(keys);
    var stackedData = stackKeys(data);

    // Show the bars
    var bars = svg.selectAll(".bar")
        .data(stackedData)
        .enter()
        .append("g")

    bars.attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        // creating stacked bars
        .data(function (d) { return d; })
        .enter().append('g').attr('class', 'g-bars')
        .append("rect")
        .attr('class', 'bar')
        .attr("x", function (d, i) {
            return barBand * i;
        })
        .attr("y", function (d) { return yScale(d[1]); })
        .attr("width", barWidth)
        .attr("height", function (d) {
            if (isNaN(d[0]) || isNaN(d[1])) {
                return 0;
            }
            return (yScale(d[0]) - yScale(d[1]));
        })
        .on('click', function(d) {
            displayData(d);
        })
        // .on('mouseover', function (d) {
        //     displayData(d);
        // })
        // .on('mouseout', function(d) {
        //     clearText();
        // })

    bars.selectAll('.g-bars').append('text')
        .attr('class', 'x-axis-texts')
        .attr("transform", function (d, i) {
            var x = barBand * (i + 0.5);
            var y = 462;
            return "translate(" + [x, y] + "),rotate(-60)";
        })
        .text(function (d) {
            return d.data.Year;
        });

    // displays total victim count
    bars.selectAll('.g-bars').append('text')
        .attr('class', 'total-victims-texts')
        .attr("transform", function (d, i) {
            var x = (barBand * i) + (barWidth / 2);
            var y = yScale(d.data["Total Victims"]);
            if (isNaN(d.data["Total Victims"])) {
                y = 0;
            }
            return "translate(" + [x, y] + ")";
        })
        .text(function (d) {
            return d.data["Total Victims"];
        });

    function displayData(item) {
        clearText();
        d3.select(".attr-text").append('text').attr('transform', 'translate(33, 0)').text(function (d) {
            return item.data.Case;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(32, 10)').text(function (d) {
            return item.data.Date;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(52, 20)').text(function (d) {
            return item.data.Location;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(55, 30)').text(function (d) {
            return item.data.Fatalities;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(45, 40)').text(function (d) {
            return item.data.Injuries;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(70, 50)').text(function (d) {
            return item.data['Total Victims'];
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(80, 60)').text(function (d) {
            return item.data['Location Type'];
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(28, 70)').text(function (d) {
            return item.data.Age;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(30, 80)').text(function (d) {
            return item.data.Race;
        });
        d3.select(".attr-text").append('text').attr('transform', 'translate(45, 90)').text(function (d) {
            return item.data.Gender;
        });
    }

    function clearText() {
        d3.selectAll('.attr-text').selectAll('text').remove();
    }


})
}