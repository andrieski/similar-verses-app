import React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Scrollbars } from 'react-custom-scrollbars';
import './MySelector.css'


class MySelector extends React.Component {

  defaultTextFormatter(item, isActive) {
    return (
      <div className={"selector-row " + (isActive ? 'default-active' : '')}>
       {item.text} 
      </div>
    )
  }

  render() {
    return (
      <div className="selector-container ms-font-m-plus">
        <Label>{this.props.header}</Label>
        <div className="selector-content-container">
          <Scrollbars 
          autoHeight
          autoHeightMax={this.props.autoHeightMax} 
          style={{ width: 'auto' }}>
            {
              this.props.items.map(function(item, index) {

                var isActive = this.props.selectedKey == item.key;
                var hasFormatter = typeof this.props.formatItem === 'function';

                return (
                  <div key={item.key + '-' +  item.text} onClick={() => this.props.onChanged(item)}>
                    {hasFormatter ? 
                    this.props.formatItem(item, isActive) : 
                    this.defaultTextFormatter(item, isActive)}
                  </div>
                )
              }, this)
            }
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default MySelector;