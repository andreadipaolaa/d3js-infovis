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
let yRange=0;
let currentHeight = 200;


function buildHome(data) {
    const homeWidth = parseFloat(xScale(data.homeWidth));
    const homeHeight = parseFloat(heightScale(data.homeHeight));
    const roofWidth = parseFloat(xScale(data.roofWidth));
    const roofHeight = parseFloat(heightScale(data.roofHeight));
    const y = parseFloat(yScale(currentHeight));

    // Calcola le coordinate della casa
    let home = `${currentXHome},${y} ` +
               `${currentXHome + homeWidth / 2},${y} ` +
               `${currentXHome + homeWidth / 2},${y - homeHeight} ` +
               `${currentXHome - homeWidth / 2},${y - homeHeight} ` +
               `${currentXHome - homeWidth / 2},${y}`;

    // Calcola le coordinate del tetto
    let roof = `${currentXHome},${y - homeHeight} ` +
               `${currentXHome + roofWidth / 2},${y - homeHeight} ` +
               `${currentXHome},${y - homeHeight - roofHeight} ` +
               `${currentXHome - roofWidth / 2},${y - homeHeight}`;

    // Trova la larghezza maggiore tra homeWidth e roofWidth e aggiorna currentXHome
    currentXHome +=  xRange+ 10; 

    console.log(`Home coordinates: ${home}`);
    console.log(`Roof coordinates: ${roof}`);

    return { home, roof };
}

function fillBoard(svgBoard, data) {
    let homes = svgBoard.selectAll(".home")
        .data(data)
        .enter()
        .append("g"); // Raggruppa ogni casa e tetto in un elemento <g>
    var n=0
    homes.each(function(d) {
        if(n==5){
            currentXHome = 10 + (xRange/2);
            currentHeight -= (100+(2*yRange));
        }
        const houseData = buildHome(d);
        n += 1;
        d3.select(this).append("polygon")
            .attr("fill", "yellow")
            .attr("class", "home")
            .attr("points", houseData.home);

        d3.select(this).append("polygon")
            .attr("fill", "brown")
            .attr("class", "roof")
            .attr("points", houseData.roof);
    });
}

d3.json("data.json")
    .then(function(data) {
        const boardHeight = Math.floor(0.9 * window.screen.height);
        const boardWidth = Math.floor(0.9 * window.screen.width);

        let svgBoard = d3.select("#svg-board");
        svgBoard.attr("width", boardWidth);
        svgBoard.attr("height", boardHeight);
        xRange = boardWidth/6;
        yRange = boardHeight/5;
        currentXHome += (xRange/2);
        currentHeight += (100+(2*yRange));
        xScale.range([0, xRange]);
        yScale.range([boardHeight, 0]);
        heightScale.range([0, yRange]);

        console.log(`Board dimensions: ${boardWidth}x${boardHeight}`);

        fillBoard(svgBoard, data);
    })
    .catch(error => console.log(error));
