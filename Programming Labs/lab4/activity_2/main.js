// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of cereal
    updateChart(category);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        cerealName: row['Cereal Name'],
        manufacturer: row['Manufacturer'],
        sugar: +row['Sugars']
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = { t: 60, r: 20, b: 80, l: 60 };

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Variable for the spacing of bar charts
var barBand;
var barWidth;

// scales
// var sugarScale; // y axis
// var xBandScale; // x axis
var xScale = d3.scaleLinear().domain([0, 20]).range([0, chartWidth]);
var yScale = d3.scaleLinear().domain([15, 0]).range([0, chartHeight]);

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', `translate(${padding.l}, ${padding.t})`);

var data;

d3.csv('cereals.csv', dataPreprocessor).then(function (dataset) {
    // Create global variables here and intialize the chart
    data = dataset;

    // Compute the spacing for bar bands based on number of cereals
    barBand = chartWidth / data.length;
    barWidth = 0.7 * barBand;

    // **** Your JavaScript code goes here ****

    // creating title of chart
    svg.append('text')
    .attr('class', 'title')
    .text('Sugars in Cereals')
    .attr('transform', 'translate(230, 30)');

    // creating y axis label
    svg.append('text')
    .attr('class', 'y-axis-label')
    .text('sugars (g)')
    .attr('transform', 'translate(30, 200) rotate(-90)');

    // Add axes to chart
    addAxes();
    // Update the chart for All cereals to initialize
    updateChart('All');
});

function addAxes() {
    // **** Draw the axes here ****
    var yAxis = d3.axisLeft(yScale);
    chartG.append('g').call(yAxis);

}

function updateChart(manufacturer) {
    //  Create a filtered array of cereals based on the manufacturer
    var cereals;
    switch(manufacturer) {
        case "All":
            cereals = data.filter(d => d.manufacturer !== manufacturer);
            break;
        case "General Mills":
            cereals = data.filter(d => d.manufacturer === 'General Mills');
            break;
        case "Quaker Oats":
            cereals = data.filter(d => d.manufacturer === 'Quaker Oats');
            break;
        case "Kelloggs":
            cereals = data.filter(d => d.manufacturer === 'Kelloggs');
            break;
        case "Nabisco":
            cereals = data.filter(d => d.manufacturer === 'Nabisco');
            break;
        case "Ralston Purina":
            cereals = data.filter(d => d.manufacturer === 'Ralston Purina');
            break;
        case "Post":
            cereals = data.filter(d => d.manufacturer === 'Post');
            break;
        default:
            break;
    }

    // **** Draw and Update your chart here ****
    // console.log(cereals);

    var bars = chartG.selectAll('.bar')
    .remove()
    .exit()
    .data(cereals);

    bars = chartG.selectAll('text')
    .remove()
    .exit()
    .data(cereals);

    var barsEnter = bars.enter()
    .append('g')
    .attr('class', 'g-bars')
    .attr('transform', 'translate(5)')

    barsEnter.merge(bars);

    barsEnter.append('rect')
    .attr('class', 'bar')
    .attr('x', function (d, i) {
        return barBand * i;
    })
    .attr('y', function (d, i) {
        return yScale(d.sugar);
    })
    .attr('width', barWidth)
    .attr('height', function (d) {
        return chartHeight - yScale(d.sugar)
    });

    // texts that show cereal name for each cereal
    barsEnter.append('text')
    .attr('class', 'bar-texts')
    .attr("transform", function(d, i){
        var x = barBand * (i + 0.5);
        var y = 200;
        return "translate(" + [x, y] + "),rotate(-45)";
    })
    .text(function (d) {
        return d.cerealName;
    });

    // texts that show number that displays exact sugar amount for each cereal
    barsEnter.append('text')
    .attr('class', 'number-bar-texts')
    .attr("x", function (d, i) {
        return barBand * i;
    })
    .attr("y", function (d) {
        return yScale(d.sugar + 0.25);
    })
    .text(function (d) {
        return d.sugar;
    })


}

// Remember code outside of the data callback function will run before the data loads