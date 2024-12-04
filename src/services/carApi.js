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

export const fetchCarsDeleted = async (page, sortKey, sortValue) => {
  try {
    const response = await Axios.get(`${API_URL}/deleted`, {
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

export const deleteCar = async (id) => {
  try {
    await Axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    throw new Error("Failed to delete the car");
  }
};

export const bulkDeleteCars = async (ids) => {
  try {
    await Axios.patch(`${API_URL}/change_multi`, {
      ids,
      type: "delete-multi",
    });
  } catch (error) {
    throw new Error("Failed to delete selected cars");
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

export const deleteDB = async (id) => {
  try {
    const response = await fetch(`${API_URL}/deleteDB/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete car from the database");
    }

    const data = await response.json();
    return data; // Dữ liệu trả về từ server (thông báo thành công hoặc lỗi)
  } catch (err) {
    throw new Error(err.message);
  }
};

export const undoDeleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/undo-delete/${id}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Failed to undo delete car.");
    }

    const data = await response.json();
    return data; // Dữ liệu trả về từ server (thông báo thành công hoặc lỗi)
  } catch (err) {
    throw new Error(err.message);
  }
};

/** api create car*/
export const createCar = async (formData, images) => {
  try {
    const response = await Axios.post(`${API_URL}/create`, {
      ...formData,
      imageUrl: images.map((image) => image),
    });
    return response.data; // Dữ liệu trả về từ API (nếu có)
  } catch (error) {
    throw new Error("Failed to create car");
  }
};

/**
 * 
 * @param {*} Api update car 
 * @param {*} Use to update carinfo
 * @returns 
 */
export const updateCar = async (id, formData, images) => {
  try {
    const response = await Axios.patch(`${API_URL}/edit/${id}`, {
      ...formData,
      imageUrl: images, // Đảm bảo images là mảng hợp lệ
    });
    return response; // Trả về phản hồi từ API
  } catch (error) {
    throw new Error("Failed to update car");
  }
};

export const fetchCarCountBySegment = async () => {
  try {
    const response = await Axios.get(`${API_URL}/count_by_segment`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw new Error("Failed to fetch car count by segment");
  }
};



