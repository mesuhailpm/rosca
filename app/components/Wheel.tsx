'use client' 
import React, { useEffect, useRef } from 'react';
import Winwheel from 'winwheel';

const SpinningWheel: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const segments = [
      { fillStyle: 'red', text: 'Segment 1' },
      { fillStyle: 'blue', text: 'Segment 2' },
      // Add more segments as needed
    ];

    const wheel = new Winwheel({
      canvasId: canvasRef.current,
      numSegments: segments.length,
      segments,
      animation: {
        type: 'spinToStop',
        duration: 5,  // Spin duration in seconds
        spins: 5,    // Number of spins
      },
    });

    const spinButton = document.getElementById('spinButton');
    spinButton.addEventListener('click', () => {
      if (!wheel.isSpinning) {
        wheel.startAnimation();
      }
    });

    wheel.onFinished = (segment) => {
      // Handle the selected segment, e.g., determine the winner and perform actions.
      console.log(`Selected segment: ${segment.text}`);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={300} height={300}></canvas>
      <button id="spinButton">Spin</button>
    </div>
  );
};

export default SpinningWheel;
