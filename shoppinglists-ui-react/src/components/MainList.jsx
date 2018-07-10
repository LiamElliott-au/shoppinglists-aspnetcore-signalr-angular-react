import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class MainList extends React.Component {
  renderItem(item){
     return <li onClick={() => this.props.selectList(item)}>{item.name}</li>;
    }   
  
  render() {
      return <div >
        
        <Row className="show-grid"> 
          <Col md={8}><h2>Shopping Lists</h2></Col>
          <Col md={3}><button onClick={() => this.props.addList()}>+</button></Col>
        </Row>
        <Row className="show-grid"> 
          <ul>
          { this.props.lists.map(i => this.renderItem(i)) }
          </ul>
          </Row>
         
      </div>; 
    }
}

export default MainList