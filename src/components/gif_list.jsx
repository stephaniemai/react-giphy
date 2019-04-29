import React, { Component } from 'react';
import Gif from './gif';

// class GifList extends Component {
//   render() {
//     return (
//       <div className="gif-list">
//         { this.props.ids.map((gif) => {
//           return <Gif id={gif.id} key={gif.id} />
//         })}
//       </div>
//     )
//   }
// }

class GifList extends Component {
  renderList = () => {
    return this.props.ids.map(gif => <Gif id={gif.id} key={gif.id} />);
  };

  render() {
    return (
      <div className="gif-list">
        { this.renderList() }
      </div>
    )
  }
}

export default GifList;
