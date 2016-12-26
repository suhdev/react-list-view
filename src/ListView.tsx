import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import {ListItemDef,ListItem} from './ListItem';
import {debounce} from './Util';

export interface ListViewProps {
    className?:string;
    itemHeight:number;
    maxHeight:number;
    itemRenderer?:(item:ListItemDef)=>React.ReactElement<any>;
    itemContentRenderer?:(itemKey:string,label:string,onClick:Function)=>React.ReactElement<any>;
    onItemClick:Function;
    getItemCount:()=>number;
    getDefForItem:(idx:number)=>ListItemDef;
    currentIndex?:number;
}

export interface ListViewState {
    currentIndex:number;
}

export class ListView extends React.Component<ListViewProps,ListViewState>{
    el:Element;
    constructor(props:ListViewProps){
        super(props);
        this.state = {
            currentIndex:props.currentIndex||0,
        }; 
        this.onScroll = this.onScroll.bind(this);
        this.onScroll = debounce(this.onScroll,16);
    }

    componentDidMount(){
        this.el = ReactDOM.findDOMNode(this);
   
    }

    onScroll(){
        let count = this.props.getItemCount(),
            v = Math.floor((this.el.scrollTop/(this.el.scrollHeight-this.props.maxHeight))*count);
        this.setState({
            currentIndex:v
        });
        // this.setState({

        // }); 
    }

    render(){
        let props = this.props,
            clz = props.className || "",
            renderer = props.itemRenderer,
            itemHeight = props.itemHeight,
            itemsCount = props.getItemCount(),
            currentIndex = this.state.currentIndex || 0,
            height = props.maxHeight,
            visibleItems = Math.floor(props.maxHeight/itemHeight),
            getDefForItem = props.getDefForItem,
            itemRenderer = props.itemRenderer,
            temp,
            counter = 0,
            s = {
                position:'relative',
                overflow:'auto',
                height:(props.maxHeight)+'px',
            },
            ss = {
                // paddingTop:(itemHeight*currentIndex)+'px',
                top:'0px',
                // height:'100%',
                height:(itemHeight*itemsCount)+'px',
                position:'absolute',
                left:'0px',
                width:'100%'
            },
            sss = {
                top:'0px',
                left:'0px',
                height:(itemHeight*itemsCount)+'px',

            },
            items = [], 
            max = currentIndex+visibleItems;
        currentIndex = currentIndex < (itemsCount - visibleItems)?currentIndex:(itemsCount - visibleItems);
        max = ((currentIndex + 50) < itemsCount)?(currentIndex+50):itemsCount; 
        for(var i=currentIndex;i<max;i++){
            temp = getDefForItem(i); 
            console.log(temp);
            if (itemRenderer){
                items.push(itemRenderer(temp));
            }else {
                items.push(
                    (<ListItem key={counter} itemKey={temp.key} 
                        label={temp.label} height={props.itemHeight} 
                        onClick={props.onItemClick} 
                        contentRenderer={props.itemContentRenderer} />)
                )
            }
            counter++;
        }
        return (
            <div className={"react-list-view "+clz} 
                onScroll={this.onScroll} style={s}>
                <div className="list-view-wrapper" 
                    ref="wrapper" style={ss}>
                </div>
                <div className="list-view-items-wrapper" 
                    ref="itemsWrapper" style={}>
                    {items}
                </div>
            </div>
        );
    }
} 