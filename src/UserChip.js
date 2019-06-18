import React, { Component } from 'react';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';

export default class UserChip extends Component {
  constructor(props) {
    super(props);

    this._handleRemove = this._handleRemove.bind(this);
  }
  _handleRemove() {
    this.props.onClick(this.props.state);
  }

  render() {
    const { state: { name, abbreviation, id }, ...props } = this.props;
    return (
      <Chip
        {...props}
        onClick={ this._handleRemove}
        removable={true}
        label={name}
        value={id}
        avatar={<Avatar random>{abbreviation.charAt(0)}</Avatar>}
      />
    );
  }
}
