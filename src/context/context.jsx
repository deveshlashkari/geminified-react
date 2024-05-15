import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResult((prev) => prev + nextWord);
    }, index * 100);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const formatText = (text) => {
    text = text.replace(/^#+\s*/, "");
    // Convert Markdown links to HTML links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert Markdown italic text to HTML italic
    text = text.replace(/_([^_]+)_/g, "<i>$1</i>");

    // Convert Markdown bold text to HTML bold
    text = text.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");

    return text;
  };

  const onSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    let response;
    console.log(prompt);
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newStr = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newStr += responseArray[i];
      } else {
        newStr += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse = newStr.split("*").join("</br>");
    let formattedString = formatText(newResponse);

    let newResponseArray = formattedString.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    result,
    input,
    setInput,
    newChat,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
//
export default ContextProvider;
