//---------//
// Imports //
//---------//
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BlackBoxLogo from '../components/BlackBoxLogo';
import styles from '../styles/pages/Start.module.css';

const StartPage = () => {
  //------------//
  // useHistory //
  //------------//
  const history = useHistory();

  //--------//
  // Images //
  //--------//
  const BlackBoxSVG = (
    <svg onClick={openBlackBox} viewBox='-60 -90 622 625'>
      <g>
        <path d='m256.002 242.913 210.412-121.43-210.412-121.483-210.416 121.483z' />
        <path d='m240.949 268.986-210.415-121.429v242.96l210.415 121.483z' />
        <path d='m271.056 268.986v243.014l210.41-121.483v-242.96z' />
      </g>
    </svg>
  );

  //--------//
  // Styles //
  //--------//
  const [backgroundStyle, setBackgroundStyle] = useState('whiteBackground');
  const [startPageStyle, setStartPageStyle] = useState(styles.startPage);

  //----------------//
  // Initialization //
  //----------------//
  useEffect(() => {
    setStartPageStyle(`${styles.startPage} fullOpacity`);
  }, []);

  //--------------//
  // openBlackBox //
  //--------------//
  function openBlackBox() {
    // Open Black Box
    setStartPageStyle(
      `${styles.startPage} fullOpacity ${styles.startPageAnimation}`,
    );

    // Change Bacckground and Opacity
    setTimeout(() => {
      setBackgroundStyle('blackBackground');
      setStartPageStyle(`${styles.startPage} ${styles.startPageAnimation}`);
      setTimeout(() => history.push('/Tree'), 550);
    }, 550);
  }

  //--------//
  // Return //
  //--------//
  return (
    <div className={backgroundStyle}>
      <div className={startPageStyle}>
        <BlackBoxLogo />
        {BlackBoxSVG}
      </div>
    </div>
  );
};

export default StartPage;
