import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames'; // Import classnames
import '../styles/CarDetail.css';

const CarDetailModal = ({ open, onClose, carDetail }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [mainImage, setMainImage] = useState("");

  if (!carDetail) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>Không tìm thấy thông tin chi tiết xe.</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Đóng</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const toggleSection = (section) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section], // Toggle expanded state
    }));
  };

  const handleThumbnailClick = (url) => {
    setMainImage(url); // Cập nhật ảnh lớn khi nhấn vào thumbnail
  };

  const FeatureRow = ({ name, value }) => (
    <tr>
      <th>{name}</th>
      <td>
        {value === "true" || value === "có" || value === "CÓ"? (
          <FontAwesomeIcon icon={faCheck} style={{ color: "green", fontSize: "18px" }} />
        ) : value === "false" || value === "không có" ? (
          <FontAwesomeIcon icon={faTimes} style={{ color: "red", fontSize: "18px" }} />
        ) : value ? value : "Đang cập nhật"}
      </td>
    </tr>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Chi tiết xe</DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-12">
            <div className="car-info shadow p-3 mb-5 bg-white rounded">
              <div className="row">
                <div className="col-12">
                  <h2 className="car-title">
                    {carDetail.name} - {carDetail.version}
                  </h2>
                </div>
              </div>
              <div className="car-price-container">
                <p className="car-price">
                  Giá bán: <span className="price">{carDetail.price} VND</span>
                </p>
              </div>
              <div className="car-segment-container">
                <p className="car-segment">
                  Phân khúc:{" "}
                  <span className="segment">{carDetail.vehicle_segment}</span>
                </p>
              </div>
              <div className="car-segment-container">
                <p className="car-segment">
                  Thương hiệu:{" "}
                  <span className="segment">{carDetail.brand}</span>
                </p>
              </div>
            </div>

            <div
              className="gallery-car shadow p-3 mb-5 bg-white rounded"
              id="tongquan"
            >
              <div className="thumb-big">
                <a href="javascript:;" className="thumb_img" data-id="0">
                  <img
                    src={carDetail.imageUrl?.[0]}
                    alt={`Hình ảnh của ${carDetail.name}`}
                    className="main-image"
                  />
                </a>
              </div>
              <div className="gallery-thumbs">
                {carDetail.imageUrl?.slice(1).map((url, index) => (
                  <a
                    href="javascript:;"
                    className="thumb_img"
                    key={index}
                    data-id={index + 1}
                    onClick={() => handleThumbnailClick(url)}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="car-description shadow p-3 mb-5 bg-white rounded">
              <h3>Mô tả và Đánh giá</h3>
              <p>{carDetail.description || "Thông tin đang cập nhật..."}</p>
            </div>

            <div className="car-specs shadow p-3 mb-5 bg-white rounded">
              <h3>Thông số kỹ thuật</h3>
              <div>
                {/* Động cơ/hộp số */}
                <div
                  className={classNames("card", "specs-section", {
                    expanded: expandedSections["dongCoHopSo"],
                  })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("dongCoHopSo")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Động cơ/hộp số</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={
                          expandedSections["dongCoHopSo"] ? faMinus : faPlus
                        }
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["dongCoHopSo"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow
                          name="Kiểu động cơ"
                          value={carDetail.kieuDongCo}
                        />
                        <FeatureRow
                          name="Dung tích (cc)"
                          value={carDetail.dungTich}
                        />
                        <FeatureRow
                          name="Công suất (Mã lực/vòng/phút)"
                          value={carDetail.congSuat}
                        />
                        <FeatureRow
                          name="Mô-men xoắn (Nm/vòng/phút)"
                          value={carDetail.momenXoan}
                        />
                        <FeatureRow name="Hộp số" value={carDetail.hopso} />
                        <FeatureRow
                          name="Hệ dẫn động"
                          value={carDetail.heDanDong}
                        />
                        <FeatureRow
                          name="Loại nhiên liệu"
                          value={carDetail.loaiNhienLieu}
                        />
                        <FeatureRow
                          name="Mức tiêu thụ nhiên liệu"
                          value={carDetail.mucTieuThuNhienLieu}
                        />
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Kích thước/trọng lượng */}
                <div
                  className={classNames("card", "specs-section", {
                    expanded: expandedSections["kichThuocTrongLuong"],
                  })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("kichThuocTrongLuong")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Kích thước/trọng lượng</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={
                          expandedSections["kichThuocTrongLuong"]
                            ? faMinus
                            : faPlus
                        }
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["kichThuocTrongLuong"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow name="Số chỗ" value={carDetail.soCho} />
                        <FeatureRow
                          name="Kích thước (Dài x Rộng x Cao)"
                          value={carDetail.kichThuoc}
                        />
                        <FeatureRow
                          name="Chiều dài cơ sở (mm)"
                          value={carDetail.chieuDaiCoSo}
                        />
                        <FeatureRow
                          name="Khoảng sáng gầm (mm)"
                          value={carDetail.khoangSangGam}
                        />
                        <FeatureRow
                          name="Bán kính vòng quay (m)"
                          value={carDetail.banKinhVongQuay}
                        />
                        <FeatureRow
                          name="Thể tích khoang hành lý (L)"
                          value={carDetail.theTichKhoangHanhLy}
                        />
                        <FeatureRow
                          name="Dung tích bình nhiên liệu (L)"
                          value={carDetail.dungTichBinhNhienLieu}
                        />
                        <FeatureRow
                          name="Trọng lượng bản thân (kg)"
                          value={carDetail.trongLuongBanThan}
                        />
                        <FeatureRow
                          name="Trọng lượng toàn tải (kg)"
                          value={carDetail.trongLuongToanTai}
                        />
                        <FeatureRow
                          name="Lốp/Lazang"
                          value={carDetail.lop_lazang}
                        />
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Hệ thống treo/phanh */}
                <div
                  className={classNames("card", "specs-section", {
                    expanded: expandedSections["heThongTreoPhanh"],
                  })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("heThongTreoPhanh")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Hệ thống treo/phanh</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={
                          expandedSections["heThongTreoPhanh"]
                            ? faMinus
                            : faPlus
                        }
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["heThongTreoPhanh"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow
                          name="Treo trước"
                          value={carDetail.treoTruoc}
                        />
                        <FeatureRow name="Treo sau" value={carDetail.treoSau} />
                        <FeatureRow
                          name="Phanh trước"
                          value={carDetail.phanhTruoc}
                        />
                        <FeatureRow
                          name="Phanh sau"
                          value={carDetail.phanhSau}
                        />
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Ngoại thất (Exterior) */}
                <div
                  className={classNames('card', 'specs-section', { 'expanded': expandedSections["ngoaiThat"] })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("ngoaiThat")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Ngoại thất</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={expandedSections["ngoaiThat"] ? faMinus : faPlus}
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["ngoaiThat"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow name="Đèn phanh trên cao" value={carDetail.denPhanhTrenCao} />
                        <FeatureRow name="Gương chiếu hậu" value={carDetail.guongChieuHau} />
                        <FeatureRow name="Sấy gương chiếu hậu" value={carDetail.sayGuongChieuHau} />
                        <FeatureRow name="Gạt mưa tự động" value={carDetail.gatMuaTuDong} />
                        <FeatureRow name="Đèn chiếu xa" value={carDetail.denChieuXa} />
                        <FeatureRow name="Đèn chiếu gần" value={carDetail.denChieuGan} />
                        <FeatureRow name="Đèn ban ngày" value={carDetail.denBanNgay} />
                        <FeatureRow name="Đèn pha tự động bật/tắt" value={carDetail.denPhaTuDongBat_Tat} />
                        <FeatureRow name="Đèn pha tự động xa/gần" value={carDetail.denPhaTuDongXa_Gan} />
                        <FeatureRow name="Đèn pha tự động điều chỉnh góc chiếu" value={carDetail.denPhaTuDongDieuChinhGocChieu} />
                        <FeatureRow name="Đèn hậu" value={carDetail.denHau} />
                        <FeatureRow name="Ăng-ten vây cá" value={carDetail.angTenVayCa} />
                        <FeatureRow name="Cốp đóng/mở điện" value={carDetail.copDong_MoDien} />
                        <FeatureRow name="Mở cốp rảnh tay" value={carDetail.moCopRanhTay} />
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Nội thất */}
                <div
                  className={classNames('card', 'specs-section', { 'expanded': expandedSections["noiThat"] })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("noiThat")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Nội thất</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={expandedSections["noiThat"] ? faMinus : faPlus}
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["noiThat"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow name="Chất liệu bọc ghế" value={carDetail.chatLieuBocGhe} />
                        <FeatureRow name="Điều chỉnh ghế lái" value={carDetail.dieuChinhGheLai} />
                        <FeatureRow name="Nhớ vị trí ghế lái" value={carDetail.nhoViTriGheLai} />
                        <FeatureRow name="Massage ghế lái" value={carDetail.massageGheLai} />
                        <FeatureRow name="Điều chỉnh ghế phụ" value={carDetail.dieuChinhGhePhu} />
                        <FeatureRow name="Massage ghế phụ" value={carDetail.massageGhePhu} />
                        <FeatureRow name="Thông gió ghế lái" value={carDetail.thongGioGheLai} />
                        <FeatureRow name="Thông gió ghế phụ" value={carDetail.thongGioGhePhu} />
                        <FeatureRow name="Sưởi ấm ghế lái" value={carDetail.suoiAmGheLai} />
                        <FeatureRow name="Sưởi ấm ghế phụ" value={carDetail.suoiAmGhePhu} />
                        <FeatureRow name="Bảng đồng hồ tài xế" value={carDetail.bangDongHoTaiXe} />
                        <FeatureRow name="Nút bấm tích hợp trên vô lăng" value={carDetail.nutBamTichHopTrenVolang} />
                        <FeatureRow name="Chất liệu bọc vô lăng" value={carDetail.chatLieuBocVoLang} />
                        <FeatureRow name="Chìa khóa thông minh" value={carDetail.chiaKhoaThongMinh} />
                        <FeatureRow name="Khởi động nút bấm" value={carDetail.khoiDongNutBam} />
                        <FeatureRow name="Điều hòa" value={carDetail.dieuHoa} />
                        <FeatureRow name="Cửa gió hàng ghế sau" value={carDetail.cuaGioHangGheSau} />
                        <FeatureRow name="Cửa kính một chạm" value={carDetail.cuaKinhMotCham} />
                        <FeatureRow name="Cửa sổ trời" value={carDetail.cuaSoTroi} />
                        <FeatureRow name="Cửa sổ trời toàn cảnh" value={carDetail.cuaSoTroiToanCanh} />
                        <FeatureRow name="Gương chiếu hậu trong xe chống chói tự động" value={carDetail.guongChieuHauTrongXeChongChoiTuDong} />
                        <FeatureRow name="Tựa tay hàng ghế trước" value={carDetail.tuaTayHangGheTruoc} />
                        <FeatureRow name="Tựa tay hàng ghế sau" value={carDetail.tuaTayHangGheSau} />
                        <FeatureRow name="Màn hình giải trí" value={carDetail.manHinhGiaiTri} />
                        <FeatureRow name="Kết nối Apple CarPlay" value={carDetail.ketNoiAppleCarPlay} />
                        <FeatureRow name="Kết nối Android Auto" value={carDetail.ketNoiAndroidAuto} />
                        <FeatureRow name="Ra lệnh giọng nói" value={carDetail.raLenhGiongNoi} />
                        <FeatureRow name="Đàm thoại rảnh tay" value={carDetail.damThoaiRanhTay} />
                        <FeatureRow name="Hệ thống loa" value={carDetail.heThongLoa} />
                        <FeatureRow name="Phát WiFi" value={carDetail.phatWifi} />
                        <FeatureRow name="Kết nối AUX" value={carDetail.ketNoiAUX} />
                        <FeatureRow name="Kết nối USB" value={carDetail.ketNoiUSB} />
                        <FeatureRow name="Kết nối Bluetooth" value={carDetail.ketNoiBluetooth} />
                        <FeatureRow name="Radio AM/FM" value={carDetail.radioAM_FM} />
                        <FeatureRow name="Sạc không dây" value={carDetail.sacKhongDay} />
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Hỗ trợ vận hành */}
                <div
                  className={classNames('card', 'specs-section', { 'expanded': expandedSections["hoTroVanHanh"] })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("hoTroVanHanh")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Hỗ trợ vận hành</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={expandedSections["hoTroVanHanh"] ? faMinus : faPlus}
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["hoTroVanHanh"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow name="Trợ lực vô lăng" value={carDetail.troLucVoLang} />
                        <FeatureRow name="Nhiều chế độ lái" value={carDetail.nhieuCheDoLai} />
                        <FeatureRow name="Lẫy chuyển số trên vô lăng" value={carDetail.layChuyenSoTrenVoLang} />
                        <FeatureRow name="Kiểm soát gia tốc" value={carDetail.kiemSoatGiaToc} />
                        <FeatureRow name="Phanh tay điện tử" value={carDetail.phanhTayDienTu} />
                        <FeatureRow name="Giữ phanh tự động" value={carDetail.giuPhanhTuDong} />
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Công nghệ an toàn */}
                <div
                  className={classNames('card', 'specs-section', { 'expanded': expandedSections["congNgheAnToan"] })}
                >
                  <div
                    className="specs-header"
                    onClick={() => toggleSection("congNgheAnToan")}
                    style={{ cursor: "pointer" }}
                  >
                    <span>Công nghệ an toàn</span>
                    <span className="toggle-sign">
                      <FontAwesomeIcon
                        icon={expandedSections["congNgheAnToan"] ? faMinus : faPlus}
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                  </div>
                  {expandedSections["congNgheAnToan"] && (
                    <table className="table specs-table">
                      <tbody>
                        <FeatureRow name="Kiểm soát hành trình" value={carDetail.kiemSoatHanhTrinh} />
                        <FeatureRow name="Kiểm soát hành trình thích ứng" value={carDetail.kiemSoatHanhTrinhThichUng} />
                        <FeatureRow name="Cảnh báo phương tiện cắt ngang khi lùi" value={carDetail.canhBaoPhuongTienCatNgangKhiLui} />
                        <FeatureRow name="Cảnh báo tài xế buồn ngủ" value={carDetail.canhBaoTaiXeBuonNgu} />
                        <FeatureRow name="Móc ghế an toàn cho trẻ em Isofix" value={carDetail.mocGheAnToanChoTreEmIsofix} />
                        <FeatureRow name="Hỗ trợ đỗ đèo" value={carDetail.hoTroDoDeo} />
                        <FeatureRow name="Cảnh báo điểm mù" value={carDetail.canhBaoDiemMu} />
                        <FeatureRow name="Cảm biến lùi" value={carDetail.camBienLui} />
                        <FeatureRow name="Camera lùi" value={carDetail.cameraLui} />
                        <FeatureRow name="Camera 360" value={carDetail.camera360} />
                        <FeatureRow name="Camera quan sát làn đường" value={carDetail.cameraQuanSatLanDuong} />
                        <FeatureRow name="Cảnh báo chệch làn đường" value={carDetail.canhBaoChechLanDuong} />
                        <FeatureRow name="Hỗ trợ giữ làn" value={carDetail.hoTroGiuLan} />
                        <FeatureRow name="Hỗ trợ phanh tự động giảm thiểu va chạm" value={carDetail.hoTroPhanhTuDongGiamThieuVaCham} />
                        <FeatureRow name="Phân phối lực phanh điện tử" value={carDetail.phanPhoiLucPhanhDienTu} />
                        <FeatureRow name="Cân bằng điện tử" value={carDetail.canBangDienTu} />
                        <FeatureRow name="Kiểm soát lực kéo" value={carDetail.kiemSoatLucKeo} />
                        <FeatureRow name="Hỗ trợ khởi hành ngang dốc" value={carDetail.hoTroKhoiHanhNgangDoc} />
                        <FeatureRow name="Số túi khí" value={carDetail.soTuiKhi} />
                        <FeatureRow name="Chống bó cứng phanh" value={carDetail.chongBoCungPhanh} />
                        <FeatureRow name="Hỗ trợ lực phanh khẩn cấp" value={carDetail.hoTroLucPhanhKhanCap} />
                      </tbody>
                    </table>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarDetailModal;
