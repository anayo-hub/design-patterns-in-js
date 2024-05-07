// Concrete Chart Classes (Canvas)
class BarChartCanvas {
  render(container) {
    const canvas = document.createElement("canvas");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";

    const sampleData = [100, 100, 100, 10]; // Replace with actual data
    const barWidth = 50;
    for (let i = 0; i < sampleData.length; i++) {
      const barHeight = sampleData[i] * 20; // Adjust multiplier for scaling
      ctx.fillRect(
        i * barWidth + 10,
        canvas.height - barHeight,
        barWidth,
        barHeight
      );
    }
  }
}

// Concrete Chart Classes (SVG)
class LineChartSVG {
  render(container) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", container.clientWidth);
    svg.setAttribute("height", container.clientHeight);
    container.appendChild(svg);

    const sampleData = [5, 15, 25, 35]; // Replace with actual data
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "blue");
    path.setAttribute("stroke-width", 2);
    let pathData = "M"; // Move to (start of path)
    for (let i = 0; i < sampleData.length; i++) {
      const x = i * (svg.clientWidth / (sampleData.length - 1));
      const y = svg.clientHeight - sampleData[i] * (svg.clientHeight / 100);
      pathData += ` ${x},${y}`; // Add coordinates to path
    }
    pathData += "Z"; // Close path
    path.setAttribute("d", pathData);
    svg.appendChild(path);
  }
}

// Factory Function
function createChart(type) {
  switch (type) {
    case "bar":
      return new BarChartCanvas();
    case "line":
      return new LineChartSVG();
    default:
      throw new Error("Invalid chart type");
  }
}

// DOM elements
const chartTypeSelect = document.getElementById("chartType");
const generateChartButton = document.getElementById("generateChart");
const chartContainer = document.getElementById("chartContainer");

// Event listener for button click
generateChartButton.addEventListener("click", () => {
  const selectedType = chartTypeSelect.value;
  const chart = createChart(selectedType);
  chartContainer.innerHTML = ""; // Clear container before rendering new chart
  chart.render(chartContainer);
});
