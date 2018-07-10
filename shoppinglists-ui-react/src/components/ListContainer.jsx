import React, { Component } from 'react';

import {Grid, Row, Col, FormGroup, Checkbox} from 'react-bootstrap';

class ListContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        };

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.submitEditHeader = this.submitEditHeader.bind(this);
        this.submitAddItem = this.submitAddItem.bind(this);
        this.handleItemChanged = this.handleItemChanged.bind(this);
        this.handleItemSelectChanged = this.handleItemSelectChanged.bind(this);
    }

    editHeader(){
        this.setState({
            isEditing: true,
            listName: this.props.name,
        });
    }

    submitEditHeader(event){
        this.props.updateName(this.state.listName);
        this.setState({
            isEditing: false
        });
        event.preventDefault();
    }

    submitAddItem(event){
        this.props.addItem(this.state.newItem);
        this.setState({
            newItem: ""
        });
        event.preventDefault();
    }

    handleItemChanged(event){
        this.setState({newItem: event.target.value});
    }

    handleHeaderChange(event) {
        this.setState({listName: event.target.value});
      }
    
    handleItemSelectChanged(item, event){
        item.purchased = event.target.checked;
        this.props.updateItem(item);        
        
    }

    renderItem(item){
        return <Checkbox key={item.id} checked={item.purchased} onChange={e => this.handleItemSelectChanged(item, e)}>{item.name}</Checkbox>;
    }

    renderNewItem(){
        return <div style={{marginTop: '10px'}}>
            <form onSubmit={this.submitAddItem}>
                <input type="text" value={this.state.newItem} onChange={this.handleItemChanged} /> 
                <button type="submit">Add</button>
            </form>
      </div>

    }
     
    renderHeader(){
    return <div  style={{display: 'flex', alignItems: 'center'}} >
        <h1>{this.props.name}</h1>
        <button onClick={()=> this.editHeader()}>Edit</button>
       
    </div>;
    }

    renderHeaderEdit(){
        return <div style={{display: 'flex', alignItems: 'center'}} >        
            <form onSubmit={this.submitEditHeader}>
            <input type="text" value={this.state.listName} onChange={this.handleHeaderChange} /> 
            <button type="submit">Save</button>
            </form>
        
        </div>;
    }

    render() {
      return <div>
          {!this.state.isEditing && this.renderHeader()}
          {this.state.isEditing && this.renderHeaderEdit()}
      {this.props.items &&
      <FormGroup>
         { this.props.items.map(i => this.renderItem(i)) }
    </FormGroup>
        }
        {this.renderNewItem()}
      </div>;
    }
}

export default ListContainer;