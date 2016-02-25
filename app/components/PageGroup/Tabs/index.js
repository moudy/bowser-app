import React, {PropTypes} from 'react';

import styles from './styles.css';

class Tab extends React.Component {
  render() {
    const {page, selected} = this.props;
    let className = styles.tab;
    if (selected) className = className+' '+styles.selected;
    return (
      <div {...this.props} className={className}>
        {page.url}
      </div>
    );
  }
}

class Tabs extends React.Component {

  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,

    didSelectPage: PropTypes.func.isRequired
  }

  render() {
    const {currentPage, pages, didSelectPage, selected} = this.props;
    const tabWith = `${100 / pages.length}%`;
    const tabs = pages.map((page, index) => {
      return (
        <Tab
          selected={index === currentPage}
          style={{width: tabWith}}
          onClick={didSelectPage.bind(null, index)}
          key={page.url}
          page={page} />
      );
    });

    let className = styles.root;
    if (selected) className = className+' '+styles.top;

    return (
      <div className={className}>
        {tabs}
      </div>
    );
  }

}

export default Tabs;
