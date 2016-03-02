import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

import styles from './styles.css';

const Trail = (props) => {
  const {pageGroups, currentPageGroup, onNodeClick} = props;
  const points = pageGroups.map((pg, i) => {
    let className = styles.node;
    if (i <= currentPageGroup) className = className+' '+styles.active;
    if (i === currentPageGroup) className = className+' '+styles.selected;

    return (
      <div
        className={className}
        onClick={onNodeClick.bind(null, i)}
        key={i}>
        {pg}
      </div>
    );
  });

  return (
    <div className={styles.root}>
      {points}
    </div>
  );
};

Trail.propTypes = {
  pageGroups: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPageGroup: PropTypes.number.isRequired,
  onNodeClick: PropTypes.func.isRequired
};

export default Trail;

