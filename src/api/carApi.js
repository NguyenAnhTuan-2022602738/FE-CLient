// src/api/carApi.js
import Axios from "axios";

const API_URL = "https://btl-ptpmhdv-nhom-15.vercel.app/api/car_items";

export const fetchCars = async (page, sortKey, sortValue) => {
  try {
    const response = await Axios.get(API_URL, {
      params: { page, sortKey, sortValue },
    });
    return response.data; // trả về dữ liệu từ API
  } catch (error) {
    throw new Error("Failed to fetch car data");
  }
};

export const searchCars = async (searchKey, searchValue) => {
  try {
    const response = await Axios.get(`${API_URL}`, {
      params: {
        searchKey,
        searchValue
      },
    });
    return response.data; // trả về dữ liệu từ API
  } catch (error) {
    throw new Error('Failed to fetch search data');
  }
};

export const getCarDetail= async (id) => {
  try {
    const response = await Axios.get(`${API_URL}/detail/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete selected cars");
  }
};

// Get 4 latest cars (new cars)
export const fetchMostClickedCars= async () => {
  try {
    const response = await Axios.get(`${API_URL}/popularCars`);
    return response.data; // trả về dữ liệu từ API
  } catch (error) {
    throw new Error("Failed to fetch new cars");
  }
};

// Increment click count for a car
export const incrementClick = async (id) => {
  try {
    const response = await Axios.post(`${API_URL}/${id}/click`);
    return response.data; // trả về dữ liệu từ API (thông tin lượt click)
  } catch (error) {
    throw new Error("Failed to update click count");
  }
};

// Lấy danh sách thương hiệu
export const fetchBrands = async () => {
  try {
    const response = await Axios.get(`${API_URL}/brands`);
    return response.data; // Trả về danh sách thương hiệu
  } catch (error) {
    throw new Error("Failed to fetch brands");
  }
};

// Lấy danh sách mẫu xe dựa trên thương hiệu
export const fetchModels = async (brand) => {
  try {
    const response = await Axios.get(`${API_URL}/models/${encodeURIComponent(brand)}`);
    return response.data; // Trả về danh sách mẫu xe
  } catch (error) {
    throw new Error("Failed to fetch models");
  }
};

// Lấy danh sách phiên bản dựa trên mẫu xe
export const fetchVersions = async (model) => {
  try {
    const response = await Axios.get(`${API_URL}/versions/${encodeURIComponent(model)}`);
    return response.data; // Trả về danh sách phiên bản
  } catch (error) {
    throw new Error("Failed to fetch versions");
  }
};


