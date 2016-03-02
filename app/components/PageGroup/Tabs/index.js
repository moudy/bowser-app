import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars

import styles from './styles.css';

const Tab = (props) => {
  const {page, selected, showCloseButton} = props;
  let className = styles.tab;
  if (selected) className = className+' '+styles.selected;

  const closeButton = showCloseButton
    ? (
      <div onClick={props.onCloseClick} className={styles.closeButton}>
        &times;
      </div>
    ) : null;

  return (
    <div style={props.style} className={className}>
      {closeButton}
      <div onClick={props.onTabClick} className={styles.tabTitle}>
        {page.url}
      </div>
    </div>
  );
};

const Tabs = (props) => {
  const {
    currentPage,
    pages,
    didSelectPage,
    didClosePage,
    selected,
    pageGroup,
  } = props;

  const tabWith = `${100 / pages.length}%`;
  const tabs = pages.map((page, index) => {
    return (
      <Tab
        selected={index === currentPage}
        style={{width: tabWith}}
        onTabClick={didSelectPage.bind(null, index)}
        onCloseClick={didClosePage.bind(null, {url: page.url, pageGroup})}
        key={page.url}
        showCloseButton={selected}
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
  didSelectPage: PropTypes.func.isRequired,
  didClosePage: PropTypes.func.isRequired
};

export default Tabs;
