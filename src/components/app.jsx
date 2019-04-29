import React, { Component } from 'react';
import giphy from 'giphy-api';
import SearchBar from './search_bar';
import Gif from './gif';
import GifList from './gif_list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      selectedGifId: '4KdtAcSh3pMD6'
    };
  }

  search = (query) => {
    giphy('CjLxP0mzR2jAMD752sKC7StXEXAkqRyG').search({
      q: query,
      limit: 10
    }, (err, res) => {
      // console.log(res);
      this.setState({
        gifs: res.data
      });
    });
  };

  render() {
    return (
      <div>
        <div className="left-scene">
          <SearchBar searchFunction={this.search} />
          <div className="selected-gif">
            <Gif id={this.state.selectedGifId} />
          </div>
        </div>
        <div className="right-scene">
          <GifList ids={this.state.gifs} />
        </div>
      </div>
    );
  };
};

export default App;
