import React, { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Xin chào! Tôi là trợ lý y tế AI, tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Nội dung kiến thức nền y tế được thêm vào mỗi prompt
  const contextPrompt = `
Bạn là một trợ lý AI chuyên tư vấn y tế.
Thông tin chuyên ngành bạn cần ghi nhớ để trả lời người dùng:
- Bệnh viện ABC là bệnh viện đa khoa quốc tế tại TP.HCM với đội ngũ bác sĩ nhiều năm kinh nghiệm.
- Y tá hỗ trợ bác sĩ và chăm sóc bệnh nhân, thực hiện theo dõi dấu hiệu sinh tồn, cấp phát thuốc, tiêm truyền.
- Bác sĩ là người chịu trách nhiệm chẩn đoán, kê đơn và điều trị bệnh nhân.
- Bệnh viện có các chuyên khoa: Nội tổng quát, Ngoại khoa, Nhi, Sản, Ung bướu, Tim mạch, Hô hấp, Da liễu.
- Quy trình khám bệnh: Đăng ký → Khám lâm sàng → Làm xét nghiệm/chẩn đoán hình ảnh → Kết luận → Nhận đơn thuốc hoặc nhập viện nếu cần.
- Giờ làm việc: Thứ 2 - Thứ 7 từ 7h30 đến 17h00. Chủ nhật chỉ khám ngoài giờ.
- Có tổng đài đặt lịch khám: 1900 1234 hoặc website: www.benhvienabc.vn
- Bác sĩ Loan chuyên về chỉnh nha
- Bác sĩ Tài chuyên về phòng Phục Hình răng
Hãy sử dụng các thông tin trên để trả lời câu hỏi sau một cách chính xác và dễ hiểu.
`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAcCthqtP0tW2bJUJ6pS7IAixWX9tzhCq4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${contextPrompt}\n\nCâu hỏi của người dùng: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";

      setMessages([...newMessages, { role: "model", content: reply }]);
    } catch (error) {
      console.error("Lỗi:", error);
      setMessages([...newMessages, { role: "model", content: "Đã xảy ra lỗi khi gọi AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Trợ lý AI Y Tế</div>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && <div className="message model"><i>Đang trả lời...</i></div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Nhập câu hỏi về y tế, bệnh viện..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>Gửi</button>
      </div>
    </div>
  );
}

export default ChatBot;
