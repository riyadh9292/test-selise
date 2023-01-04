export const getData = () => {
  const data = JSON.parse(localStorage.getItem("parkingData"));
  return data;
};
