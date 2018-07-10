import React, { Component } from 'react';

class ListContainer extends React.Component {
  renderItem(item){
     return <li onClick={() => this.props.selectList(item)}>{item.name}</li>;
    }   
  
  render() {
      return <div> 
        <div className="row" >
          <h2>Shopping Lists</h2>
          <fontAwesome name="add"/>
        </div>
      <ul>
      { this.props.lists.map(i => this.renderItem(i)) }
      </ul>
      </div>; 
    }
}

export default ListContainer