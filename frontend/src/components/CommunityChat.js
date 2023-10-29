import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:5000";
const API_BASE_URL = "http://localhost:5000/api";
const socket = io(`${BASE_URL}`);

const Chat = () => {
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/user/${JSON.parse(localStorage.getItem("user"))._id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setUserId(result._id);
        setUserName(result.name);
      });
  }, []);

  const sendMessage = () => {
    const senderId = JSON.parse(localStorage.getItem("user"))._id;

    socket.emit("message", {
      message: inputValue,
      sender_name: username,
      sender_id: senderId,

      createdAt: new Date().toISOString(),
    });

    fetch(`${API_BASE_URL}/save-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputValue,
        sender_name: username,
        sender_id: senderId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error saving message:", error);
      });

    setInputValue("");
  };

  return (
    <div>
      {messages.map((message, index) => (
        <>
          {message.sender_id === userid ? (
            <>
              <div>
                <p key={index}>
                  <p>{message.sender_name} </p>

                  <p> {message.message} </p>
                  <p>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </p>
              </div>
            </>
          ) : (
            <>
              <p key={index}>
                <p> {message.sender_name} </p>
                <p> {message.message}</p>
                <p>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </p>
            </>
          )}
        </>
      ))}

      <div>
        <input
          placeholder="Type your message here.."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={sendMessage} id="sendbutton">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
