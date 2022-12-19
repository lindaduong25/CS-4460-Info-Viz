// **** Your JavaScript code goes here ****

d3.csv('NetflixOriginals.csv').then(function (data) {

    var svg = d3.select('#main').select('svg');

    // Add circles
    svg.selectAll('circle')
        .data(data).enter()
        .append('circle')
        .attr('cx', function (d, i) {
            return scaleDate(d.Premiere);
        })
        .attr('cy', function (d, i) {
            return scaleIMDB(d['IMDB Score']);
        })
        .style('fill', function (d, i) {
            var score = d['IMDB Score'];
            if (score < 4) {
                return '#7b9ff2';
            } else if (score > 4 && score < 6) {
                return '#4259c3';
            } else {
                return '#03018c';
            }
        })
        .attr('r', 3.5)

    // creating g element with circle and text for each data case
    data.forEach(movie => {
        var group = svg.append('g')
        .attr('transform', function (d, i) {
            var x = scaleDate(movie.Premiere);
            var y = scaleIMDB(movie['IMDB Score']);
            return "translate(" + [x, y] + ")"
        });
        group.attr('class', 'group-container');
        group.append('circle');
        group.append('text')
        .text(movie.Title)
        .attr('class', 'circle-text');
    });

    // creating legend
    svg.append('text')
    .attr('class', 'legend-title')
    .text('Legend:')
    .attr('transform', 'translate(780, 150)');

    svg.append('circle')
    .attr('cx', -4)
    .attr('cy', -4)
    .attr('r', 7)
    .style('fill', '#7b9ff2')
    .attr('transform', 'translate(760, 180)');

    svg.append('circle')
    .attr('cx', -4)
    .attr('cy', -4)
    .attr('r', 7)
    .style('fill', '#4259c3')
    .attr('transform', 'translate(760, 210)');

    svg.append('circle')
    .attr('cx', -4)
    .attr('cy', -4)
    .attr('r', 7)
    .style('fill', '#03018c')
    .attr('transform', 'translate(760, 240)');

    svg.append('text')
    .attr('class', 'legend-text')
    .text('IMDB Score < 4')
    .attr('transform', 'translate(780, 180)');

    svg.append('text')
    .attr('class', 'legend-text')
    .text('4 < IMDB Score < 6')
    .attr('transform', 'translate(780, 210)');

    svg.append('text')
    .attr('class', 'legend-text')
    .text('6 < IMDB Score')
    .attr('transform', 'translate(780, 240)');


});



// **** Functions to call for scaled values ****

function scaleDate(date) {
    var d = new Date(date);
    return dateScale(d);
}

function scaleIMDB(imdb) {
    return imdbScale(imdb);
}

// **** Code for creating scales, axes and labels ****

var dateScale = d3.scaleTime()
    .domain([new Date(2015, 0, 1), new Date(2022, 0, 1)]).range([60, 700]);

var imdbScale = d3.scaleLinear()
    .domain([1, 10]).range([340, 20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(dateScale).ticks(d3.timeYear));

svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(360,390)')
    .text('Premiere Date');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(imdbScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(15,200) rotate(90)')
    .text('IMDB Ranking');

svg.append('text')
    .attr('class', 'title')
    .attr('transform', 'translate(360,30)')
    .text('Netflix Originals Rankings');