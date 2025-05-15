import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

function Footer() {
    return (
        <>
            <div id="footer">
                <div className="footer container">
                    <div className="footer_section">
                        <h3>Liên hệ</h3>
                        <p><FontAwesomeIcon icon={faPhone} /> 0838.300.666</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> support@yourclinic.com</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Nguyễn Văn Cừ, Q.5, TP.HCM</p>
                    </div>

                    <div className="footer_section">
                        <h3>Thời gian hoạt động</h3>
                        <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                        <p>Thứ 7: 8:00 - 12:00</p>
                        <p>Chủ Nhật: Nghỉ</p>
                    </div>

                    <div className="footer_section">
                        <h3>Mạng xã hội</h3>
                        <p><FontAwesomeIcon icon={faFacebook} /> Facebook</p>
                        <p><FontAwesomeIcon icon={faInstagram} /> Instagram</p>
                        <p><FontAwesomeIcon icon={faTwitter} /> Twitter</p>
                    </div>

                    <div className="footer_section">
                        <h3>Chăm sóc khách hàng</h3>
                        <p>Hướng dẫn đặt lịch</p>
                        <p>Câu hỏi thường gặp</p>
                        <p>Chính sách bảo mật</p>
                    </div>
                </div>

                <div className="footer_bottom">
                    <p>&copy; Hồng Loan. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
