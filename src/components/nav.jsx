import { useState } from "react";

export default function Nav() {
  const [disabledHover, setDisabledHover] =  useState(false);

  const handleClick = () => {
    setDisabledHover(prev => !prev);
  }
  return (
    <nav className="navigation">
      <div className="nav-list">
        <div 
          className={`nav-item-1 ${disabledHover ? "nav-item-disabled" : ""}`} 
          onClick={handleClick}
        >
          <img 
            src={disabledHover ? "/src/assets/add-post.png" : "/src/assets/app.png"} 
            alt="new chat" 
          />
        </div>
        <hr />
        <div className="nav-item-2">
          <img src="/src/assets/messenger.png" className="chat-ai" alt="chat ai" />
          <div>Chat AI Health</div>
        </div>
        <hr />
        <div className="nav-item-3">
          <img src="/src/assets/hospital.png" className="check-health" alt="check health" />
          <div>Check health</div>
        </div>    
        <hr />
      </div>
      <div className="nav-text">
        {/* <h5>New chat</h5>
        <h5>Chat AI Health</h5>
        <h5>Check health</h5>
        <hr /> */}
      </div>
    </nav>
  )
}