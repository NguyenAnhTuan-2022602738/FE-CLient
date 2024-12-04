import React, { useState } from "react";
import SelectCarModal from "./SelectCarModal";
import CarCompareDetailModal from "./CarCompareDetailModal"; // Modal để hiển thị chi tiết xe
import '../styles/CompareModal.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const CompareModal = ({ selectedCars, onRemoveCar, onAddCar }) => {
  const maxCars = 4;
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);  // Thêm state để điều khiển modal chi tiết
  const [carDetails, setCarDetails] = useState([]); // Lưu thông tin chi tiết các xe

  const handleOpenSelectModal = () => {
    if (selectedCars.length < maxCars) {
      setShowSelectModal(true);
    } else {
      alert("Bạn chỉ được phép chọn tối đa 4 xe.");
    }
  };

  const handleCloseSelectModal = () => {
    setShowSelectModal(false);
  };

  // Hàm xử lý khi click "So sánh"
  const handleCompare = () => {
    const carDetailsFetched = selectedCars.map(car => ({
      id: car._id,
      brand: car.brand,
      name: car.name,
      price: car.price,
      engine: car.engine,
      version: car.version,
      imageUrl: car.imageUrl[0],
      //Thông số kỹ thuật
      //Động cơ/hộp số
      kieuDongCo: car.kieuDongCo,
      dungTich: car.dungTich,
      congSuat: car.congSuat,
      momenXoan: car.momenXoan,
      hopso: car.hopso,
      heDanDong: car.heDanDong,
      loaiNhienLieu: car.loaiNhienLieu,
      mucTieuThuNhienLieu: car.mucTieuThuNhienLieu,
      // Kích thước/Trọng lượng
      soCho: car.soCho,
      kichThuoc: car.kichThuoc,
      chieuDaiCoSo: car.chieuDaiCoSo,
      khoangSangGam: car.khoangSangGam,
      banKinhVongQuay: car.banKinhVongQuay,
      theTichKhoangHanhLy: car.theTichKhoangHanhLy,
      dungTichBinhNhienLieu: car.dungTichBinhNhienLieu,
      trongLuongBanThan: car.trongLuongBanThan,
      trongLuongToanTai: car.trongLuongToanTai,
      lop_lazang: car.lop_lazang,
      // Hệ thống treo/phanh
      treoTruoc: car.treoTruoc,
      treoSau: car.treoSau,
      phanhTruoc: car.phanhTruoc,
      phanhSau: car.phanhSau,
      // Ngoại thất
      denPhanhTrenCao: car.denPhanhTrenCao,
      guongChieuHau: car.guongChieuHau,
      sayGuongChieuHau: car.sayGuongChieuHau,
      gatMuaTuDong: car.gatMuaTuDong,
      denChieuXa: car.denChieuXa,
      denChieuGan: car.denChieuGan,
      denBanNgay: car.denBanNgay,
      denPhaTuDongBat_Tat: car.denPhaTuDongBat_Tat,
      denPhaTuDongXa_Gan: car.denPhaTuDongXa_Gan,
      denPhaTuDongDieuChinhGocChieu: car.denPhaTuDongDieuChinhGocChieu,
      denHau: car.denHau,
      angTenVayCa: car.angTenVayCa,
      copDong_MoDien: car.copDong_MoDien,
      moCopRanhTay: car.moCopRanhTay,
      // Nội thất
      chatLieuBocGhe: car.chatLieuBocGhe,
      dieuChinhGheLai: car.dieuChinhGheLai,
      nhoViTriGheLai: car.nhoViTriGheLai,
      massageGheLai: car.massageGheLai,
      dieuChinhGhePhu: car.dieuChinhGhePhu,
      massageGhePhu: car.massageGhePhu,
      thongGioGheLai: car.thongGioGheLai,
      thongGioGhePhu: car.thongGioGhePhu,
      suoiAmGheLai: car.suoiAmGheLai,
      suoiAmGhePhu: car.suoiAmGhePhu,
      bangDongHoTaiXe: car.bangDongHoTaiXe,
      nutBamTichHopTrenVolang: car.nutBamTichHopTrenVolang,
      chatLieuBocVoLang: car.chatLieuBocVoLang,
      chiaKhoaThongMinh: car.chiaKhoaThongMinh,
      khoiDongNutBam: car.khoiDongNutBam,
      dieuHoa: car.dieuHoa,
      cuaGioHangGheSau: car.cuaGioHangGheSau,
      cuaKinhMotCham: car.cuaKinhMotCham,
      cuaSoTroi: car.cuaSoTroi,
      cuaSoTroiToanCanh: car.cuaSoTroiToanCanh,
      guongChieuHauTrongXeChongChoiTuDong: car.guongChieuHauTrongXeChongChoiTuDong,
      tuaTayHangGheTruoc: car.tuaTayHangGheTruoc,
      tuaTayHangGheSau: car.tuaTayHangGheSau,
      manHinhGiaiTri: car.manHinhGiaiTri,
      ketNoiAppleCarPlay: car.ketNoiAppleCarPlay,
      ketNoiAndroidAuto: car.ketNoiAndroidAuto,
      raLenhGiongNoi: car.raLenhGiongNoi,
      damThoaiRanhTay: car.damThoaiRanhTay,
      heThongLoa: car.heThongLoa,
      phatWifi: car.phatWifi,
      ketNoiAUX: car.ketNoiAUX,
      ketNoiUSB: car.ketNoiUSB,
      ketNoiBluetooth: car.ketNoiBluetooth,
      radioAM_FM: car.radioAM_FM,
      sacKhongDay: car.sacKhongDay,
      // Hỗ trợ vận hành
      troLucVoLang: car.troLucVoLang,
      nhieuCheDoLai: car.nhieuCheDoLai,
      layChuyenSoTrenVoLang: car.layChuyenSoTrenVoLang,
      kiemSoatGiaToc: car.kiemSoatGiaToc,
      phanhTayDienTu: car.phanhTayDienTu,
      giuPhanhTuDong: car.giuPhanhTuDong,
      // Công nghệ an toàn
      kiemSoatHanhTrinh: car.kiemSoatHanhTrinh,
      kiemSoatHanhTrinhThichUng: car.kiemSoatHanhTrinhThichUng,
      canhBaoPhuongTienCatNgangKhiLui: car.canhBaoPhuongTienCatNgangKhiLui,
      canhBaoTaiXeBuonNgu: car.canhBaoTaiXeBuonNgu,
      mocGheAnToanChoTreEmIsofix: car.mocGheAnToanChoTreEmIsofix,
      hoTroDoDeo: car.hoTroDoDeo,
      canhBaoDiemMu: car.canhBaoDiemMu,
      camBienLui: car.camBienLui,
      cameraLui: car.cameraLui,
      camera360: car.camera360,
      cameraQuanSatLanDuong: car.cameraQuanSatLanDuong,
      canhBaoChechLanDuong: car.canhBaoChechLanDuong,
      hoTroGiuLan: car.hoTroGiuLan,
      hoTroPhanhTuDongGiamThieuVaCham: car.hoTroPhanhTuDongGiamThieuVaCham,
      phanPhoiLucPhanhDienTu: car.phanPhoiLucPhanhDienTu,
      canBangDienTu: car.canBangDienTu,
      kiemSoatLucKeo: car.kiemSoatLucKeo,
      hoTroKhoiHanhNgangDoc: car.hoTroKhoiHanhNgangDoc,
      soTuiKhi: car.soTuiKhi,
      chongBoCungPhanh: car.chongBoCungPhanh,
      hoTroLucPhanhKhanCap: car.hoTroLucPhanhKhanCap
    }));
    
    setCarDetails(carDetailsFetched);
    setShowDetailModal(true);  // Mở modal hiển thị chi tiết
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="compare-modal">
      <h3>
        So sánh xe <small>(Bạn chỉ được phép chọn 4 xe cùng một lúc)</small>
      </h3>
      <div className="compare-grid">
        {Array.from({ length: maxCars }).map((_, index) => (
          <div key={index} className="compare-slot">
            {selectedCars[index] ? (
              <div className="car-item">
                <img src={selectedCars[index].imageUrl[0]} alt={selectedCars[index].name} />
                <p>{selectedCars[index].version}</p>
                <button onClick={() => onRemoveCar(index)}>X</button>
              </div>
            ) : (
              <div className="add-car" onClick={handleOpenSelectModal}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <p>Thêm xe</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleCompare} disabled={selectedCars.length < 2} style={{marginRight: "10px"}}>
        So sánh
      </button>
      <button className="btn btn-danger" onClick={() => onRemoveCar("all")}>Xóa tất cả</button>

      {showSelectModal && (
        <SelectCarModal
          onClose={handleCloseSelectModal}
          onAddCar={onAddCar}
        />
      )}

      {/* Hiển thị modal chi tiết khi nhấn So sánh */}
      {showDetailModal && (
        <CarCompareDetailModal
          carDetails={carDetails}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default CompareModal;
