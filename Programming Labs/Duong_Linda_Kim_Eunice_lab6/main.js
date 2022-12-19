import { shootingsByYear } from "./mass_shootings_year.js";
import { shootingsByAge } from "./mass_shootings_age.js";
import { shootingsByState } from "./mass_shootings_state.js"

shootingsByYear();

// Create a select dropdown
const selectItems = ["Data by Year", "Data by Age", "Data by State"];

// adding select options/categories
d3.select("#selectButton")
    .selectAll('myOptions')
    .data(selectItems)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; })

// update chart when select is changed
d3.select("#selectButton").on("change", function (d) {
    var category = d3.select(this).property("value")
    updateChart(category)
})

function updateChart(category) {
    d3.select('#main').remove();
    if (category == "Data by Year") {
        return shootingsByYear();
    } else if (category == "Data by Age") {
        return shootingsByAge();
    } else if (category == "Data by State") {
        return shootingsByState();
    }
}


