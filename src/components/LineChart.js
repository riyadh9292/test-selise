// src/components/PieChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { ArcElement, Legend } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function LineChart({ options, data }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>line Chart</h2>
      <Line options={options} data={data} />;
    </div>
  );
}
export default LineChart;
