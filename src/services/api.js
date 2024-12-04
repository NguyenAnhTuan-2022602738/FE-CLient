// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://btl-ptpmhdv-nhom-15.vercel.app/api',  // Đổi URL này nếu API backend của bạn khác
});

export const fetchCars = async () => {
  try {
    const response = await api.get('/car_items');
    return response.data;  // Dữ liệu xe từ API
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};
