import React, {PropTypes} from 'react';

import styles from './styles.css';

class Trail extends React.Component {

  static propTypes = {
    pageGroups: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentPageGroup: PropTypes.number.isRequired,
    onNodeClick: PropTypes.func.isRequired
  };

  render() {
    const {pageGroups, currentPageGroup, onNodeClick} = this.props;
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
  }

}

export default Trail;

