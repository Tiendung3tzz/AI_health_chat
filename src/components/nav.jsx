export default function Nav() {
  return (
    <nav className="navigation">
      <div className="nav-list">
        <img src="/src/assets/add-post.png" className="new-chat" alt="new chat" />
        <hr />
        <img src="/src/assets/messenger.png" className="chat-ai" alt="chat ai" />
        <hr />
        <img src="/src/assets/hospital.png" className="check-health" alt="check health" />
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