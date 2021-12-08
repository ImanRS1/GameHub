import React from 'react'
import ReactLoading from 'react-loading';

const LoadingAnimation = ({ type, color }) => (
  <ReactLoading type={"bubbles"} color={color} height={250} width={125} />
);

export default LoadingAnimation
