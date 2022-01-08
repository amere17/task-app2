//----------------- imports -----------------
import React from "react";
import "./chart.css";
//------------------ consts ----------------
const SVG_WIDTH = 450;
const SVG_HEIGHT = 300;

let data;
const chart = (props)=> {
    // data from the App component 
    data = props.dataPlanets;
    // consts
    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const numYTicks = 5;
    const xAxisY = y0 + yAxisLength;
    // find the max value of the population planet
    const dataYMax = data.reduce(
      (currMax, [_,dataY]) => Math.max(currMax, dataY),
      -Infinity
    );
    // find the min value of the population planet
    const dataYMin = data.reduce(
      (currMin, [_,dataY]) => Math.min(currMin, dataY),
      Infinity
    );
    // data range for the number of population planet
    const dataYRange = dataYMax - dataYMin;
    const barPlotWidth = xAxisLength / data.length;

    return (
        <div className="chart-style">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Planet
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
  
          const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));
  
          return (
              
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {(yValue/1000)+'k'}
              </text>
            </g>
          );
          
        })}

        <text x={x0} y={y0 - 8} textAnchor="middle">
          Population
        </text>
        {/* Bar plots */}
        {data.map(([planet, dataY], index) => {
          const x = x0 + index * barPlotWidth;
  
          const yRatio = (dataY - dataYMin) / dataYRange;
  
          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;
  
          const sidePadding = 20;
  
          return (
            <g key={index}>
              <rect
                x={x + sidePadding / 2}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
              />
              <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                {planet}
              </text>
              <text x={x + barPlotWidth / 2} y={xAxisY - height-5} textAnchor="middle">
                {(dataY/1000)+'k'}
              </text>
            </g>
          );
        })}
      </svg>
      </div>
    );
  }

export default chart;