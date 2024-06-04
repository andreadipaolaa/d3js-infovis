let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();
let heightScale = d3.scaleLinear();

const xDomain = [0, 1000];
const yDomain = [0, 1000];
xScale.domain(xDomain);
yScale.domain(yDomain);
heightScale.domain(yDomain);

let currentXHome = 10;
let xRange = 0;
let yRange = 0;
let currentHeight = 200;

function buildHome(data) {
    const homeWidth = parseFloat(xScale(data.homeWidth));
    const homeHeight = parseFloat(heightScale(data.homeHeight));
    const roofWidth = parseFloat(xScale(data.roofWidth));
    const roofHeight = parseFloat(heightScale(data.roofHeight));
    const y = parseFloat(yScale(currentHeight));

    let home = `${currentXHome},${y} ` +
               `${currentXHome + homeWidth / 2},${y} ` +
               `${currentXHome + homeWidth / 2},${y - homeHeight} ` +
               `${currentXHome - homeWidth / 2},${y - homeHeight} ` +
               `${currentXHome - homeWidth / 2},${y}`;

    let roof = `${currentXHome},${y - homeHeight} ` +
               `${currentXHome + roofWidth / 2},${y - homeHeight} ` +
               `${currentXHome},${y - homeHeight - roofHeight} ` +
               `${currentXHome - roofWidth / 2},${y - homeHeight}`;

    currentXHome += xRange + 10;

    return { home, roof };
}

function fillBoard(svgBoard, data) {
    let homes = svgBoard.selectAll(".home")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "house");

    let n = 0;
    homes.each(function(d) {
        if (n === 5) {
            currentXHome = 10 + (xRange / 2);
            currentHeight -= (70 + (2 * yRange));
        }
        const houseData = buildHome(d);
        n += 1;

        d3.select(this).append("polygon")
            .attr("fill", "yellow")
            .attr("class", "home")
            .attr("points", houseData.home)
            .attr("data-case", d.homeWidth) // Aggiungi l'attributo data-case
            .on("click", function() { sortHouses(data, "homeWidth"); }); // Event listener

        d3.select(this).append("polygon")
            .attr("fill", "brown")
            .attr("class", "roof")
            .attr("points", houseData.roof)
            .attr("data-case", d.roofWidth) // Aggiungi l'attributo data-case
            .on("click", function() { sortHouses(data, "roofWidth"); }); // Event listener

    });
}

function sortHouses(data, property) {

    data.sort((a, b) => {
        // Ordina in base alla proprietà property
        return a[property] - b[property];
    });
    currentXHome = 0 + (xRange / 2);
    currentHeight = 200 + (70 + (2 * yRange));

    let n = 0;
    d3.selectAll(".house")
        .data(data)
        .each(function(d) {
            if (n === 5) {
                currentXHome = 10 + (xRange / 2);
                currentHeight -= (70 + (2 * yRange));
            }
            n += 1;

            const houseData = buildHome(d);
            d3.select(this).select(".home")
                .transition()
                .duration(1000)
                .attr("points", houseData.home)
                .attr("data-case", d.homeWidth);
            d3.select(this).select(".roof")
                .transition()
                .duration(1000)
                .attr("points", houseData.roof)
                .attr("data-case", d.roofWidth);
        });
    
}

d3.json("data.json")
    .then(function(data) {
        const boardHeight = Math.floor(0.9 * window.screen.height);
        const boardWidth = Math.floor(0.9 * window.screen.width);

        let svgBoard = d3.select("#svg-board");
        svgBoard.attr("width", boardWidth);
        svgBoard.attr("height", boardHeight);
        xRange = boardWidth / 6;
        yRange = boardHeight / 5;
        currentXHome += (xRange / 2);
        currentHeight += (70 + (2 * yRange));
        xScale.range([0, xRange]);
        yScale.range([boardHeight, 0]);
        heightScale.range([0, yRange]);

        fillBoard(svgBoard, data);
    })
    .catch(error => console.log(error));
