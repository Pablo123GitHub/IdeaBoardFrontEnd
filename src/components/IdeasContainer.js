import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'
import IdeaForm from './IdeaForm'
import update from 'immutability-helper'

class IdeasContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ideas: [],
            editingIdeaId: null,
            notification: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/ideas')
            .then(res => {
                this.setState({
                    ideas:res.data
                })
            })
            .catch(err => console.log(err))
    }

    addNewIdea = () => {
        axios.post('http://localhost:3001/api/v1/ideas', {idea: {title: '', body: ''}})
            .then(res => {
                const ideas = update(this.state.ideas, { $splice: [[0, 0, res.data]]})
                this.setState({
                    ideas: ideas,
                    editingIdeaId: res.data.id
                })
            })
            .catch(err => console.log(err))
    }

    updateIdea = (idea) => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
        const ideas = update(this.state.ideas, {[ideaIndex]: { $set: idea }})
        this.setState({ideas: ideas, notification: "All Changes are saved"})
    }

    resetNotification = () => {
        this.setState({
            notification: ''
        })
    }


    render() {
        console.log('RENDER',this.state.ideas)

        return (
            <div className="App">
                <div className='flex-container'>
                    <button
                        className='newIdeaButton'
                        onClick={this.addNewIdea}
                    >
                        New Idea
                    </button>
                    <span>
                        {this.state.notification}
                    </span>

                    <div>
                          {this.state.ideas.map((idea)=>{
                              if(this.state.editingIdeaId === idea.id) {
                                  return (<IdeaForm key={idea.id} idea={idea}
                                                    updateIdea={this.updateIdea}
                                                    resetNotification = {this.resetNotification}
                                  />)
                              } else {
                                  return(
                                      <Idea key={idea.id} idea={idea}/>
                                  )
                              }
                        })}
                    </div>
                </div>


            </div>
        );
    }
}



export default IdeasContainer;
