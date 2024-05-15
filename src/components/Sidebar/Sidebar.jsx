import React, { useState, useContext } from "react";
import "./Sidebar.css";

import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt, newChat } =
    useContext(Context);

  const promptLoad = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            onClick={() => setCollapsed(!collapsed)}
            className="menu"
            src={assets.menu_icon}
            alt="Menu Icon"
          />
          <div className="new-chat" onClick={() => newChat()}>
            <img src={assets.plus_icon} alt="New Chat Icon" />
            {!collapsed ? <p>New Chat</p> : null}
          </div>
          {!collapsed ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {previousPrompts.map((prompt, index) => (
                <>
                  <div
                    onClick={() => promptLoad(prompt)}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="Message Icon" />
                    <p>{prompt.slice(0, 18)} ...</p>
                  </div>
                </>
              ))}
            </div>
          ) : null}
        </div>
        {/* <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Questions Icon" />
            {!collapsed ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history Icon" />
            {!collapsed ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Setting Icon" />
            {!collapsed ? <p>Settings</p> : null}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
