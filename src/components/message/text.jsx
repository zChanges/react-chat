import React, { Component } from "react";
import base from "./base";

export default class MessItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const List = this.props.messageList;
    var context = context => <div className="item-context">{context}</div>;
    var messItemList;
    if (List && List.length > 0) {
      messItemList = List.map((item, key) => {
        return base(
          context(item.message),
          item.self,
          key
        );
      });
    }
    return <div>{messItemList}</div>;
  }
}

module.exports = MessItem;
