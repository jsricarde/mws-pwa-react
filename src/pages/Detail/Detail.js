import React, { Component } from 'react';

class Detail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('id', id);
  }

  render() {
    return (
      <div>
        <h1>
          Hi men
        </h1>
      </div>
    );
  }
}

export default Detail;
