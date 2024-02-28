import React, { useRef } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';

const MyMusicPlayer = () => {
  // Create a reference for the audio element
  const audioRef = useRef(null);

  // Create a reference for the audio context
  const audioContextRef = useRef(null);

  // Create a reference for the audio source
  const sourceRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the audio source to the selected file
      audioRef.current.src = URL.createObjectURL(file);
      startAudio();
    }
  };

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Set the volume to 40%
    }
    // Initialize the audio context
    audioContextRef.current = new AudioContext();
    // Create the audio source only once (avoiding duplicates)
    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    }

    // Initialize the audioMotion analyzer
    const audioMotion = new AudioMotionAnalyzer({
      source: sourceRef.current,
      height: 500, // Set the desired fixed height (in pixels)
      // You can customize other options here
    });

    // Start the visualization
    audioMotion.start();

    // Clean up when the component unmounts
    return () => {
      audioMotion.stop();
      audioContextRef.current.close(); // Close the audio context
    };
  };


  return (
    <div>
      {/* File input for selecting an MP3 file */}
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
      />
      {/* Audio element for playing the selected file */}
      <audio ref={audioRef} controls volume="0.5">
        <source src="my-music.mp3" type="audio/mpeg" />

      </audio>
      {/* Canvas for rendering the spectrum analyzer */}
      <canvas id="spectrum-canvas"></canvas>
    </div >
  );
};

export default MyMusicPlayer;
