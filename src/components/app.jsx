import React, { Component } from 'react';
import SearchBar from './search_bar';
import Gif from './gif';
import GifList from './gif_list';

class App extends Component {
  render() {
    return (
      <div>
        <div className="left-scene">
          <SearchBar />
          <div className="selected-gif">
            <Gif id='4KdtAcSh3pMD6'/>
          </div>
        </div>
        <div className="right-scene">
          <GifList ids= { gifList } />
        </div>
      </div>
    );
  };
};

export default App;
