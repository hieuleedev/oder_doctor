import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../api"; // <-- gọi API
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

function Register({ propNumber }) {
    const [register, setRegister] = useState({
        name: '',
        username: '',
        password: '',
        phonenumber: '',
        age: '',
        role: propNumber ? '' : '3',
        avatar: '',
        avatarFile: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRegister(prev => ({
                    ...prev,
                    avatar: reader.result,     // base64
                    avatarFile: file           // file thực tế
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickRegister = async () => {
        const formData = new FormData();
        formData.append("name", register.name);
        formData.append("username", register.username);
        formData.append("password", register.password);
        formData.append("phonenumber", register.phonenumber);
        formData.append("age", register.age);
        formData.append("role", register.role);
        formData.append("avatar", register.avatar); // base64
        formData.append("file", register.avatarFile); // file
        console.log("formData",formData)
        try {
            const res = await registerUser(formData);
            if (res.data.errcode === 0) {
                toast.success("Đăng ký thành công!");
            } else {
                toast.error("Tài khoản đã tồn tại!");
            }
            setRegister({
                name: '',
                username: '',
                password: '',
                phonenumber: '',
                age: '',
                role: propNumber ? '' : '3',
                avatar: '',
                avatarFile: null
            });
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi đăng ký!");
        }
    };

    return (
        <>
            <div className="Register">
                <div className="Register_content" style={propNumber ? { width: '80%', position: 'relative', bottom: '-50px' } : {}}>
                    <h3 className="Register_text">Đăng ký</h3>
                    <div className="Register_input">
                        <input placeholder="Họ Tên..." value={register.name} onChange={e => setRegister({ ...register, name: e.target.value })} />
                        <input placeholder="Tên đăng nhập..." value={register.username} onChange={e => setRegister({ ...register, username: e.target.value })} required />
                        <input placeholder="Mật khẩu..." value={register.password} onChange={e => setRegister({ ...register, password: e.target.value })} required />
                        <input placeholder="Số điện thoại..." value={register.phonenumber} onChange={e => setRegister({ ...register, phonenumber: e.target.value })} />
                        <input placeholder="Tuổi..." value={register.age} onChange={e => setRegister({ ...register, age: e.target.value })} />
                        <input placeholder="Quyền..." value={register.role} onChange={e => setRegister({ ...register, role: e.target.value })} />
                        <label>Chọn ảnh đại diện:</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="Register_btn">
                        {!propNumber && (
                            <button>
                                <NavLink to="/login" className="navlink">Đăng nhập</NavLink>
                            </button>
                        )}
                        <button onClick={handleClickRegister}>
                            <NavLink className="navlink">{!propNumber ? "Đăng ký" : "Thêm người dùng"}</NavLink>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Register;
