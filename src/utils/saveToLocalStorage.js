import { getData } from "./getFromLOcalStorage";

export const saveToLocal = (data) => {
  //   get the store first
  const previousData = JSON.parse(localStorage.getItem("parkingData"));
  if (previousData) {
    const newData = [...previousData, data];
    const dataToSave = JSON.stringify(newData);
    localStorage.setItem("parkingData", dataToSave);
    return "success";
  } else {
    const stringiFyValue = !Array.isArray(data)
      ? JSON.stringify([data])
      : JSON.stringify(data);
    localStorage.setItem("parkingData", stringiFyValue);
    return "success";
  }
};

export const updateToLocal = (id, data) => {
  console.log(getData(), "getData()");
  let allData = getData().filter((data) => data.id !== id);
  //   remove old data
  localStorage.clear();
  const updatedArray = [...allData, { id, ...data }];
  return saveToLocal(updatedArray); //set new data in localstorage
};
