/**
 * Checkbox group
 * ataomega@gmail.com
 * www.atasmohammadi.net
 * version 1.0
 * revision erhanbicer
 */
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth : Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      selected  : this.props.selected
    };
  }

  componentDidMount = () => {

  };

  getNewDimensions(event) {
    let pageHeight = event.nativeEvent.layout.height;
    let pageWidth  = event.nativeEvent.layout.width;
    this.setState({
      pageHeight, pageWidth
    });
  }

  _onSelect = (item) => {
    let selected = this.state.selected;
    if (selected.indexOf(item) === -1) {
      selected.push(item);
      this.setState({
        selected: selected
      });
    } else {
      selected = selected.filter(i => i !== item);
      this.setState({
        selected: selected
      });
    }
    this.props.callback(selected);
  };

  _isSelected = (item) => {
    const selected = this.state.selected;
    return selected.indexOf(item) !== -1;

  };

  render() {
    const { checkboxes, containerStyle, iconColor, iconSize, labelStyle, checkedIcon, uncheckedIcon, rowStyle, rowDirection } = this.props;

    return (
        <ScrollView
            onLayout={(evt) => {
              this.getNewDimensions(evt);
            }}
            style={[{
              flexDirection: rowDirection,
              padding      : 5,
            }, containerStyle]}
        >
          {checkboxes.map((checkbox, index) => {
            return (
                <Touchable
                    key={index}
                    onPress={() => {
                      this._onSelect(index);
                    }}
                >
                  <View
                      style={[rowStyle, { flexDirection: 'row', alignItems: 'center' }]}
                  >
                    {this._isSelected(index) ?
                        <Icon name={checkedIcon} color={iconColor} size={iconSize}/>
                        : <Icon name={uncheckedIcon} color={iconColor} size={iconSize}/>
                    }
                    <Text style={labelStyle}>{checkbox.brand}</Text>
                  </View>
                </Touchable>
            );
          })}
        </ScrollView>
    );
  }
}
