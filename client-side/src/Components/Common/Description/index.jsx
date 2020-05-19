import React, { Component } from 'react';

class Description extends Component {

    render = () => {
        const id = this.props.match.params.id;

        return (
            <div>
                <h1>coin_id: {id}</h1>
            </div>
        )
    }
}

export default Description;