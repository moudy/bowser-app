import React from 'react';
import {connect} from 'react-redux';
import {TransitionMotion, spring} from 'react-motion';

import PageGroup from 'app/components/PageGroup';
import Trail from 'app/components/Trail';
import {addPage, selectPageGroup} from 'app/actions';

import styles from './styles.scss';

const styleForPageGroup = ({opacity, scale, translateY, top, left, right, bottom}) => ({
  opacity,
  top,
  left,
  right,
  bottom,
  transform: `scale(${scale}) translateY(${translateY}px)`,
  transformOrigin: 'center top',
  background: 'white',
  position: 'absolute',
});

const transtionMotionStyles = ({currentPageGroup, pageGroups}) => {
  const currentPageGroups = pageGroups.slice(0, currentPageGroup + 1);
  const count = currentPageGroups.length;
  const yStaggerAmount = 18;

  const springOptions = {stiffness: 200, damping: 25};

  return currentPageGroups.map((page, index) => {
    const translateY = yStaggerAmount * (index + 1);
    const scale = 1 - (((count - (index + 1)) / 100) * 2);
    return {
      key: index,
      data: page,
      style: {
        opacity: spring(1, {...springOptions}),
        scale: spring(scale, {...springOptions}),
        translateY: spring(translateY, {...springOptions}),
        top: spring(0, {...springOptions}),
        left: spring(0, {...springOptions}),
        right: spring(0, {...springOptions}),
        bottom: spring(0, {...springOptions}),
      }
    };
  });
};


const willEnter = ({style: {translateY: {val}}}) => {
  return {
    opacity: 0,
    scale: 1.1,
    translateY: val + 30,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
};

const willLeave = ({style: {translateY: {val}}}) => {
  const springOptions = {stiffness: 200, damping: 25};
  return {
    opacity: spring(0, {...springOptions}),
    scale: spring(1.2, {...springOptions}),
    translateY: spring(val, {...springOptions}),
    top: spring(0, {...springOptions}),
    left: spring(0, {...springOptions}),
    right: spring(0, {...springOptions}),
    bottom: spring(0, {...springOptions}),
  };
};

class App extends React.Component {

  componentDidMount() {
    // message from iframe via chrome-extension
    window.addEventListener('message', (msg) => {
      console.log('msg', msg.data);
      if (msg.data.id === 'bowser-click') {
        this.props.onPageClick(msg.data);
      }
    });
  }

  render() {
    const {
      currentPageGroup,
      pageGroups,
      onSelectPageGroup,
    } = this.props;

    return (
      <div className={styles.root}>
        <TransitionMotion
          willLeave={willLeave}
          willEnter={willEnter}
          styles={transtionMotionStyles({currentPageGroup, pageGroups})}>
          {interpolatedStyles =>
            <div className={styles.content}>
              {interpolatedStyles.map(({key, style, data}, index) => {
                return (
                  <div key={key} style={styleForPageGroup(style)}>
                    <PageGroup
                      index={index}
                      isTop={index === currentPageGroup}
                      didSelectPageGroup={onSelectPageGroup}
                      pages={data} />
                  </div>
                );
              })}
            </div>
          }
        </TransitionMotion>
        <Trail
          pageGroups={pageGroups.map(pg => pg.length)}
          onNodeClick={onSelectPageGroup}
          currentPageGroup={currentPageGroup}/>
      </div>
    );
  }
}

const mapStateToProps = ({pageGroups, currentPageGroup}) => {
  return {
    pageGroups,
    currentPageGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (data) => {
      dispatch(addPage(data));
    },
    onSelectPageGroup: (index) => {
      dispatch(selectPageGroup({index}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
