import React from 'react';

import styles from './styles.css';
import screenshot from './screenshot.png';

const extensionUrl = 'https://chrome.google.com/webstore/detail/bowser/ehifphmcdbhocdmdadjefoodhdapgnid';

class Foyer extends React.Component {
  render() {
    const isInstalled = window.chrome && window.chrome.app.isInstalled;
    const onClick = () => { window.location = extensionUrl; };

    const onSubmit = (e) => {
      e.preventDefault();
      const {value} = this.refs.input;
      if (value) {
        window.location = window.location.origin+'/#'+value;
        window.location.reload();
      }
    };

    const input = isInstalled
      ? (
        <form onSubmit={onSubmit}>
          <input
            placeholder='Enter starting url'
            className={styles.input}
            ref='input' />
            <button>
              Start
            </button>
        </form>
      )
      : (
        <div className={styles.button} onClick={onClick}>
          Install Chrome Extension
        </div>
      );

    return (
      <div className={styles.root}>
        <h1 className={styles.title}>
          Bowser
        </h1>
        <h2 className={styles.subtitle}>
          Layered Browsing in Chrome
        </h2>

        {input}

        <img className={styles.image} src={screenshot} />
      </div>
    );
  }
}

export default Foyer;
