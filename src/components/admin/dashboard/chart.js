import React, { Component } from "react";
import CanvasJSReact from "../../../asset/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {
	var {data} = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Lượt Truy Cập",
      },
      axisY: {
        title: "Lượt truy cập",
        includeZero: false
      },
      axisX: {
        valueFormatString: "DD/MM",
        type: "line",
        title: "Ngày",
        interval: 1,
      },
      data: [
        {
          type: "line",
          xValueFormatString: "DD/MM/YYYY",
          toolTipContent: "Ngày {x}: {y} người",
          dataPoints: data,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default LineChart;
