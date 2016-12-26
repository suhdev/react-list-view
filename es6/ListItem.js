import * as React from 'react';
export class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {};
    }
    onClick() {
        this.props.onClick(this.props.itemKey);
    }
    // shouldComponentUpdate(props:ListItemProps){
    //     return props.label !== props.label ||
    //         props.itemKey !== props.itemKey;
    // }
    render() {
        let props = this.props, s = {
            height: props.height + 'px'
        }, content = (props.contentRenderer && props.contentRenderer(props.itemKey, props.label, this.onClick)) || (React.createElement("div", {key: "item-label", className: "list-item-label"}, props.label));
        return (React.createElement("div", {className: "list-item", onClick: this.onClick, style: s}, content));
    }
}
