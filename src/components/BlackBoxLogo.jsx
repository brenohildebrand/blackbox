import React from 'react';
import styles from '../styles/components/BlackBoxLogo.module.css';

const BlackBoxLogo = (props) => {
  const { subTitle } = props;

  if (subTitle === undefined) {
    return (
      <div className={styles.BlackBoxLogo}>
        <h1>Black Box</h1>
      </div>
    );
  }

  return (
    <div className={styles.BlackBoxLogo}>
      <h1>Black Box</h1>
      <h3>{subTitle}</h3>
    </div>
  );
};

export default BlackBoxLogo;
