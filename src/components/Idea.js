import React, { Component } from 'react'


class Idea extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='tile' >
                <h4>{this.props.idea.title}</h4>
                <p> {this.props.idea.body}</p>
            </div>
        );
    }
}



export default Idea;




