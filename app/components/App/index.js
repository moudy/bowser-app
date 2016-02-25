import React from 'react'; // eslint-disable-line
import {TransitionMotion, spring} from 'react-motion';

import PageGroup from 'app/components/PageGroup';
import Trail from 'app/components/Trail';

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('message', (msg) => this.addPage(msg.data));
    const {url} = this.props;
    const pageGroups = [
      [{url}]
    ];

    this.setState({
      pageGroups,
      currentPageGroup: 0
    });
  }

  addPage(page) {
    const {pageGroups, currentPageGroup} = this.state;
    const newPageGroup = currentPageGroup + 1;

    let pageIndex;
    if (pageGroups[newPageGroup]) {
      const existing = pageGroups[newPageGroup].find((p) =>p.url === page.url);
      if (existing) {
        pageIndex = pageGroups[newPageGroup].indexOf(existing);
      } else {
        pageGroups[newPageGroup].unshift(page);
      }
    } else {
      pageGroups[newPageGroup] = [page];
    }

    if (pageIndex !== undefined) {
      console.log(`TODO - make sure page ${pageIndex} is selected`);
    }

    this.setState({
      pageGroups,
      currentPageGroup: newPageGroup
    });
  }

  willEnter({style: {translateY: {val}}}) {
    return {
      opacity: 0,
      scale: 1.1,
      translateY: val + 30,
      top: 0,
      left: 20,
      right: 90,
      bottom: 0,
    };
  }

  willLeave({style: {translateY: {val}}}) {
    const springOptions = {stiffness: 200, damping: 25};
    return {
      opacity: spring(0, {...springOptions}),
      scale: spring(1.2, {...springOptions}),
      translateY: spring(val + 30, {...springOptions}),
      top: spring(0, {...springOptions}),
      left: spring(0, {...springOptions}),
      right: spring(0, {...springOptions}),
      bottom: spring(0, {...springOptions}),
    };
  }

  transtionStyles() {
    const {pageGroups, currentPageGroup} = this.state;
    const currentPageGroups = pageGroups.slice(0, currentPageGroup + 1);
    const count = currentPageGroups.length;
    const yStaggerAmount = 18;

    const springOptions = {stiffness: 200, damping: 25};

    if (count === 1) {
      return [{
        key: 0,
        data: pageGroups[0],
        style: {
          opacity: spring(1, {...springOptions}),
          scale: spring(1, {...springOptions}),
          translateY: spring(0, {...springOptions}),
          top: spring(-27, {...springOptions}),
          left: spring(0, {...springOptions}),
          right: spring(0, {...springOptions}),
          bottom: spring(0, {...springOptions}),
        },
      }];
    }

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
          left: spring(20, {...springOptions}),
          right: spring(90, {...springOptions}),
          bottom: spring(0, {...springOptions}),
        }
      };
    });
  }

  didSelectPageGroup = (index) => {
    this.setState({
      currentPageGroup: index
    });
  }

  render() {
    if (!this.state) return <div />;

    const pageGroups = this.state.pageGroups.map(p => p.length);
    const currentPageGroup = this.state.currentPageGroup;

    return (
      <div>
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={this.transtionStyles()}>
        {interpolatedStyles =>
          <div>
            {interpolatedStyles.map(({key, style, data}, index) => {
              return (
                <div
                  key={key}
                  style={{
                    opacity: style.opacity,
                    transform: `scale(${style.scale}) translateY(${style.translateY}px)`,
                    transformOrigin: 'center top',
                    background: 'white',
                    position: 'fixed',
                    top: style.top,
                    left: style.left,
                    right: style.right,
                    bottom: style.bottom,
                  }}>
                  <PageGroup
                    index={index}
                    isTop={index === currentPageGroup}
                    didSelectPageGroup={this.didSelectPageGroup}
                    pages={data} />
                </div>
              );
            })}
          </div>
        }
      </TransitionMotion>
      <Trail
        pageGroups={pageGroups}
        onNodeClick={this.didSelectPageGroup}
        currentPageGroup={currentPageGroup}/>
      </div>
    );
  }
}

export default App;
