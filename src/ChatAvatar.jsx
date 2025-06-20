// ChatAvatar.js
import React, { useState } from 'react';
import LipSyncAvatar from './LipSyncAvatar';

function ChatAvatar() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Append user's message to chat history.
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);

    // Send the message to the Flask backend.
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    // Append AI response to chat history.
    const updatedHistory = [
      ...newHistory,
      { sender: 'ai', text: data.response, audio: data.audio_url },
    ];
    setChatHistory(updatedHistory);
    // Set the current audio URL for LipSyncAvatar.
    setCurrentAudio(data.audio_url);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      {/* Video call–style interface */}
      <div style={styles.videoContainer}>
        {/* For a realistic video call, you can embed a live video using WebRTC.
            Here we use a video element with a background video. */}
        <video autoPlay loop muted style={styles.videoBackground}>
          <source src="/background_video.mp4" type="video/mp4" />
        </video>
        <div style={styles.overlay}>
          {/* Display the avatar with real-time lip sync for the latest AI message */}
          {currentAudio && <LipSyncAvatar audioUrl={currentAudio} />}
          {/* Display AI chat bubble */}
          <div style={styles.chatBubble}>
            {chatHistory
              .filter(msg => msg.sender === 'ai')
              .map((msg, idx) => (
                <p key={idx}>{msg.text}</p>
              ))}
          </div>
        </div>
      </div>

      {/* Chat input area */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>

      {/* Optionally, display user chat history */}
      <div style={styles.userChat}>
        {chatHistory
          .filter(msg => msg.sender === 'user')
          .map((msg, idx) => (
            <p key={idx} style={styles.userMsg}>{msg.text}</p>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  videoContainer: {
    position: 'relative',
    width: '400px',
    height: '600px',
    margin: '0 auto',
    borderRadius: '10px',
    overflow: 'hidden',
    background: '#000',
  },
  videoBackground: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '20px',
  },
  chatBubble: {
    background: 'rgba(255,255,255,0.8)',
    borderRadius: '10px',
    padding: '10px',
    maxWidth: '90%',
    textAlign: 'left',
    marginBottom: '10px',
  },
  inputArea: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    width: '300px',
    borderRadius: '5px 0 0 5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  userChat: {
    marginTop: '20px',
    maxWidth: '400px',
    margin: '20px auto 0 auto',
    textAlign: 'left',
    background: '#f1f1f1',
    padding: '10px',
    borderRadius: '10px',
  },
  userMsg: {
    textAlign: 'right',
    margin: '5px 0',
    color: '#333',
  },
};

export default ChatAvatar;
