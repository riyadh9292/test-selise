import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { getData } from "../utils/getFromLOcalStorage";
import SingleVehicleEdit from "../components/SingleVehicleEdit";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Table() {
  const navigate = useNavigate();
  const [parkings, setParkings] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editRow, setEditRow] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const data = getData();
    setParkings(data);
  }, [open]);

  return (
    <>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {parkings?.length &&
              parkings?.map((parking, index) => (
                <tr
                  className={`h-[50px] ${
                    index % 2 == 0 ? "bg-[#fbfbfb]" : "bg-[#fafafa]"
                  }`}
                  key={index}
                >
                  <td>{parking?.vehicleOwnerName}</td>
                  <td>{parking?.vehicleType}</td>
                  <td>{parking?.vehicleNumber}</td>

                  <td>{parking?.entry}</td>
                  <td>{parking?.exit}</td>
                  <td>{parking?.vehicleStatus}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditRow(parking?.id);
                        handleOpen();
                      }}
                      className="p-2 bg-gray-300 text-pink-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>{" "}
        {!parkings?.length && (
          <div className="py-10 text-center text-pink-800 text-3xl">
            No parkings found please add some
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <span
            onClick={handleClose}
            className="text-red-800 text-3xl cursor-pointer absolute right-20"
          >
            X
          </span>
          <SingleVehicleEdit handleClose={handleClose} vehicleId={editRow} />
        </>
      </Modal>
      <div
        onClick={() => navigate("/")}
        className="text-lg my-4 p-4 border border-gray-600 bg-gray-300 text-pink-600 cursor-pointer"
      >
        Got to Home
      </div>
    </>
  );
}
