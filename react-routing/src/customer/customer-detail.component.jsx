import React, { Component } from 'react';

class CustomerDetail extends Component {
    render(){
        // Car array
        const customers = this.props.data;
        // Car Id from param
        const id = this.props[0].match.params.id;
        // Filter car with ID
        const customer = customers.filter(customer => {
            if(customer._id == id) {
                return customer;
            }
        });

        return (
            <div>
                <h1>{customer[0].name.first}</h1>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                    </div>
                    <div className="col-sm-6 col-md-4">
                       <ul>
                           <li><strong>Name</strong>: {customer[0].name.first}</li>
                       </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerDetail
