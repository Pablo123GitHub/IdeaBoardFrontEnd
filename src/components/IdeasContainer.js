import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'
import update from 'immutability-helper'

class IdeasContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ideas: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/ideas')
            .then(res => {
                console.log('RESPONSE', res)
                this.setState({
                    ideas:res.data
                })
            })
            .catch(err => console.log(err))
    }

    addNewIdea = () => {
        axios.post('http://localhost:3001/api/v1/ideas', {idea: {title: '', body: ''}})
            .then(res => {
                console.log('RESPONSE', res)
                const ideas = update(this.state.ideas, { $splice: [[0, 0, res.data]]})
                this.setState({
                    ideas: ideas
                })
            })
            .catch(err => console.log(err))


    }


    render() {
        return (
            <div className="App">
                <div className='flex-container'>
                    <button
                        className='newIdeaButton'
                        onClick={this.addNewIdea}
                    >
                        New Idea
                    </button>

                    <div>
                        {this.state.ideas.map((idea)=>{
                            return(
                                <Idea
                                    key={idea.id}
                                    idea={idea}
                                />
                            )
                        })}
                    </div>
                </div>


            </div>
        );
    }
}



export default IdeasContainer;
