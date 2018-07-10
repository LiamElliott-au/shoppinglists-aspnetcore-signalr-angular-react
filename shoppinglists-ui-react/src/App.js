import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import ListContainer from './components/ListContainer';
import MainList from './components/MainList';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      allLists: [],
      selectedList: null,
      hubConnection: null,
    }
  }

  addList(){
    this.setState({
      selectedList: { name: "New Shopping List"}
    })
  }

  selectList(list){
    const  _this = this;
    axios.get('http://localhost:1811/api/shoppingLists/' + list.id)
    .then(function(response) {
      _this.setState(
        {
          selectedList: response.data
        }
      );
    });
  }

  saveListName(name){
    const _this = this;
    const list = this.state.selectedList;
    list.name= name;
    if (list.id >= 0){
      axios.put('http://localhost:1811/api/shoppingLists/' + list.id, list)
      .then(function(response) {
        _this.refreshLists();
        
      });
    }
    else{
      axios.post('http://localhost:1811/api/shoppingLists', list)
      .then(function(response) {
        _this.refreshLists();
      });
    }    
  }

  addItem(item){
    const _this = this;
    const list = this.state.selectedList;
    const itemToAdd = {name: item, purchased: false};

    axios.post('http://localhost:1811/api/shoppingLists/'+ list.id+ '/Items', itemToAdd)
    .then(function(response) {
      list.items.push(response.data);
      _this.setState({
        selectedList: list
      });
    });
  }
  
  saveItem(item){
    const _this = this;
    const list = this.state.selectedList;
    axios.put('http://localhost:1811/api/shoppingLists/'+ list.id+ '/Items/' + item.id, item)
    .then(function(response){
      const list =  _this.state.selectedList;      
      const index = list.items.findIndex(i => i.id === item.id);
      list.items.splice(index, 1, item);
      _this.setState({
        selectedList: list
      });
    });
    
  }

  refreshLists(){
    const  _this = this;
      axios.get('http://localhost:1811/api/shoppingLists')
          .then(function(response) {
            _this.setState(
              {
                allLists: response.data
              }
            );
          });
  }
  
  componentDidMount(){
    this.refreshLists();
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        <Grid>
          <Row className="show-grid">
            <Col md={3} >
                <MainList lists={this.state.allLists} selectList={(list)=> this.selectList(list)} addList={()=> this.addList()}></MainList>
          </Col>
          <Col md={8}>
          { this.state.selectedList && 
            <ListContainer 
              name={this.state.selectedList.name} 
              items={this.state.selectedList.items}
              updateName={(name) => this.saveListName(name)} 
              addItem={(item) => this.addItem(item)}
              updateItem={(item) => this.saveItem(item)}></ListContainer>
          }
          </Col>
          </Row>
          </Grid>
        </div>
      </div>
    );
  }

}

export default App;
