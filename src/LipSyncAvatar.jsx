import React, { useEffect, useRef, useState } from "react";

const LipSyncAvatar = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [mouthSize, setMouthSize] = useState(0);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioRef.current && !sourceRef.current) {
      const audioElement = audioRef.current;
      
      // Create Media Source Node only once
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      
      analyserRef.current.fftSize = 32;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    }
  }, []);

  const startLipSync = () => {
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    if (audioRef.current) {
      audioRef.current.play();
      animateMouth();
    }
  };

  const animateMouth = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    const updateMouth = () => {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avgVolume = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
      setMouthSize(avgVolume / 255);

      requestAnimationFrame(updateMouth);
    };

    updateMouth();
  };

  return (
    <div>
      <div className="avatar">
        <img src="/avatar_base.png" alt="Avatar" className="avatar-base" />
        <img
          src="/avatar_mouth.png"
          alt="Mouth"
          className="avatar-mouth"
          style={{ transform: `scaleY(${mouthSize})` }}
        />
      </div>
      <button onClick={startLipSync}>Start Talking</button>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default LipSyncAvatar;
