import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { getData } from "../utils/getFromLOcalStorage";

export default function Dashboard() {
  const [totalData, setTotalData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [numberOfBus, setNumberOfBus] = useState(0);
  const [numberOfCar, setNumberOfCar] = useState(0);
  const [numberOfTruck, setNumberOfTruck] = useState(0);
  const handleFilter = (date) => {
    const stringDate = date + "";
    const todaysData = totalData.filter(
      (data) => data?.entry?.slice(0, 10) === stringDate.slice(0, 10)
    );
    setFiltered(todaysData);
  };
  useEffect(() => {
    const allData = getData();
    // counting all the vehicles
    const microbus = allData?.filter(
      (data) => data?.vehicleType === "microbus"
    );
    setNumberOfBus(microbus?.length || 0);
    const car = allData?.filter((data) => data?.vehicleType === "car");
    setNumberOfCar(car?.length || 0);
    const truck = allData?.filter((data) => data?.vehicleType === "truck");
    setNumberOfTruck(truck?.length || 0);
    setTotalData(allData);
  }, []);

  const data = {
    labels: ["Microbus", "Car", "Truck"],

    datasets: [
      {
        label: "Popularity of colours",
        data: [numberOfBus, numberOfCar, numberOfTruck],
        backgroundColor: ["red", "green", "blue"],
        borderWidth: 1,
      },
    ],
  };
  //   line chart
  let labels = [];
  for (let i = 0; i < totalData?.length; i++) {
    if (!labels.includes(totalData[i].entry.slice(0, 10))) {
      labels.push(totalData[i].entry.slice(0, 10));
    }
  }
  //   let datasets = Array(labels.length).fill(1);

  //   for (let i = 0; i < totalData?.length; i++) {}
  console.log(labels, "labels");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const dataLineChart = {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: labels?.map((label) => {
          let count = 0;
          totalData?.map((data) => {
            if (data?.entry?.slice(0, 10) === label) {
              count += 1;
            }
          });
          return count;
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div>
        <label for="birthday">filter by date:</label> <br />
        <input
          onChange={(e) => handleFilter(e.target.value)}
          type="datetime-local"
          id="birthday"
          name="birthday"
        />
        <div className="mt-20">
          <p>filtered data by date</p>
          {!filtered?.length && (
            <div className="py-10 text-center text-pink-800 text-3xl">
              No parkings found filtered data by date
            </div>
          )}
        </div>
      </div>
      {filtered?.length &&
        filtered?.map((data, index) => (
          <div key={index} className="my-10">
            <p>{data?.vehicleOwnerName}</p>
            <p>{data?.vehicleType}</p>
            <p>{data?.vehicleNumber}</p>

            <p>{data?.entry}</p>
            <p>{data?.exit}</p>
            <p>{data?.vehicleStatus}</p>
          </div>
        ))}
      <div className="my-10 p-20">
        <PieChart chartData={data} />
      </div>
      <div className="my-10 p-20">
        <LineChart data={dataLineChart} options={options} />
      </div>
    </>
  );
}
