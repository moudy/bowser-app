import React from 'react'; // eslint-disable-line

import styles from './styles.css';

const Iframe = ({src}) => {
  return (
    <div className={styles.root}>
      <iframe src={src} onLoad={() => {console.log('load', src); }} />
    </div>
  );
};

export default Iframe;
