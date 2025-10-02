const User = require("../model/model_user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký tài khoản mới
exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar, phone, address, sex } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      avatar:
        avatar ||
        "https://i.pinimg.com/736x/bc/43/98/bc439871417621836a0eeea768d60944.jpg",
      phone: phone || "",
      address: address || "Chưa cập nhật",
      sex: sex || "Nam",
    });

    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Logout(Đăng xuất)
exports.logout = async (req, res) => {
  // Chỉ trả về thông báo, client sẽ tự xóa token
  res.json({ message: "Đăng xuất thành công" });
};
