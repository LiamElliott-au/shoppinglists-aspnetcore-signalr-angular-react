import React, { Component } from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

class ListContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        };

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.submitEditHeader = this.submitEditHeader.bind(this);
    }

    editHeader(){
        this.setState({
            isEditing: true,
            listName: this.props.name
        });
    }

    submitEditHeader(event){
        this.props.updateName(this.state.listName);
        this.setState({
            isEditing: false
        });
        event.preventDefault();
    }

    handleHeaderChange(event) {
        this.setState({listName: event.target.value});
      }

    renderItem(item){
        return <li>{item.name}</li>;
    }

    renderHeader(){
    return   <Row className="show-grid">
    <h1>{this.props.name}</h1>
    <button onClick={()=> this.editHeader()}>Edit</button>
    </Row>;
    }

    renderHeaderEdit(){
        return <Row className="show-grid">
            <form onSubmit={this.submitEditHeader}>
            <input type="text" value={this.state.listName} onChange={this.handleHeaderChange} /> 
              <button type="submit">Save</button>
          </form>
        </Row>;
    }

    render() {
      return <div>
          {!this.state.isEditing && this.renderHeader()}
          {this.state.isEditing && this.renderHeaderEdit()}
      {this.props.items &&
      <ul>
         { this.props.items.map(i => this.renderItem(i)) }
      </ul>}
      </div>;
    }
}

export default ListContainer;