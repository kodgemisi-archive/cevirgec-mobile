'use strict';

import React, {Component} from 'react';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import Carousel from 'react-slick';
import debug from 'debug';
const logger = debug('CarouselWrapper');

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true
};

export default class CarouselWrapper extends Component {

  state = {
    slideIndex: 0
  }

  render() {
    logger('render', this.state.slideIndex);

    return (
      <div>
        <div style={{height: '300px'}}>
          <Carousel {...settings} slickGoTo={this.state.slideIndex}>
            {this.props.cards.map((item, index)=>{
              return <div className="carousel-item" key={'carousel-item-'+index}>{item}</div>
            })}
          </Carousel>
        </div>

        <button className="ui labeled icon button" onClick={this.prev.bind(this)}>
          <i className="left arrow icon"></i>
          Previous
        </button>
        <button className="ui right labeled right floated icon button" onClick={this.next.bind(this)}>
          <i className="right arrow icon"></i>
          Next
        </button>
      </div>
    );
  }

  prev() {
    this.setState({slideIndex: Math.abs((--this.state.slideIndex + this.props.cards.length) % this.props.cards.length)});
  }

  next() {
    this.setState({slideIndex: Math.abs(++this.state.slideIndex % this.props.cards.length)});
  }
}
