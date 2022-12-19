// **** Your JavaScript code goes here ****
d3.csv('NetflixOriginals.csv').then(function(data) {

    //creating rows
    var tr = d3.select("#main").select("table").select("tbody").selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // creating each data cell for each row
    tr.append('td').text(function (d, i) {
        return d.Title;
    });

    tr.append('td').text(function (d, i) {
        return d['IMDB Score'];
    });

    tr.append('td').text(function (d, i) {
        return (d["Premiere"]).slice((d["Premiere"]).length - 4);
    });

    var scoresArray = [];
    data.forEach(movie => {
        scoresArray.push(parseInt(movie["IMDB Score"]));
    });

    var p = d3.select("#netflix").selectAll('p')
        .data(data)
        .enter()
        .append('p')
        .text(function (d, i) {
            var title = d.Title;
            var score = d["IMDB Score"];
            var year = d.Premiere;
            return title + " premiered on " + year + ", receiving an IMDB Score of: " + score;
        })
        .style('color', function (d) {
            return d["IMDB Score"] == Math.max(...scoresArray) ? 'red' : 'black';
        });
});