import React, { useEffect, useState } from "react";
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
    console.log(stringDate.slice(0, 10), "date");
    console.log(totalData, "totalData");
    const todaysData = totalData.filter(
      (data) => data.entry.slice(0, 10) === stringDate.slice(0, 10)
    );
    setFiltered(todaysData);
  };
  useEffect(() => {
    const allData = getData();
    // counting all the vehicles
    const microbus = allData.filter((data) => data?.vehicleType === "microbus");
    setNumberOfBus(microbus?.length || 0);
    const car = allData.filter((data) => data?.vehicleType === "car");
    setNumberOfCar(car?.length || 0);
    const truck = allData.filter((data) => data?.vehicleType === "truck");
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
    </>
  );
}
