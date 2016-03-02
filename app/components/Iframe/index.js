import React from 'react'; // eslint-disable-line

import styles from './styles.css';

const Iframe = ({src}) => {
  const onLoad = () => {}; //console.log('load', src);};
  return (
    <div className={styles.root}>
      <iframe src={src} onLoad={onLoad} />
    </div>
  );
};

export default Iframe;
