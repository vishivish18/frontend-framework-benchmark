import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Customer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      customers:[]
    };
  }


  componentWillMount() {
      this.fetchData();
  }

  fetchData(){
    this.setState({
            loading: true
        });

    var _this = this;
    axios.get("http://localhost:1818/data/list")
    .then(function (response) {
      console.log(response);
      _this.setState({
            customers: response.data,
            loading: false
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  render(){
        // Get data from route props
        console.log(this.state)
        const customers = this.state.customers;
        return (
            <div>                
                <table className="table table-hover table-striped table-bordered ">
                        <thead>
                          <tr>
                            <th>Customer Name</th>
                            <th>Plan</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Subscribed On</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                        {customers.map(customer =>
                          <tr key={customer._id}>
                              <td>
                                {customer.name.first}
                              </td>
                              <td>
                                {customer.field_title}
                              </td>
                              <td></td>
                              <td>
                                {customer.customer_type}
                              </td>
                              <td>
                                {customer.date_joined}
                              </td>
                              <td>
                                <Link
                                  to={"/customer/"+customer._id}
                                  key={customer._id}>
                                  Details
                                </Link>
                              </td>
                          </tr>)}
                        </tbody>
                </table>
            </div>
        );
    }
}

export default Customer
