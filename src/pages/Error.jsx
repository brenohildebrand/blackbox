//---------//
// Imports //
//---------//
import React, { useEffect, useState } from 'react';
import BlackBoxLogo from '../components/BlackBoxLogo';
import styles from '../styles/pages/Error.module.css';

const ErrorPage = () => {
  //--------//
  // Styles //
  //--------//
  const [backgroundStyle, setBackgroundStyle] = useState('whiteBackground');
  const [errorPageStyle, setErrorPageStyle] = useState(styles.errorPage);

  const errorPageMessageStyle = styles.errorPageMessage;

  //----------------//
  // Initialization //
  //----------------//
  useEffect(() => {
    setErrorPageStyle(`${styles.errorPage} fullOpacity`);
  }, []);

  //----------------//
  // Render Message //
  //----------------//
  const renderMessage = () => {
    return (
      <div className={errorPageMessageStyle}>
        <h2>Error 404! Page not found!</h2>
      </div>
    );
  };

  //--------//
  // Return //
  //--------//
  return (
    <div className={backgroundStyle}>
      <div className={errorPageStyle}>
        {renderMessage()}
        <BlackBoxLogo subTitle='OUTSIDE' />
      </div>
    </div>
  );
};

export default ErrorPage;
