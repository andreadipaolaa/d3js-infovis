let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();
let heightScale = d3.scaleLinear();

const xDomain = [0, 1000];
const yDomain = [0, 800];
xScale.domain(xDomain);
yScale.domain(yDomain);
heightScale.domain(yDomain);

let currentXHome = 200;

function buildHome(data) {
    const homeWidth = parseFloat(xScale(data.homeWidth));
    const homeHeight = parseFloat(heightScale(data.homeHeight));
    y = parseFloat(yScale(100));
    let home = `${currentXHome},${y} ` +
               `${currentXHome+homeWidth/2},${y} ` +
               `${currentXHome+homeWidth/2},${y-homeHeight} ` +
               `${currentXHome-homeWidth/2},${y-homeHeight} ` +
               `${currentXHome-homeWidth/2},${y}`;
               currentXHome += homeWidth + 20;
    return home;
}

let currentXRoof = 200;

function buildRoof(data) {
    const roofWidth = parseFloat(xScale(data.roofWidth));
    const roofHeight = parseFloat(heightScale(data.roofHeight));
    const homeHeight = parseFloat(heightScale(data.homeHeight));
    y = parseFloat(yScale(100));
    let roof = `${currentXRoof},${y-homeHeight} ` +
               `${currentXRoof+roofWidth/2},${y-homeHeight} ` +
               `${currentXRoof},${y-homeHeight-roofHeight} ` +
               `${currentXRoof-roofWidth/2},${y-homeHeight} `;
    currentXRoof += 400;
    return roof;
}

function fillBoard(svgBoard, data) {
    let homes = svgBoard.selectAll(".home")
        .data(data)
        .enter();
    homes.append("polygon")
        .attr("fill", "yellow")
        .attr("class", "home")
        .attr("points", buildHome);

    let roofs = svgBoard.selectAll(".roof")
        .data(data)
        .enter();
    roofs.append("polygon")
        .attr("fill", "brown")
        .attr("class", "roof")
        .attr("points", buildRoof);
}

d3.json("data.json")
    .then(function(data) {
        const boardHeight = Math.floor(0.8*window.screen.height);
        const boardWidth = Math.floor(0.8*window.screen.width);

        let svgBoard = d3.select("#svg-board");
        svgBoard.attr("width", boardWidth);
        svgBoard.attr("height", boardHeight);

        xScale.range([0, boardWidth]);
        yScale.range([boardHeight, 0]);
        heightScale.range([0, boardHeight]);

        fillBoard(svgBoard, data);
    })
    .catch(error => console.log(error));