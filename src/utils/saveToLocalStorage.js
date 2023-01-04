export const saveToLocal = (data) => {
  //   get the store first
  const previousData = JSON.parse(localStorage.getItem("parkingData"));
  if (previousData) {
    const newData = [...previousData, data];
    const dataToSave = JSON.stringify(newData);
    localStorage.setItem("parkingData", dataToSave);
    return "success";
  } else {
    const stringiFyValue = JSON.stringify([data]);
    localStorage.setItem("parkingData", stringiFyValue);
    return "success";
  }
};
