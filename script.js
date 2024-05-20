let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();
let heightScale = d3.scaleLinear();

const xDomain = [0, 100];
const yDomain = [0, 100];
xScale.domain(xDomain);
yScale.domain(yDomain);
heightScale.domain(yDomain);

function buildTriangle(triangle) {
    let x = parseFloat(xScale(triangle.x));
    let y = parseFloat(yScale(triangle.y));
    let base = parseFloat(xScale(triangle.base));
    let height = parseFloat(heightScale(triangle.height));
    return `${x},${y} ${x+base},${y} ${x+(base/2)},${y-height}`;
}

function updateBoard(svgBoard, data) {
    svgBoard.selectAll("polygon")
        .data(data)
        .transition()
        .duration(750)
        .attr("points", buildTriangle)
        .duration(250)
        .attr("stroke-width", function(triangle) {
            if (triangle.hasEdge) return 3;
            return 0;
        });
}

let lastClickedTriangle = null;

function fillBoard(svgBoard, data) {
    svgBoard.selectAll("polygon")
        .data(data)
        .enter()
        .append("polygon")
        .attr("fill", function(triangle) {
            return `hsl(${triangle.hue}, 100%, 50%)`;
        })
        .attr("stroke", "black")
        .attr("points", buildTriangle)
        .attr("stroke-width", 0)
        .on("click", function(event, triangle) {
            if (lastClickedTriangle == null) {
                lastClickedTriangle = triangle;
                triangle.hasEdge = true;
                updateBoard(svgBoard, data);
            }
            else {
                lastClickedTriangle.hasEdge = false;
                let base1 = lastClickedTriangle.base;
                let height1 = lastClickedTriangle.height;
                let base2 = triangle.base;
                let height2 = triangle.height;
                triangle.base = base1;
                triangle.height = height1;
                lastClickedTriangle.base = base2;
                lastClickedTriangle.height = height2;
                lastClickedTriangle = null;
                updateBoard(svgBoard, data);
            }
        });
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