import React, { useState, useEffect } from "react";
import { fetchBrands, fetchModels, fetchVersions } from "../api/carApi";
import "bootstrap/dist/css/bootstrap.min.css";

const SelectCarModal = ({ onClose, onAddCar }) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy danh sách thương hiệu
  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        const data = await fetchBrands();
        setBrands(data.brands);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Không thể tải danh sách thương hiệu.");
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  // Khi chọn thương hiệu, lấy danh sách mẫu xe
  const handleBrandChange = async (brand) => {
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedVersion(null);
    setModels([]);
    setVersions([]);

    try {
      if (brand) {
        setLoading(true);
        const data = await fetchModels(brand);
        setModels(data.models);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching models:", err);
      setError("Không thể tải danh sách mẫu xe.");
      setLoading(false);
    }
  };

  // Khi chọn mẫu xe, lấy danh sách phiên bản
  const handleModelChange = async (model) => {
    setSelectedModel(model);
    setSelectedVersion(null);
    setVersions([]);

    try {
      if (model) {
        setLoading(true);
        const data = await fetchVersions(model);
        setVersions(data.versions);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching versions:", err);
      setError("Không thể tải danh sách phiên bản.");
      setLoading(false);
    }
  };

  // Khi chọn phiên bản
  const handleVersionChange = (versionId) => {
    const selected = versions.find((version) => version._id === versionId);
    setSelectedVersion(selected);
  };

  // Khi nhấn "Thêm xe"
  const handleAddCar = () => {
    // Check if a valid version is selected
    if (!selectedVersion || !selectedVersion._id) {
      alert("Vui lòng chọn đầy đủ thông tin trước khi thêm xe.");
      return;
    }
  
    // Get the ID of the selected car version
    const carId = selectedVersion._id;
  
    // Call the onAddCar function and pass the car ID (or selectedVersion)
    onAddCar(carId); // Pass car ID to CompareModal (or whatever you're doing with it)
  
    // Close the modal after adding
    onClose();
  };
  
  


  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="select-car-modal">
      <h3>Thêm xe</h3>

      {/* Lựa chọn thương hiệu */}
      <div className="form-group">
        <label>Hãng xe:</label>
        <select
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
        >
          <option value="">Chọn hãng xe</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Lựa chọn mẫu xe */}
      <div className="form-group">
        <label>Tên xe:</label>
        <select
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={!selectedBrand}
        >
          <option value="">Chọn tên xe</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Lựa chọn phiên bản */}
      <div className="form-group">
        <label>Phiên bản:</label>
        <select
          value={selectedVersion?._id || ""}
          onChange={(e) => handleVersionChange(e.target.value)}
          disabled={!selectedModel}
        >
          <option value="">Chọn phiên bản</option>
          {versions.map((version) => (
            <option key={version._id} value={version._id}>
              {version.version}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị thông tin phiên bản được chọn */}
      {selectedVersion && (
        <div className="preview">
          <img
            src={selectedVersion.imageUrl[0]}
            alt={selectedVersion.version}
            style={{ width: "100px", height: "auto" }}
          />
          <p>{selectedVersion.version}</p>
          <p>Giá: {selectedVersion.price}</p>
        </div>
      )}

      {/* Các nút hành động */}
      <div className="actions">
        <button className="btn btn-outline-success" style={{marginRight: "5px" }} onClick={handleAddCar}>Thêm</button>
        <button className="btn btn-danger" onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default SelectCarModal;
