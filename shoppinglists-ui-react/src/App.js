import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import ListContainer from './components/ListContainer';
import ListDetails from './components/ListDetails';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      allLists: [],
      selectedList: null,
      hubConnection: null,
    }
  }

  selectList(list){
    var  _this = this;
    axios.get('http://localhost:1811/api/shoppingLists/' + list.id)
    .then(function(response) {
      _this.setState(
        {
          selectedList: response.data
        }
      );
    });
  }
  
  refreshLists(){
    var  _this = this;
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
          <ListContainer className="col-3" lists={this.state.allLists} selectList={(list)=> this.selectList(list)}></ListContainer>
          { this.state.selectedList && 
          <ListDetails name={this.state.selectedList.name} items={this.state.selectedList.items}></ListDetails>
          }
        </div>
      </div>
    );
  }
}

export default App;
