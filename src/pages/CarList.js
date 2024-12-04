import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Alert,
  Button,
  Table,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  img,
} from "@mui/material";
import CarDetailModal from "../components/CarDetailModal";
import CompareModal from "../components/CompareModal";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleInfo,
  faCodeCompare,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchCars,
  searchCars,
  getCarDetail,
  fetchMostClickedCars,
  incrementClick,
} from "../api/carApi";
import "../styles/CarList.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [MostClickedCarsData, setMostClickedCars] = useState([]); // Dữ liệu xe mới
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState("name");
  const [sortValue, setSortValue] = useState("asc");

  // Tìm kiếm
  const [searchKey, setSearchKey] = useState("brand");
  const [searchValue, setSearchValue] = useState("");

  //chi tiết xe
  const [selectedCar, setSelectedCar] = useState(null); // Xe được chọn để xem chi tiết
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCars, setSelectedCars] = useState([]);
  const maxCars = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCars(page, sortKey, sortValue);
        setCars(data.cars);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car data.");
        setLoading(false);
      }
    };
    const fetchMostClickedCarsData = async () => {
      try {
        const MostClickedCarsData = await fetchMostClickedCars(); // Lấy danh sách xe mới
        setMostClickedCars(MostClickedCarsData.cars); // Lưu vào state
      } catch (err) {
        setError("Failed to fetch new car data.");
        setLoading(false);
      }
    };
    fetchData();
    fetchMostClickedCarsData();
  }, [page, sortKey, sortValue]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Bắt đầu loading
      const data = await searchCars(searchKey, searchValue); // Gọi hàm searchCars
      setCars(data.cars);
      setTotalPages(data.totalPages);
      setPage(1); // Reset về trang đầu
      setLoading(false); // Kết thúc loading
    } catch (err) {
      setError("Failed to perform search.");
      setLoading(false); // Kết thúc loading
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSort = (event) => {
    const [key, value] = event.target.value.split("-");
    setSortKey(key);
    setSortValue(value);
    setPage(1);
  };

  const handleOpenModal = async (id) => {
    try {
      // Tăng số lượt click
      await incrementClick(id);
      const carDetail = await getCarDetail(id); // Gọi API lấy chi tiết xe
      setSelectedCar(carDetail); // Cập nhật state để hiển thị trong modal
      setModalOpen(true); // Mở modal
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chi tiết xe:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleAddToCompare = async (carId) => {
    if (selectedCars.length >= maxCars) {
      alert("Chỉ có thể so sánh tối đa 4 xe.");
      return;
    }

    if (selectedCars.some((selectedCar) => selectedCar.id === carId)) {
      alert("Xe này đã được thêm vào danh sách so sánh.");
      return;
    }

    try {
      // Gọi API lấy chi tiết xe
      const carDetail = await getCarDetail(carId);
      setSelectedCars([...selectedCars, carDetail]);
    } catch (error) {
      console.error("Lỗi khi thêm xe vào danh sách so sánh:", error.message);
    }
  };

  const handleAddCar = async (carId) => {
    if (selectedCars.length >= maxCars) {
      alert("Chỉ có thể so sánh tối đa 4 xe.");
      return;
    }

    if (selectedCars.some((car) => car.id === carId)) {
      alert("Xe này đã được thêm vào danh sách so sánh.");
      return;
    }

    try {
      const carDetail = await getCarDetail(carId); // Lấy chi tiết xe
      setSelectedCars([...selectedCars, carDetail]); // Thêm xe vào danh sách
    } catch (error) {
      console.error("Lỗi khi thêm xe vào danh sách so sánh:", error.message);
    }
  };

  const handleRemoveCar = (param) => {
    if (param === "all") {
      setSelectedCars([]); // Xóa tất cả
    } else {
      setSelectedCars(
        (prevSelectedCars) => prevSelectedCars.filter((_, i) => i !== param) // Xóa xe tại index
      );
    }
  };

  const handleCompare = () => {
    if (selectedCars.length < 2) {
      alert("Vui lòng chọn ít nhất 2 xe để so sánh.");
      return;
    }
    console.log("Danh sách xe cần so sánh:", selectedCars);
    // Gửi dữ liệu đi hoặc hiển thị so sánh trên modal khác
  };

  const tableRef = useRef(null);
  const popularRef = useRef(null);
  const newRef = useRef(null);

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToPopularCars = () => {
    if (popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const scrollToNews = () => {
    if (newRef.current) {
      newRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <header>
        <div className="box-head">
          <div className="box-logo">
            <div className="title">
              <a href="/">Nhóm 15</a>
            </div>
          </div>
          <div className="box-menu">
            <ul>
              <li>
                <a href="#!" onClick={scrollToTable}>
                  Danh sách xe
                </a>
              </li>
              <li>
                <a href="#!" onClick={scrollToPopularCars}>
                  Xe nổi bật
                </a>
              </li>
              <li>
                <a href="#!" onClick={scrollToNews}>Tin tức</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="banner">
        <Banner />
      </div>
      <div className="container">
        <div className="card mb-3">
          <div className="card-body" ref={tableRef}>
            {/* Bộ lọc và xóa đã chọn */}
            <div className="mb-3">
              <div class="row">
                <div class="col-3">
                  <Select onChange={handleSort} defaultValue="">
                    <MenuItem value="" selected>
                      <em>Mặc định</em>
                    </MenuItem>
                    <MenuItem value="brand-asc">Hãng xe (A-Z)</MenuItem>
                    <MenuItem value="brand-desc">Hãng xe (Z-A)</MenuItem>
                    <MenuItem value="price-asc">Giá (Thấp đến Cao)</MenuItem>
                    <MenuItem value="price-desc">Giá (Cao đến Thấp)</MenuItem>
                  </Select>
                </div>
                <div className="col-7">
                  <form
                    onSubmit={handleSearch}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ marginBottom: "16px", flex: "1" }}
                    >
                      <InputLabel>Tìm kiếm theo</InputLabel>
                      <Select
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        label="Tìm kiếm theo"
                      >
                        <MenuItem value="brand">Hãng xe</MenuItem>
                        <MenuItem value="name">Tên xe</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Nhập từ khóa"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      style={{ marginBottom: "16px", flex: "3" }}
                      InputProps={{
                        endAdornment: (
                          <button
                            type="submit"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </button>
                        ),
                      }}
                    />
                  </form>
                </div>
              </div>
            </div>

            {/* Bảng dữ liệu */}
            <Table
              className="table table-hover table-sm"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead className="thead-dark">
                <tr>
                  <th
                    style={{
                      width: "5%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    STT
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    Hãng xe
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    Tên xe
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    Phiên bản
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    Phân khúc
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Giá
                  </th>
                  <th
                    style={{
                      width: "25%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <TableRow key={car._id}>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {(page - 1) * 10 + index + 1}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                    >
                      {car.brand}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                    >
                      {car.name}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                    >
                      {car.version}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                    >
                      {car.vehicle_segment}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                    >
                      {car.price}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <Button
                        class="btn btn-primary"
                        variant="contained"
                        onClick={() => handleOpenModal(car._id)}
                        style={{ marginRight: "5px" }}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </Button>
                      <Button
                        class="btn btn-secondary"
                        style={{ marginTop: "0px" }}
                        onClick={() => handleAddToCompare(car._id)}
                      >
                        <FontAwesomeIcon icon={faCodeCompare} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            {/* Modal hiển thị chi tiết */}
            <CarDetailModal
              open={modalOpen}
              onClose={handleCloseModal}
              carDetail={selectedCar}
            />

            {/* Phân trang */}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              className="mt-3"
            />
            <div style={{ margin: "30px" }}></div>

            <CompareModal
              selectedCars={selectedCars}
              onRemoveCar={handleRemoveCar}
              onCompare={handleCompare}
              onAddCar={handleAddCar}
            />
          </div>
        </div>
        {/* Xe mới ra mắt */}
        <div ref={popularRef}>
          <div class="popularCars">
            <h2>Xe nổi bật</h2>
            <div className="row">
              {/* Kiểm tra dữ liệu trước khi gọi .map() */}
              {MostClickedCarsData && MostClickedCarsData.length > 0 ? (
                MostClickedCarsData.map((car) => (
                  <div className="col-3 box-Caritem" key={car._id}>
                    <div className="boxContent">
                      <img
                        src={car.imageUrl[0]}
                        alt={car.name}
                        onClick={() => handleOpenModal(car._id)}
                      />
                      <h5>
                        <a onClick={() => handleOpenModal(car._id)}>
                          {car.name}
                        </a>
                      </h5>
                      <div className="price">
                        Giá: <span>{car.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Chưa load được dữ liệu xe nổi bật</p> // Hiển thị thông báo nếu không có xe mới
              )}
            </div>
          </div>
        </div>
        <div className="newspaper" ref={newRef}>
          <h2>NEWS</h2>
          <div className="row">
            <div className="col-4">
              <div className="boxContent">
                <img
                  src="https://vcdn1-vnexpress.vnecdn.net/2024/11/12/Topxethang102-1731396823-7439-1731396844.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=EaBBngGt1i4unoEm5ckv6w"
                  alt="ảnh top xe bán chạy"
                />
                <h5>
                  <a href="https://vnexpress.net/oto-xe-may/v-car/doanh-so/vinfast-dan-dau-10-oto-ban-nhieu-nhat-thang-10-4815166.html">
                    VinFast dẫn đầu 10 ôtô bán nhiều nhất tháng 10
                  </a>
                </h5>
                <div className="discription">
                  Hai mẫu xe điện của VinFast chiếm đỉnh bảng xếp hạng với doanh
                  số, bỏ xa các mẫu xe động cơ đốt trong như Mitsubishi Xpander
                  hay Mazda CX-5.
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="boxContent">
                <img
                  src="https://vcdn1-vnexpress.vnecdn.net/2024/10/14/SedanQ3-1728870375-9303-1728871470.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=uBZrZ2QMBmcdxMbR_3spmA"
                  alt="ảnh top xe bán chạy"
                />
                <h5>
                  <a href="https://vnexpress.net/oto-xe-may/v-car/doanh-so/5-sedan-ban-nhieu-quy-iii-xe-co-b-lan-luot-4803746.html">
                    5 sedan bán nhiều Quý III: xe cỡ B lấn lướt
                  </a>
                </h5>
                <div className="discription">
                  Toyota Vios giao nhiều nhất với 4.597 xe, nhiều hơn 1.385 xe
                  so với Hyundai Accent ở vị trí thứ hai, Honda City giữ hạng
                  ba.
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="boxContent">
                <img
                  src="https://vcdn1-vnexpress.vnecdn.net/2024/10/13/Vios-1728823972-7414-1728824136.jpg?w=380&h=228&q=100&dpr=1&fit=crop&s=xK9wsNcf2-JOqdrkV-u-8g"
                  alt="ảnh top xe bán chạy"
                />
                <h5>
                  <a href="https://vnexpress.net/oto-xe-may/v-car/doanh-so/5-mau-sedan-ban-nhieu-nhat-thang-9-4803667.html">
                    5 mẫu sedan bán nhiều nhất tháng 9
                  </a>
                </h5>
                <div className="discription">
                  Toyota Vios giữ vị trí đầu bảng xếp hạng doanh số với 1.842
                  xe, nhiều hơn 252 xe so với đối thủ City ở hạng hai với 1.590
                  xe.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
