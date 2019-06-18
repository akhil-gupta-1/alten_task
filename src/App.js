import React, { Component } from 'react';
import './App.css';
import { Autocomplete } from 'react-md';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { uniqBy } from 'lodash/array';
import UserChip from './UserChip';
import {dataForChip} from './constant';


class App extends Component {
  constructor() {
    super();
    this.state = {
      chipList: [],
      userList:[],
      filteredUsers:[],
    }
  }

  componentDidMount = () =>{
    let dataForControl = [];
    dataForChip.forEach(element => {
      dataForControl.push({
        name: element.name,
        abbreviation: element.abbreviation,
        id: element.id
      });
    });
    this.setState({userList : dataForControl, filteredUsers: dataForControl});
  }

  removeChip = (state) => {
    const chipList = this.state.chipList.slice();
    chipList.splice(chipList.indexOf(state), 1);
    this.setState({ chipList });
    this.state.filteredUsers.push({
      name: state.name,
      abbreviation: state.abbreviation,
      id: state.id,
    });
  }

  addStateChip = (state, stateIndex, userList) => {
    const newStates = [
      ...this.state.chipList,
      userList[stateIndex],
    ];

    this.setState({ chipList: uniqBy(newStates, s => s.name) });
    this.filterUsersList(userList[stateIndex]);
  }

  filterUsersList(deleteUser){
    if (
      this.state.filteredUsers &&
      this.state.filteredUsers.length > 0
    ) {
      let obj1 = this.state.filteredUsers.find(
        x => x.id === deleteUser.id
      );
      let index = this.state.filteredUsers.indexOf(obj1);
      if (index > -1) this.state.filteredUsers.splice(index, 1);
    }
  }

  render() {
    let filteredUsers = this.state.filteredUsers;
    let dataChips = this.state.chipList.map(state => {
      return (<UserChip
        key={state.name}
        value={state.id}
        state={state}
        onClick={this.removeChip}
      />)
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <br/>
          <CSSTransitionGroup
            transitionName="opacity"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
            component="div"
            className="chip-list"
            id="RaidChipList"
          >
            {dataChips}
            <Autocomplete
              id="chipList"
              name="chipList"
              className="chipList"
              data={filteredUsers}
              dataLabel="name"
              placeholder="Select User"
              onAutocomplete={this.addStateChip}
              clearOnAutocomplete
              fullWidth
              deleteKeys="abbreviation"
            />
          </CSSTransitionGroup>
      </div>
    );
  }
}

export default App;
