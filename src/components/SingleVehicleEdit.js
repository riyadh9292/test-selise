import React, { useEffect, useState } from "react";
import { inputStyle } from "../pages/Home";
import { getSingleData } from "../utils/getFromLOcalStorage";
import { updateToLocal } from "../utils/saveToLocalStorage";
import { notify } from "./Toast";

export default function SingleVehicleEdit({ vehicleId, handleClose }) {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOwnerName, setVehicleOwnerName] = useState("");
  const [vehicleOwnerPhone, setVehicleOwnerPhone] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("in");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [vehicleEntry, setVehicleEntry] = useState("");

  const [vehicleExit, setVehicleExit] = useState("");
  const [parkingCharge, setParkingCharge] = useState(0);
  useEffect(() => {
    const vehicleData = getSingleData(vehicleId);
    if (vehicleData) {
      setVehicleNumber(vehicleData.vehicleNumber);
      setVehicleType(vehicleData.vehicleType);
      setVehicleOwnerName(vehicleData.vehicleOwnerName);
      setVehicleOwnerPhone(vehicleData.vehicleOwnerPhone);
      setVehicleStatus(vehicleData.vehicleStatus);
      setOwnerAddress(vehicleData.ownerAddress);
      setVehicleEntry(vehicleData.entry);
      setVehicleExit(vehicleData.exit);
      setParkingCharge(vehicleData.parkingCharge);
    }
  }, [vehicleId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // conditions that prevent form to save
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

    const saved = updateToLocal(vehicleId, {
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
      notify("Successfully Updated.");
      handleClose();
    }
  };

  return (
    <div className="bg-white p-20 w-[90%] mx-auto">
      {" "}
      <form onSubmit={handleSubmit} className="space-y-2 mt-10">
        <div>
          <label>Vehicle Number</label>
          <input
            onChange={(e) => setVehicleNumber(e.target.value)}
            value={vehicleNumber}
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
            value={vehicleOwnerName}
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Owner Phone</label>
          <input
            type="number"
            onChange={(e) => setVehicleOwnerPhone(e.target.value)}
            value={vehicleOwnerPhone}
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
            value={ownerAddress}
            type="text"
            className={inputStyle}
          />
        </div>
        <div>
          {" "}
          <label>Entry Time</label>
          <div>
            <input
              type="datetime-local"
              onChange={(e) => setVehicleEntry(e.target.value)}
              value={vehicleEntry}
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
              type="datetime-local"
              onChange={(e) => setVehicleExit(e.target.value)}
              value={vehicleExit}
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
