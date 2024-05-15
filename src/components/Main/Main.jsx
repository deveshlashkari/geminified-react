import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    result,
    setInput,
    input,
    setPreviousPrompts,
  } = useContext(Context);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Geminified</p>
          {/* <img src={assets.profilePicture} alt="" /> */}
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Human!</span>
                </p>
                <p>How can I help you today!</p>
              </div>
              <div className="cards">
                <div
                  className="card"
                  onClick={() => {
                    onSent(
                      "Suggest some beautiful places for summer holidays!"
                    );
                    setPreviousPrompts((prev) => [
                      ...prev,
                      "Suggest some beautiful places for summer holidays!",
                    ]);
                  }}
                >
                  <p>Suggest some beautiful places for summer holidays!</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() => {
                    onSent("How to stay fit!");
                    setPreviousPrompts((prev) => [...prev, "How to stay fit!"]);
                  }}
                >
                  <p>How to stay fit!</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() => {
                    onSent(
                      "I want to learn JavaScript and React. How to start?"
                    );

                    setPreviousPrompts((prev) => [
                      ...prev,
                      "I want to learn JavaScript and React. How to start?",
                    ]);
                  }}
                >
                  <p>I want to learn JavaScript and React. How to start?</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div
                  className="card"
                  onClick={() => {
                    onSent("How to use TextField in Material UI version 5?");
                    setPreviousPrompts((prev) => [
                      ...prev,
                      "How to use TextField in Material UI version 5?",
                    ]);
                  }}
                >
                  <p>How to use TextField in Material UI version 5?</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="result">
                <div className="result-title">
                  <img src={assets.profilePicture} alt="" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <>
                      <p dangerouslySetInnerHTML={{ __html: result }}></p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(event) => setInput(event.target.value)}
                type="text"
                placeholder="Message Gemini ..."
                value={input}
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input ? (
                  <img
                    className="send-icon"
                    onClick={() => onSent()}
                    src={assets.send_icon}
                    alt=""
                  />
                ) : null}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display incaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
