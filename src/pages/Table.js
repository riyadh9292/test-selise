import React, { useEffect, useState } from "react";
import { getData } from "../utils/getFromLOcalStorage";

export default function Table() {
  const [parkings, setParkings] = useState([]);
  useEffect(() => {
    const data = getData();
    setParkings(data);
  }, []);
  console.log(parkings, "parkings");
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="h-[80px]">
            <th>Owner Name</th>
            <th>Vehicle Type</th>
            <th>License No</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {parkings.map((parking, index) => (
            <tr
              className={`h-[50px] ${
                index % 2 == 0 ? "bg-[#fbfbfb]" : "bg-[#fafafa]"
              }`}
              key={index}
            >
              <td>{parking.vehicleOwnerName}</td>
              <td>{parking.vehicleType}</td>
              <td>{parking.vehicleNumber}</td>
              <td>{parking.vehicleEntry}</td>
              <td>{parking.vehicleExit}</td>
              <td>{parking.vehicleStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
