import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTodo} from "../actions/index";

import TodoItem from "./TodoItem";


class MyToDo extends Component {
    constructor(props) {
        super(props)

        // const data = store.getState();
        this.total = 0;
        this.items = [
            {
                id: 1,
                image: 'http://www.mcdonaldsindia.net/images/large/McAloo-Tikki-Econo-Meal.png',
                name: 'McAloo Tikki',
                price: 7,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 151px'},
                mar_button:{margin:'10px 10px 10px 135px'}
            },

            {
                id: 2,
                image: 'https://d1nqx6es26drid.cloudfront.net/app/uploads/2016/05/13043514/McVeggie.png',
                name: 'McVeggie',
                price: 10,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 173px'},
                mar_button:{margin:'10px 10px 10px 125px'}
            },
            {
                id: 3,
                image: 'http://www.mcdonaldsindia.net/images/large/EVM-McChicken.png',
                name: 'McChicken',
                price: 14,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 164px'},
                mar_button:{margin:'10px 10px 10px 125px'}
            },
            {
                id: 4,
                image: 'http://www.mcdonaldsindia.net/images/large/EVM-McSpicy-Paneer.png',
                name: 'McSpicy Paneer',
                price: 13,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 125px'},
                mar_button:{margin:'10px 10px 10px 127px'}
            },
            {
                id: 5,
                image: 'http://www.mcdonaldsindia.net/images/large/EVM-Chicken-Maharaja-Mac.png',
                name: 'Veg Maharaja Mac',
                price: 17,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 108px'},
                mar_button:{margin:'10px 10px 10px 127px'}
            },
            {
                id: 6,
                image: 'http://www.mcdonaldsindia.net/images/large/EVM-Chicken-Maharaja-Mac.png',
                name: 'Chicken Maharaja Mac',
                price: 20,
                quantity: 1,
                mar_price: {margin:'10px 10px 10px 77px'},
                mar_button:{margin:'10px 10px 10px 124px'}
            },

        ]

        this.itemsPurchased = [

        ]
    }
    search(id2,arr){
        for (var i=0; i < arr.length; i++) {
            if (arr[i].id === id2) {
                return arr[i];
            }
        }
    };
    add(Myid){
        console.info(Myid);
        var array=this.items;
        var result = this.search(Myid,array);

        this.total +=result.price;
        var indexOFAddedItem = this.itemsPurchased.findIndex(function (element, index, array) {
            if(Myid===element.id) {
                element.quantity++;
                return true;
            }

        });

        if (indexOFAddedItem < 0) {
            this.itemsPurchased.push(result);
        }

        console.info(this.itemsPurchased);
        this.forceUpdate();
    }
    remove(Myid){
        console.info(Myid);
        var val=this.total;
        var indexToDelete= this.itemsPurchased.findIndex(function (element, index, array) {
            if(Myid===element.id)  {
                console.log(val);
                val-=element.price;
                if (element.quantity>=2) {
                    element.quantity--;
                    return false;
                }else {
                    return true;
                }
            }

        });
        this.total = val;

        if (indexToDelete > -1) {
            this.itemsPurchased.splice(indexToDelete,1);
        }


        this.forceUpdate();

    }

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col xs={4} sm={4} md={4} lg={4}">
                        <h2 className="text-center">Food Ordering App</h2>

                    </div>
                </div>
                <hr/>
                <div className="card-deck">
                    <div className="card p-5 text-center">
                        <h1>Menu</h1>
                        <div className="card-block">
                            <br/>
                            <div>
                                {
                                    this.items.map( ( anObjectMapped, index ) => {
                                        return (
                                            <div className="row">
                                                <div className="col xs={11} sm={11} md={11} lg={11}">
                                                    <div className="card">
                                                        <div className="card-block">
                                                            <div className="card-text text-left">
                                                                <img src={anObjectMapped.image} height="60" width="60"/>
                                                                <text>{anObjectMapped.name}</text>
                                                                <text style={anObjectMapped.mar_price}>${anObjectMapped.price}</text>
                                                                <button onClick={() => {this.add(anObjectMapped.id);}} style={anObjectMapped.mar_button} className="btn btn-default">+</button>
                                                             </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                </div>
                                            </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="card p-5 text-center">
                        <h1>Cart</h1>
                        <div className="card-block">
                            {
                                this.itemsPurchased.map( ( anObjectMapped2, index ) => {
                                    return (
                                        <div className="row">
                                            <div className="col xs={11} sm={11} md={11} lg={11}">
                                            <br/>
                                            <div className="card">
                                                <div className="card-block">
                                                    <div className="card-text text-left">
                                                        <img src={anObjectMapped2.image} height="60" width="60"/>
                                                        <text>{anObjectMapped2.name}</text>
                                                        <text style={anObjectMapped2.mar_price}>${anObjectMapped2.price}</text>
                                                        <span className="badge badge-primary">Qty:{anObjectMapped2.quantity}</span>
                                                        <button onClick={() => {this.remove(anObjectMapped2.id);}} style={anObjectMapped2.mar_button} className="btn btn-default">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    );
                                }   )
                            }
                            <br/>
                            <div className="card">
                                <div className="card-block">
                                    <div className="card-text">
                                        <span> Total : </span>
                                        <h2>${this.total}</h2>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(todos) {
    const todoArr = Object.keys(todos).map((item) => (
        {
            'todo' : item,
            'status' : todos[item]
        }
    ));
    return {todoArr};
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyToDo);    // Learn 'Currying' in functional programming
