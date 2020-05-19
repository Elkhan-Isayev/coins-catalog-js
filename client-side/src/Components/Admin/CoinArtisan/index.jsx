import React, { Component } from 'react';

class CoinArtisan extends Component {

    render = () => {
        const id = this.props.match.params.id;
        return (
            <div>
                id is =  {id}
            </div>
        )
    }
}

export default CoinArtisan;