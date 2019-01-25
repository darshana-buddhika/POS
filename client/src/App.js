import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Login from './Components/Login/Login'
import NavBar from './Components/NavBar/NavBar'
import Orders from './Components/Orders/Orders'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: '',
      token: '',
      orders: [],
      login_state: false
    }

  }
  addOrder = () => {

    const new_order = {
      user_id: this.state.user.user_id,
    }
    this.state.orders.length == 0 ? new_order.id = 1 : new_order.id = this.state.orders[this.state.orders.length - 1].id + 1

    axios.post('http://localhost:5000/api/order/addOrder',{ order: new_order }, {
      headers: {
        Authorization: `Bearar ${this.state.token}`
      }
    })
      .then((response) => { 
        this.getOrders()

      })
      .catch((err) => {
        console.error(err)
      })
  }

  getOrders = () => {

    axios.get('http://localhost:5000/api/order/', {
      headers: {
        Authorization: `Bearar ${this.state.token}`
      }
    })
      .then((response) => {
     
        this.setState({ orders: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  userLogedin = (user, token) => {
    // console.log(user)
    this.setState({ user: user, token: token, login_state: true })
    this.getOrders()


  }

  render() {

    return (
      <div>
        <NavBar logedIn={this.state.login_state} />
        <div className="content">
          <div className="wrapper">
            {
              !this.state.login_state ? <Login userLogin={this.userLogedin} /> : <Orders orders={this.state.orders} addOrder={this.addOrder} />
            }


          </div>
        </div>
      </div >
    )

  }

}
export default App;
