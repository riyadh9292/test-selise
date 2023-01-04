import React, { useEffect, useState } from "react";
import { notify } from "../components/Toast";
import { getRandomInt } from "../utils/randomNumber";
import { saveToLocal } from "../utils/saveToLocalStorage";
import { useNavigate } from "react-router-dom";

export const inputStyle =
  "px-4 py-2 border border-[#e6e6e6] rounded-md focus:outline-none";

export default function Home() {
  const navigate = useNavigate();

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOwnerName, setVehicleOwnerName] = useState("");
  const [vehicleOwnerPhone, setVehicleOwnerPhone] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("in");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [vehicleEntry, setVehicleEntry] = useState("");
  //   const [exactEntryTime, setExactEntryTime] = useState("");
  //   const [exactExitTime, setExactExitTime] = useState("");
  const [vehicleExit, setVehicleExit] = useState("");
  const [parkingCharge, setParkingCharge] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // conditions that check form and prevent form to save
    // if (vehicleExit < vehicleEntry || exactExitTime < exactEntryTime) {
    //   notify("Car entry and exit time mismatched.");
    //   return;
    // }
    // console.log(vehicleStatus, "vehicleStatus");
    if (vehicleExit && vehicleExit < vehicleEntry) {
      notify("Car entry and exit time mismatched.");
      return;
    }

    if (vehicleStatus === "out") {
      if (!vehicleExit) {
        notify("exit time should be added.");
        return;
      } else if (vehicleExit < vehicleEntry) {
        notify("Car entry and exit time mismatched.");
        return;
      }
    } else {
      if (!vehicleEntry) {
        notify("entry time should be added.");
        return;
      }
    }

    const saved = saveToLocal({
      id: getRandomInt(10000),
      vehicleNumber,
      vehicleType,
      vehicleOwnerName,
      vehicleOwnerPhone,
      vehicleStatus,
      ownerAddress,
      entry: new Date(vehicleEntry),
      exit: new Date(vehicleExit),
      parkingCharge,
    });

    if (saved === "success") {
      notify("successfully saved");
    }
  };

  useEffect(() => {
    //   conditionally set parking charge.
    if (vehicleType === "car") {
      setParkingCharge(100);
    } else if (vehicleType === "microbus") {
      setParkingCharge(250);
    } else if (vehicleType === "truck") {
      setParkingCharge(500);
    } else {
      setParkingCharge(0);
    }
  }, [vehicleType]);

  return (
    <div>
      <div
        onClick={() => navigate("/table")}
        className="text-lg my-4 p-4 border border-gray-600 bg-gray-300 text-pink-600 cursor-pointer"
      >
        Got to the table
      </div>
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
          <div>
            <input
              //   type="date"
              type="datetime-local"
              onChange={(e) => setVehicleEntry(e.target.value)}
              className={inputStyle}
            />
            {/* <input
              onChange={(e) => setExactEntryTime(e.target.value)}
              type="time"
              className={inputStyle}
            /> */}
          </div>
        </div>
        <div>
          {" "}
          <label>Exit Time</label>
          <div>
            <input
              //   type="date"
              type="datetime-local"
              onChange={(e) => setVehicleExit(e.target.value)}
              className={inputStyle}
            />
            {/* <input
              onChange={(e) => setExactExitTime(e.target.value)}
              type="time"
              className={inputStyle}
            /> */}
          </div>
        </div>
        <div>
          {" "}
          <label>Parking Charge</label>
          <input
            type="number"
            value={parkingCharge}
            onChange={(e) => setParkingCharge(e.target.value)}
            disabled
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
