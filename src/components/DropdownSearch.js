'use strict';

import React, {Component} from 'react';
import debug from 'debug';
const logger = debug('DropdownSearch');

let sizeValidator = function(props, propName, component) {
  let prop = props[propName];

  if (Array.isArray(prop)) {
    if (!props['multiple'] && prop.length > 1) {
      return new Error("`" + propName + "` shouldn't have more than one element when single version of `" + component + '` is used.');
    }
  } else {
    let expected = 'string';
    return typeof prop === expected ? null : new Error('Invalid prop `' + propName + '` of type `' + typeof prop + '` supplied to `' + component + '`, expected `' + expected + '`.');
  }
}

export default class DropdownSearch extends Component {

  rootElement = null;
  isLifecycleOngoing = false;

  dropdownSettings = {
    onChange: this.onChangeHandler.bind(this)
  }

  static propTypes = {
    name: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    items: React.PropTypes.array,
    onChange: React.PropTypes.func,
    multiple: React.PropTypes.bool,
    selectedItems: sizeValidator,

    // expects a value of {valueKey: 'value', contentKey: 'content'}
    // 'value' and 'content' are defaults
    itemKeys: React.PropTypes.object
  }

  componentDidMount() {
    logger('componentDidMount');
    jQuery(this.rootElement).dropdown(this.dropdownSettings);
  }

  componentWillReceiveProps(nextProps) {
    this.isLifecycleOngoing = true;
    logger(this.props.selectedItems, nextProps);

    // TODO check selectedItems of previous and next props
    // if they are the same don't render
  }

  componentDidUpdate() {
    logger('componentDidUpdate', this.props.selectedItems);

    jQuery(this.rootElement)
      .dropdown('clear')
      .dropdown('set text', this.props.defaultText || 'Select')
      .dropdown('set value', this.props.selectedItems)
      .dropdown('restore selected');

    this.isLifecycleOngoing = false;
  }

  onChangeHandler(value, text, $choice) {
    if(!this.isLifecycleOngoing && typeof this.props.onChange == 'function') {
      this.props.onChange(value, text, $choice);
    }
  }

  render() {
    logger('render');

    let multiple = this.props.multiple ? ' multiple' : '';

    let valueKey = this.props.itemKeys && this.props.itemKeys.valueKey ? this.props.itemKeys.valueKey : 'value';
    let contentKey = this.props.itemKeys && this.props.itemKeys.contentKey ? this.props.itemKeys.contentKey : 'content';

    return (
      <div className={"ui fluid search normal selection dropdown" + multiple} ref={c => {this.rootElement = c}}>
        <input type="hidden" name={this.props.name} defaultValue={this.props.selectedItems} />
        <i className="dropdown icon"></i>
        <div className="default text">{this.props.defaultText || 'Select'}</div>
        <div className="menu">
          {this.props.items.map((item)=>{
            return <div className="item" data-value={item[valueKey]} key={item[valueKey] + '_' + item[contentKey]}>{item[contentKey]}</div>
          })}
        </div>
      </div>
    );
  }
}
