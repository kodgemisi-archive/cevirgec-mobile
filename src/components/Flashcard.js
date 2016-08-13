'use strict';

import React, {Component} from 'react';
import debug from 'debug';
const logger = debug('Flashcard');

export default class Flashcard extends Component {
  rootElement = null;

  static propTypes = {
    word: React.PropTypes.string.isRequired,
    definitions: React.PropTypes.array.isRequired
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;

    Object.keys(nextProps).forEach((key)=> {
      if (nextProps[key] != this.props[key]) {
        if (key == 'activeSide') {
          this.flip();
        } else {
          shouldUpdate = true;
        }
      }
    });

    return shouldUpdate;
  }

  render() {
    logger('render');

    return (
      <div className="ui shape" ref={c => {this.rootElement = c}}>
        <button
          style={{position: 'absolute', zIndex: 1, right: '-15px'}}
          className="circular compact ui icon button"
          onClick={this.flip.bind(this)}>
          <i className="flipped retweet icon"></i>
        </button>
        <div className="sides">
          <div className="side active">
            <div className="ui card">
              <div className="content">
                <a className="header">Word</a>
                <div className="description">
                  {this.props.word}
                </div>
              </div>
            </div>
          </div>
          <div className="side">
            <div className="ui card">
              <div className="content">
                <a className="header">Definitions</a>
                <div className="description">
                  <ul>
                    {this.props.definitions.map((definition, index)=>{
                      return <li key={index}>{definition}</li>
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  flip() {
    jQuery(this.rootElement).shape('flip back');
  }
}
