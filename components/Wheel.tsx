'use client';
import React from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import { Segment, Prize } from 'react-wheel-of-prizes';

interface WheelProps {
  segments: Segment[];
  segColors?: Prize[];
  onFinished?: (winner: string) => void;
}
type Segment = string | {label: string, value?: string}
type Prize = string | { color: string}

const Wheel: React.FC<WheelProps> = ({ segments, segColors, onFinished }) => {
  return (
    <WheelComponent
      segments={segments}
      segColors={segColors}
      onFinished={onFinished}
      isOnlyOnce={false}
      primaryColor="black"
      contrastColor="white"
      size={190}
      upDuration={500}
      downDuration={600}
      fontFamily="Calibri"
    />
  );
};

export default Wheel;
