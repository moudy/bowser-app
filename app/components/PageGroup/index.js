import React, {PropTypes} from 'react';

import Iframe from 'app/components/Iframe';

import Tabs from './Tabs';

import styles from './styles.css';

class PageGroup extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 0
    };
  }

  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
    isTop: PropTypes.bool.isRequired
  };

  didSelectPage = (index) => {
    this.props.didSelectPageGroup(this.props.index);
    this.setState({
      currentPage: index
    });
  }

  render() {
    const {
      pages,
      isTop,
      shouldLoad,
      didClosePage,
      pageGroup,
    } = this.props;

    const {currentPage} = this.state;
    const page = pages[currentPage];

    return (
      <div className={styles.root}>
        <Tabs
          selected={isTop}
          pageGroup={pageGroup}
          currentPage={currentPage}
          pages={pages}
          didSelectPage={this.didSelectPage}
          didClosePage={didClosePage} />
            <Iframe shouldLoad={shouldLoad} src={page.url} />;
      </div>
    );
  }

}

export default PageGroup;
