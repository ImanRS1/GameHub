import React from 'react'
import ReactLoading from 'react-loading';

const LoadingAnimation = ({ type, color }) => (
  <ReactLoading type={"bubbles"} color={color} height={200} width={100} />
);

export default LoadingAnimation
