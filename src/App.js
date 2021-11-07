import React, {Component} from 'react';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      userName: 'Zo',
      todoItems: [
        {action: 'Buy Milk', done: false},
        {action: 'Meeting', done: false},
        {action: 'Jogging', done: false},
      ],
      newToDo: '',
    };
  }

  updateValue = (event) => {
    //set state. find newtodo, target input value
    this.setState({newToDo: event.target.value});
  };

  newToDo = () => {
    this.setState({
      todoItems: [
        ...this.state.todoItems,//call exsisting item
        {action: this.state.newToDo, done: false},//new item to be merged and captured from state.newtodo
      ],
    });
  };

  toggleDone = (todo) => //data item pass into todo, at toggledone function. item (line 44) = todo
  this.setState({
    todoItems: this.state.todoItems.map((item) =>
      item.action === todo.action //when item inside action is searched, it will be matched with todo action, inside todoitems
      ? { ...item, done: !item.done } : item 
      ),
  });

  todoRows = () => //take this data from state/todoitems. map will allow cycle through each item in array and extract them (for each item)
    this.state.todoItems.map((item) => (
      <tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input type="checkbox" checked={item.done} onChange={() => this.toggleDone(item)/*pass item information to toggle done function*/} />
        </td>
      </tr>
    ));

  render = () => (
    <div class="container">
      <div className="row">
        <div className="col-12">
          <h2 className="bg-primary text-white text-center p2">
            {this.state.userName}'s To do list
          </h2>
        </div>
        <div className="col-12">
          <input
            className="form-control" value={this.state.newToDo} onChange={this.updateValue}
          />
          <button className="btn btn-primary" onClick={this.newToDo} /*on click, this will run newtodo function*/>
            Add
          </button>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>{this.todoRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}