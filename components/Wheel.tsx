'use client';
import React from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import { Segment, Prize } from 'react-wheel-of-prizes';

interface WheelProps {
  segments: Segment[];
  segColors?: Prize[];
  onFinished?: (winner: string) => void;
  isOnlyOnce: boolean
}
type Segment = string | {label: string, value?: string}
type Prize = string | { color: string}

const Wheel: React.FC<WheelProps> = ({ segments, segColors, onFinished, isOnlyOnce }) => {
  // console.log(segments, 'are participan the wheels recieved')
  return (
    <WheelComponent
      segments={segments}
      segColors={segColors}
      onFinished={onFinished}
      isOnlyOnce={isOnlyOnce}
      primaryColor="black"
      contrastColor="white"
      size={300}
      // upDuration={2000}
      // downDuration={1200}
      fontFamily="Calibri"

    />

// Properties	default value	Optional
// segments	NA	No
// segColors	NA	No
// winningSegment	NA	Yes
// primaryColor	'black'	Yes
// contrastColor	'white'	Yes
// buttonText	'spin'	Yes
// isOnlyOnce	true	Yes
// upDuration	100	Yes
// downDuration	1000	Yes
// fontFamily	'proxima-nova'	Yes
  );
};

export default Wheel;
