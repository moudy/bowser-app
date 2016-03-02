import React from 'react'; // eslint-disable-line

import styles from './styles.css';

const Iframe = ({src, shouldLoad}) => {
  const onLoad = () => {}; //console.log('shouldLoad', src);};
  const iframe = shouldLoad ?  <iframe src={src} onLoad={onLoad} /> : null;
  return (
    <div className={styles.root}>
      {iframe}
    </div>
  );
};

export default Iframe;
