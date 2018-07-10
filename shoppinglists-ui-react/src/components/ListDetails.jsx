import React, { Component } from 'react';

class ListDetails extends React.Component {
    renderItem(item){
        return <li>{item.name}</li>;
    }

    render() {
      return <div>
          <h1>{this.props.name}</h1>
      <ul>
         { this.props.items.map(i => this.renderItem(i)) }
      </ul>
      </div>;
    }
}

export default ListDetails;