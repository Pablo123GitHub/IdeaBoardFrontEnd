import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'

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


    render() {
        return (
            <div className="App">
                <div className='flex-container'>
                    <button className='newIdeaButton'>
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
