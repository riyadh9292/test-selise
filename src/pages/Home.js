import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRandomInt } from "../utils/randomNumber";
import { saveToLocal } from "../utils/saveToLocalStorage";

const inputStyle =
  "px-4 py-2 border border-[#e6e6e6] rounded-md focus:outline-none";

export default function Home() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOwnerName, setVehicleOwnerName] = useState("");
  const [vehicleOwnerPhone, setVehicleOwnerPhone] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("in");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [vehicleEntry, setVehicleEntry] = useState("");
  const [vehicleExit, setVehicleExit] = useState("");
  const [parkingCharge, setParkingCharge] = useState(0);
  const notify = () => toast("Wow so easy !");

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = saveToLocal({
      id: getRandomInt(10000),
      vehicleNumber,
      vehicleType,
      vehicleOwnerName,
      vehicleOwnerPhone,
      vehicleStatus,
      ownerAddress,
      vehicleEntry,
      vehicleExit,
      parkingCharge,
    });

    if (saved === "success") {
      notify();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2 mt-10">
        <div>
          <label>Vehicle Number</label>
          <input
            onChange={(e) => setVehicleNumber(e.target.value)}
            type="number"
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Vehicle Type</label>
          <select
            onChange={(e) => setVehicleType(e.target.value)}
            className={inputStyle}
            name="pets"
            id="pet-select"
          >
            <option disabled value="">
              --Please choose an option--
            </option>
            <option value="microbus">Microbus</option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
          </select>
          {/* <input type="number" className={inputStyle} /> */}
        </div>
        <div>
          {" "}
          <label>Owner Name</label>
          <input
            type="text"
            onChange={(e) => setVehicleOwnerName(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Owner Phone</label>
          <input
            type="number"
            onChange={(e) => setVehicleOwnerPhone(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Status</label>
          <label>
            <input
              type="radio"
              value="in"
              checked={vehicleStatus === "in"}
              onChange={() => setVehicleStatus("in")}
            />
            in
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="out"
              checked={vehicleStatus === "out"}
              onChange={() => setVehicleStatus("out")}
            />
            out
          </label>
        </div>
        <div>
          <label>Owner Address</label>
          <input
            onChange={(e) => setOwnerAddress(e.target.value)}
            type="text"
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Entry Time</label>
          <input
            type="date"
            onChange={(e) => setVehicleEntry(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Exit Time</label>
          <input
            type="date"
            onChange={(e) => setVehicleExit(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Parking Charge</label>
          <input
            type="number"
            onChange={(e) => setParkingCharge(e.target.value)}
            className={inputStyle}
          />
        </div>
        <button
          className="px-4 py-2 border border-gray-300 bg-gray-500 text-white text-lg mt-10"
          type="Submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
