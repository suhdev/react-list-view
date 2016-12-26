import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView } from '../ListView';
var items = [];
for (var i = 0; i < 1000; i++) {
    items.push({
        key: 'item-' + i,
        label: 'Item ' + i,
    });
}
ReactDOM.render(React.createElement(ListView, {onItemClick: (e) => { }, itemHeight: 54, maxHeight: 300, getItemCount: () => {
    return items.length;
}, getDefForItem: (idx) => {
    return items[idx];
}}), document.getElementById('SiteContainer'));
