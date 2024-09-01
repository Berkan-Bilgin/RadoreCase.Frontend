// const BASE_URL = 'https://localhost:5001/api/Products';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/Products`;

export const fetchProductsApi = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const fetchProductByIdApi = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
