import React, { Component } from 'react'

export default class Square extends Component {

    render() {
        return (
            <div className ="square centermark" onClick={()=> this.props.selectSquare(this.props.id)}>
               {this.props.value} 
            </div>
        )
    }
}
