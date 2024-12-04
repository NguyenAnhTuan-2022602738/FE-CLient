import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await fetch(
          `https://btl-ptpmhdv-nhom-15.vercel.app/api/car_items/detail/${id}`
        );
        const data = await response.json();
        setCar(data.car || null);
      } catch (error) {
        console.error("Error fetching car detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Đang tải thông tin chi tiết...</p>;
  }

  if (!car) {
    return <p className="text-center mt-5">Không tìm thấy thông tin xe.</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{car.name}</h1>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Thông tin chi tiết</h5>
        </div>
        <div className="card-body">
          <p><strong>Hãng xe:</strong> {car.brand}</p>
          <p><strong>Phiên bản:</strong> {car.version}</p>
          <p><strong>Phân khúc xe:</strong> {car.vehicle_segment}</p>
          <p><strong>Giá:</strong> {car.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
