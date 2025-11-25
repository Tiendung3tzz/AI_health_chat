import { useState } from "react";

export default function Content() {
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]);

  const sendAnswerAPI = async (message) => {
    try {
      const response = await fetch("http://localhost:5000/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message: message}),
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { type: "bot", content: data.answer }
      ]);
      console.log("Response from API:", data);
      } catch (error) {
    console.log("Error:", error);
    }
  }
  const handleSend = () =>{
    const trimmedMessage = message.trim();
    if (trimmedMessage === "") return;
    setMessages((prev) =>[
      ...prev,
      { type: "user", content: trimmedMessage }
    ])
    sendAnswerAPI(trimmedMessage);
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      
    }
  };

  return (
    <div className="content-container">
      <div className="message"> 
        <div className="user-message">
            <p>Giúp React chạy code sau khi render — những công việc không phải render UI.
                Nó là công cụ chính để xử lý logic side effects.</p>
        </div>
        <div className="bot-message">
            <p>Giúp React chạy code sau khi render — những công việc không phải render UI.
                Nó là công cụ chính để xử lý logic side effects.</p>
        </div>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={msg.type === "user" ? "user-message" : "bot-message"}>
              <p>{msg.content}</p>
            </div>
          ))}
      </div>
      <div className="input-container">
            <img src="/src/assets/add.png" className="item-input" alt="add" />
            <textarea 
            className="text-input" 
            placeholder="Are you question..." 
            required 
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={handleKeyDown}
            />
            <img src="/src/assets/login.png" className="item-input" id="enter" alt="enter" onClick={handleSend}/>
        </div>
    </div>
    
  );
}