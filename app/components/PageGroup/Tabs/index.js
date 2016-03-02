import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

import styles from './styles.css';

const Tab = (props) => {
  const {page, selected} = props;
  let className = styles.tab;
  if (selected) className = className+' '+styles.selected;
  return (
    <div {...props} className={className}>
      {page.url}
    </div>
  );
};

const Tabs = (props) => {
  const {currentPage, pages, didSelectPage, selected} = props;
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
};

Tabs.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  })).isRequired,

  didSelectPage: PropTypes.func.isRequired
};

export default Tabs;
