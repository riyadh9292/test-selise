export const getData = () => {
  const data = JSON.parse(localStorage.getItem("parkingData"));
  return data;
};
export const getSingleData = (id) => {
  return getData().find((data) => data.id === id);
};
