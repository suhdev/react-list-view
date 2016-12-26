import * as React from 'react';

export interface ListItemDef {
    key:string;
    label:string;
}

export interface ListItemProps {
    itemKey:string;
    onClick:Function;
    height:number; 
    label:string;
    contentRenderer?:(itemKey:string,label:string,onClick:Function)=>React.ReactElement<any>;
}

export interface ListItemState {

}

export class ListItem extends React.Component<ListItemProps,ListItemState>{
    constructor(props:ListItemProps){
        super(props);
        this.onClick = this.onClick.bind(this); 
        this.state = {

        };
    }

    onClick(){
        this.props.onClick(this.props.itemKey); 
    }

    // shouldComponentUpdate(props:ListItemProps){
    //     return props.label !== props.label ||
    //         props.itemKey !== props.itemKey;
    // }

    render(){
        let props = this.props,
            s = {
                height:props.height +'px'
            },
            content = (props.contentRenderer && props.contentRenderer(props.itemKey,
                props.label,this.onClick)) || (<div key="item-label" className="list-item-label">{props.label}</div>);
        return (
            <div className="list-item" 
                onClick={this.onClick} 
                style={s}>
                {content}
            </div>
        );
    }
}