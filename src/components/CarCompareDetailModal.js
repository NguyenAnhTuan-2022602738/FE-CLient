import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CarCompareDetailModal.css"; // Tạo file CSS cho modal này
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const CarCompareDetailModal = ({ carDetails, onClose }) => {
  // State để theo dõi trạng thái checkbox
  const [showOnlyHeaderRows, setShowOnlyHeaderRows] = useState(false);

  // Hàm đóng modal khi nhấn ra ngoài
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Đóng modal khi nhấn vào overlay
    }
  };

  // Hàm xử lý checkbox
  const handleCheckboxChange = () => {
    setShowOnlyHeaderRows((prev) => !prev);
  };
  // style={{ display: showOnlyHeaderRows ? "none" : "" }}

  // Hàm FeatureRow cải tiến
  const FeatureRow = ({ label, values, isHeader, showOnlyHeaderRows }) => {
    // Kiểm tra xem tất cả các ô đều rỗng hoặc "Đang cập nhật"
    const isEmptyOrUpdating = values.every(
      (value) => !value || value === "Đang cập nhật"
    );

    // Nếu trạng thái chỉ hiển thị header rows và dòng không phải header, hoặc tất cả các ô đều rỗng/"Đang cập nhật", ẩn dòng
    if ((showOnlyHeaderRows && !isHeader) || isEmptyOrUpdating) {
      return null;
    }

    return (
      <tr>
        <th>{label}</th>
        {values.map((value, index) => {
          const CellTag = isHeader ? "th" : "td"; // Dùng th cho header, td cho các hàng khác
          return (
            <CellTag
              key={index}
              className={isHeader ? "express" : undefined} // Thêm class "express" nếu là header
            >
              {value === "true" || value === "có" || value === "CÓ" ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", fontSize: "18px" }}
                />
              ) : value === "false" || value === "không có" || value === "" ? (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", fontSize: "18px" }}
                />
              ) : value ? (
                value
              ) : (
                ""
              )}
            </CellTag>
          );
        })}
      </tr>
    );
  };

  return (
    <div className="car-compare-detail-overlay" onClick={handleOverlayClick}>
      <div className="car-compare-detail-modal">
        {/* Header cố định */}
        <div className="compare-header-fixed">
          <h3 className="compare-title">Chi tiết so sánh xe</h3>
          <div className="checkbox-controls">
            <label>
              <input
                type="checkbox"
                checked={showOnlyHeaderRows}
                onChange={handleCheckboxChange}
              />
              Chỉ hiển thị các giá trị cần so sánh
            </label>
          </div>
        </div>

        {/* Bảng so sánh */}
        <table className="table table-bordered table-compare">
          <thead>
            <tr style={{ color: "red", background: "#F4F4F4" }}>
              <th>Phiên bản xe</th>
              {carDetails.map((car) => (
                <th key={car.id}>{car.version}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Ảnh</th>
              {carDetails.map((car) => (
                <th className="imageCompare" key={car.id}>
                  <img src={car.imageUrl} alt={car.name} />
                </th>
              ))}
            </tr>

            <tr style={{ color: "red" }}>
              <th>Giá (VND)</th>
              {carDetails.map((car) => (
                <th key={car.id}>{car.price}</th>
              ))}
            </tr>

            <tr>
              <th>Hãng Xe</th>
              {carDetails.map((car) => (
                <td key={car.id}>{car.brand}</td>
              ))}
            </tr>

            <tr>
              <th>Tên Xe</th>
              {carDetails.map((car) => (
                <td key={car.id}>{car.name}</td>
              ))}
            </tr>
            {/* Thông số kỹ thuật */}
            <tr
              style={{
                background: "#343A40",
                color: "white",
                textAlign: "left",
              }}
            >
              <th colSpan={5}>Thông số kỹ thuật</th>
            </tr>
            {/* Động cơ/Hộp số */}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Động cơ/Hộp số</strong>
              </td>
            </tr>
            <FeatureRow
              label="Kiểu động cơ"
              values={carDetails.map((car) => car.kieuDongCo)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Dung tích (cc)"
              values={carDetails.map((car) => car.dungTich)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Công suất máy xăng/dầu (Mã lực)/vòng tua (vòng/phút)"
              values={carDetails.map((car) => car.congSuat)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Mo-men xoắn"
              values={carDetails.map((car) => car.momenXoan)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hộp số"
              values={carDetails.map((car) => car.hopSo)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hệ dẫn động"
              values={carDetails.map((car) => car.heDanDong)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Loại nhiên liệu"
              values={carDetails.map((car) => car.loaiNhienLieu)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Mức tiêu thụ nhiên liệu (lít/100 km)"
              values={carDetails.map((car) => car.mucTieuThuNhienLieu)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/*Kích thước/Trọng lượng*/}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Kích thước/Trọng lượng</strong>
              </td>
            </tr>
            <FeatureRow
              label="Số chỗ"
              values={carDetails.map((car) => car.soCho)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kích thước dài x rộng x cao (mm)"
              values={carDetails.map((car) => car.kichThuoc)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Chiều dài cơ sở (mm)"
              values={carDetails.map((car) => car.chieuDaiCoSo)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Khoảng sáng gầm (mm)"
              values={carDetails.map((car) => car.khoangSangGam)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Bán kính vòng quay (mm)"
              values={carDetails.map((car) => car.banKinhVongQuay)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Thể tích khoang hành lý (lít)"
              values={carDetails.map((car) => car.theTichKhoangHanhLy)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Dung tích bình nhiên liệu (lít)"
              values={carDetails.map((car) => car.dungTichBinhNhienLieu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Trọng lượng bản thân (kg)"
              values={carDetails.map((car) => car.trongLuongBanThan)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Trọng lượng toàn tải (kg)"
              values={carDetails.map((car) => car.trongLuongToanTai)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Lốp, la-zăng"
              values={carDetails.map((car) => car.lop_lazang)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/* Hệ thống treo/phanh */}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Hệ thống treo/phanh</strong>
              </td>
            </tr>
            <FeatureRow
              label="Treo trước"
              values={carDetails.map((car) => car.treoTruoc)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Treo sau"
              values={carDetails.map((car) => car.treoSau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Phanh trước"
              values={carDetails.map((car) => car.phanhTruoc)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Phanh sau"
              values={carDetails.map((car) => car.phanhSau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/* Ngoại thất*/}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Ngoại thất</strong>
              </td>
            </tr>
            <FeatureRow
              label="Đèn phanh trên cao"
              values={carDetails.map((car) => car.denPhanhTrenCao)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Gương chiếu hậu"
              values={carDetails.map((car) => car.guongChieuHau)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Sấy gương chiếu hậu"
              values={carDetails.map((car) => car.sayGuongChieuHau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Gạt mưa tự động"
              values={carDetails.map((car) => car.gatMuaTuDong)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn chiếu xa"
              values={carDetails.map((car) => car.denChieuXa)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn chiếu gần"
              values={carDetails.map((car) => car.denChieuGan)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn ban ngày"
              values={carDetails.map((car) => car.denBanNgay)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn pha tự động bật/tắt"
              values={carDetails.map((car) => car.denPhaTuDongBat_Tat)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn pha tự động xa/gần"
              values={carDetails.map((car) => car.denPhaTuDongXa_Gan)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn pha tự động điều chỉnh góc chiếu"
              values={carDetails.map(
                (car) => car.denPhaTuDongDieuChinhGocChieu
              )}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đèn hậu"
              values={carDetails.map((car) => car.denHau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Ăng ten vây cá"
              values={carDetails.map((car) => car.angTenVayCa)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cốp đóng/mở điện"
              values={carDetails.map((car) => car.copDong_MoDien)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Mở cốp rảnh tay"
              values={carDetails.map((car) => car.moCopRanhTay)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/* Nội thất */}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Nội thất</strong>
              </td>
            </tr>
            <FeatureRow
              label="Chất liệu bọc ghế"
              values={carDetails.map((car) => car.chatLieuBocGhe)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Điều chỉnh ghế lái"
              values={carDetails.map((car) => car.dieuChinhGheLai)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Nhớ vị trí ghế lái"
              values={carDetails.map((car) => car.nhoViTriGheLai)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Massage ghế lái"
              values={carDetails.map((car) => car.massageGheLai)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Điều chỉnh ghế phụ"
              values={carDetails.map((car) => car.dieuChinhGhePhu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Massage ghế phụ"
              values={carDetails.map((car) => car.massageGhePhu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Thông gió ghế lái"
              values={carDetails.map((car) => car.thongGioGheLai)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Thông gió ghế phụ"
              values={carDetails.map((car) => car.thongGioGhePhu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Sưởi ấm ghế lái"
              values={carDetails.map((car) => car.suoiAmGheLai)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Sưởi ấm ghế phụ"
              values={carDetails.map((car) => car.suoiAmGhePhu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Bảng đồng hồ tài xế"
              values={carDetails.map((car) => car.bangDongHoTaiXe)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Nút bấm tích hợp trên vô lăng"
              values={carDetails.map((car) => car.nutBamTichHopTrenVolang)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Chất liệu bọc vô lăng"
              values={carDetails.map((car) => car.chatLieuBocVoLang)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Chìa khóa thông minh"
              values={carDetails.map((car) => car.chiaKhoaThongMinh)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Khởi động nút bấm"
              values={carDetails.map((car) => car.khoiDongNutBam)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Điều hòa"
              values={carDetails.map((car) => car.dieuHoa)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cửa gió hàng ghế sau"
              values={carDetails.map((car) => car.cuaGioHangGheSau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cửa kính một chạm"
              values={carDetails.map((car) => car.cuaKinhMotCham)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cửa sổ trời"
              values={carDetails.map((car) => car.cuaSoTroi)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cửa sổ trời toàn cảnh"
              values={carDetails.map((car) => car.cuaSoTroiToanCanh)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Gương chiếu hậu trong xe chống chói tự động"
              values={carDetails.map(
                (car) => car.guongChieuHauTrongXeChongChoiTuDong
              )}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Tựa tay hàng ghế trước"
              values={carDetails.map((car) => car.tuaTayHangGheTruoc)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Tựa tay hàng ghế sau"
              values={carDetails.map((car) => car.tuaTayHangGheSau)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Màn hình giải trí"
              values={carDetails.map((car) => car.manHinhGiaiTri)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kết nối Apple CarPlay"
              values={carDetails.map((car) => car.ketNoiAppleCarPlay)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kết nối Android Auto"
              values={carDetails.map((car) => car.ketNoiAndroidAuto)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Ra lệnh giọng nói"
              values={carDetails.map((car) => car.raLenhGiongNoi)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Đàm thoại rảnh tay"
              values={carDetails.map((car) => car.damThoaiRanhTay)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hệ thống loa"
              values={carDetails.map((car) => car.heThongLoa)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Phát Wi-Fi"
              values={carDetails.map((car) => car.phatWifi)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kết nối AUX"
              values={carDetails.map((car) => car.ketNoiAUX)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kết nối USB"
              values={carDetails.map((car) => car.ketNoiUSB)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kết nối Bluetooth"
              values={carDetails.map((car) => car.ketNoiBluetooth)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Radio AM/FM"
              values={carDetails.map((car) => car.radioAM_FM)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Sạc không dây"
              values={carDetails.map((car) => car.sacKhongDay)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/*  Hỗ trợ vận hành */}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Hỗ trợ vận hành</strong>
              </td>
            </tr>
            <FeatureRow
              label="Trợ lực vô lăng"
              values={carDetails.map((car) => car.troLucVoLang)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Nhiều chế độ lái"
              values={carDetails.map((car) => car.nhieuCheDoLai)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Lẫy chuyển số trên vô lăng"
              values={carDetails.map((car) => car.layChuyenSoTrenVoLang)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kiểm soát gia tốc"
              values={carDetails.map((car) => car.kiemSoatGiaToc)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Phanh tay điện tử"
              values={carDetails.map((car) => car.phanhTayDienTu)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Giữ phanh tự động"
              values={carDetails.map((car) => car.giuPhanhTuDong)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            {/*  Công nghệ an toàn */}
            <tr className="MucSoSanh">
              <td colSpan={5}>
                <strong>Công nghệ an toàn</strong>
              </td>
            </tr>
            <FeatureRow
              label="Kiểm soát hành trình"
              values={carDetails.map((car) => car.kiemSoatHanhTrinh)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kiểm soát hành trình thích ứng"
              values={carDetails.map((car) => car.kiemSoatHanhTrinhThichUng)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cảnh báo phương tiện cắt ngang khi lùi"
              values={carDetails.map(
                (car) => car.canhBaoPhuongTienCatNgangKhiLui
              )}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cảnh báo tài xế buồn ngủ"
              values={carDetails.map((car) => car.canhBaoTaiXeBuonNgu)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Móc ghế an toàn cho trẻ em ISOFIX"
              values={carDetails.map((car) => car.mocGheAnToanChoTreEmIsofix)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hỗ trợ đỗ đèo"
              values={carDetails.map((car) => car.hoTroDoDeo)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cảnh báo điểm mù"
              values={carDetails.map((car) => car.canhBaoDiemMu)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cảm biến lùi"
              values={carDetails.map((car) => car.camBienLui)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Camera lùi"
              values={carDetails.map((car) => car.cameraLui)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Camera 360"
              values={carDetails.map((car) => car.camera360)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Camera quan sát làn đường"
              values={carDetails.map((car) => car.cameraQuanSatLanDuong)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cảnh báo chệch làn đường"
              values={carDetails.map((car) => car.canhBaoChechLanDuong)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hỗ trợ giữ làn"
              values={carDetails.map((car) => car.hoTroGiuLan)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hỗ trợ phanh tự động giảm thiểu va chạm"
              values={carDetails.map(
                (car) => car.hoTroPhanhTuDongGiamThieuVaCham
              )}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Phân phối lực phanh điện tử"
              values={carDetails.map((car) => car.phanPhoiLucPhanhDienTu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Cân bằng điện tử"
              values={carDetails.map((car) => car.canBangDienTu)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Kiểm soát lực kéo"
              values={carDetails.map((car) => car.kiemSoatLucKeo)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hỗ trợ khởi hành ngang dốc"
              values={carDetails.map((car) => car.hoTroKhoiHanhNgangDoc)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Số túi khí"
              values={carDetails.map((car) => car.soTuiKhi)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Chống bó cứng phanh"
              values={carDetails.map((car) => car.chongBoCungPhanh)}
              isHeader={true}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
            <FeatureRow
              label="Hỗ trợ lực phanh khẩn cấp"
              values={carDetails.map((car) => car.hoTroLucPhanhKhanCap)}
              isHeader={false}
              showOnlyHeaderRows={showOnlyHeaderRows}
            />
          </tbody>
        </table>

        <button className="btn btn-secondary stylebtn" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
    // </div>
  );
};

export default CarCompareDetailModal;
