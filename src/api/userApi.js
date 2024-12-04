import axios from "axios";

const API_URL = "https://localhost:3000/api/users";

/**
 * Hàm kiểm tra xác thực người dùng và lấy thông tin chi tiết
 * @returns {Promise<Object|null>} Trả về thông tin người dùng nếu xác thực thành công, ngược lại trả về null
 */
const checkAuth = async () => {
  try {
    // Gửi yêu cầu để kiểm tra xác thực người dùng
    const authResponse = await axios.get(`${API_URL}/checkAuth`, {
      withCredentials: true, // Gửi cookie để xác thực token
    });

    // Kiểm tra phản hồi từ API xác thực
    if (authResponse.status === 200 && authResponse.data?.user) {
      const { user } = authResponse.data; // Lấy thông tin người dùng từ phản hồi xác thực

      console.log("Xác thực thành công:", user);

      // Lấy thông tin chi tiết người dùng từ API profile
      const profileResponse = await axios.get(`${API_URL}/profile`, {
        withCredentials: true, // Gửi cookie để xác thực token
      });

      // Kiểm tra phản hồi từ API lấy thông tin chi tiết người dùng
      if (profileResponse.status === 200 && profileResponse.data?.data) {
        const userDetails = profileResponse.data.data;
        console.log("Thông tin người dùng:", userDetails);
        return { ...user, ...userDetails }; // Kết hợp thông tin xác thực và thông tin chi tiết người dùng
      } else {
        console.error("Không thể lấy thông tin người dùng");
      }
    }
  } catch (error) {
    // Xử lý lỗi
    console.error(
      "Lỗi xác thực hoặc lấy thông tin người dùng:",
      error.response?.data?.message || error.message || "Không xác định"
    );
  }
  return null; // Trả về null nếu xác thực thất bại hoặc có lỗi
};

export default checkAuth;
