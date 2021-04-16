// Imports
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './loadingWin.module.css';

// Variables and Constants
const rootEl = document.getElementById('root');

// Images
const blackBoxSvg = (
  <svg width='50' height='50' viewBox='0 0 50 50' fill='none'>
    <path
      d='M25.0001 0.866026L44.0479 11.8634L25.0001 22.856L5.95191 11.8634L25.0001 0.866026Z'
      fill='black'
      stroke='white'
      strokeWidth='1.5'
    />
    <path
      d='M22.7803 48.701L3.73193 37.7035V15.7087L22.7803 26.7013V48.701Z'
      fill='black'
      stroke='white'
      strokeWidth='1.5'
    />
    <path
      d='M46.2681 15.7087V37.7035L27.2202 48.701V26.7013L46.2681 15.7087Z'
      fill='black'
      stroke='white'
      strokeWidth='1.5'
    />
  </svg>
);

const dotSvg = (
  <svg viewBox='0 0 100 100' width='20' height='auto'>
    <circle cx='50' cy='50' r='50' fill='black' />
  </svg>
);

// LoadingWindow Component
const LoadingWindow = (props) => {
  // States
  const [firstDotStyle, setFirstDotStyle] = useState(styles.fullOpacity);
  const [secondDotStyle, setSecondDotStyle] = useState(null);
  const [thirdDotStyle, setThirdDotStyle] = useState(null);

  // Effects
  const time = 450;

  useEffect(() => {
    setTimeout(() => {
      setFirstDotStyle('');
      setSecondDotStyle(styles.fullOpacity);
    }, time);
  }, [firstDotStyle]);

  useEffect(() => {
    if (secondDotStyle === null) return;
    setTimeout(() => {
      setSecondDotStyle('');
      setThirdDotStyle(styles.fullOpacity);
    }, time);
  }, [secondDotStyle]);

  useEffect(() => {
    if (thirdDotStyle === null) return;
    setTimeout(() => {
      setThirdDotStyle('');
      setFirstDotStyle(styles.fullOpacity);
    }, time);
  }, [thirdDotStyle]);

  // Functions
  const renderIcon = () => {
    return <div className={styles.icon}>{blackBoxSvg}</div>;
  };

  const renderDots = () => {
    return (
      <div className={styles.dots}>
        <div className={firstDotStyle}>{dotSvg}</div>
        <div className={secondDotStyle}>{dotSvg}</div>
        <div className={thirdDotStyle}>{dotSvg}</div>
      </div>
    );
  };

  // Return
  return (
    <div className={styles.loadingWin}>
      {renderIcon()}
      {renderDots()}
    </div>
  );
};

// Render
ReactDOM.render(<LoadingWindow />, rootEl);

//! Load What is Needed

// Function
const loadResources = async () => {
  try {
    await window.api.invoke('LOAD_ICONS');
    await window.api.invoke('CLOSE_LOAD');
  } catch (err) {
    throw err;
  }
};

loadResources();
