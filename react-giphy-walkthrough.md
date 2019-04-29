# React Giphy Walk-through

## App

1. Create the `app.jsx` file in the `src/components`
2. Export it and import it in `index.jsx`
3. Modify `index.jsx` so that the App is rendered in the DOM.

## SearchBar

1. Basic skeleton of the Class

```javascript
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
  }
}

export default SearchBar;
```

2. Add what should be returned

```javascript
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <input type="text" className="form-control form-search" />
    );
  }
}

export default SearchBar;
```

3. Import and call the SearchBar component in `app.jsx`

## gif

1. Add the Selected gif class in a div in `app.jsx`
2. Add the Gif component in `app.jsx`
3. Create file `components/gif.jsx`
4. Export the component and import it in the app file
5. Code the render method of the component
```javascript
import React, { Component } from 'react';

class Gif extends Component {
  render() {
    const src = `https://media.giphy.com/media/4KdtAcSh3pMD6/giphy.gif`;
    return (
      <img src={src} alt="" className="gif"/>
      );
  }
}

export default Gif;
```
But the gif is static. We want to use the instance props so that it is dynamically rendered.

6. Set the ID of the GIF as a variable
```javascript
import React, { Component } from 'react';

class Gif extends Component {
  render() {
    const src = `https://media.giphy.com/media/${this.props.id}/giphy.gif`;
    return (
      <img src={src} alt="" className="gif"/>
      );
  }
}

export default Gif;
```
7. Set the ID in the app.jsx file
```javascript
<Gif id='4KdtAcSh3pMD6'/>
```

## gifList

1. Create `gif_list.jsx`, export it and import it in `app.jsx`
2. Use the GifList component in the div of the right scene.
3. The GifList needs to be passed an array of gif IDs. We have to create a variable in the app to store the array and pass it to the component.

in ```app.jsx```

```javascript
class App extends Component {

  render() {
    const gifs = [
      { id: 'v81jf4fMpR3dC'},
      { id: '891wroLZ521vq'}
    ];
    return (
      <div>
        <div className="left-scene">
          <SearchBar />
          <div className="selected-gif">
            <Gif id='4KdtAcSh3pMD6'/>
          </div>
        </div>
        <div className="right-scene">
          <GifList ids= { gifs } />
        </div>
      </div>
    );
  };
};
```

4. Now the this.props.gifs of the GifList component is the array of objects containing the IDs. We want to loop over the array.
5. In the gif_list.jsx, import the Gif component. Use the map method to loop over the array. Note that we need 2 return statements, one for the GifList and one for each Gif.

```javascript
import React, { Component } from 'react';
import Gif from './gif';

class GifList extends Component {
  render() {
    return this.props.ids.map((gif) => {
      return <Gif id={gif.id} />
    })
  }
}

export default GifList;
```

6. The browser console displays a warning: ```Each child in an array or iterator should have a unique "key" prop``` so we need to add a key propriety for each gif returned. The key propriety needs a unique identifier, so we'll use the giphy ID.
```javascript
return <Gif id={gif.id} key={gif.id}/>
```

7. Wrap it in a div to apply the CSS class gif-list. Note that we need { } after the div tag.
```javascript
class GifList extends Component {
  render() {
    return (
      <div className="gif-list">
        { this.props.ids.map((gif) => {
          return <Gif id={gif.id} key={gif.id} />
        })}
      </div>
    )
  }
}
```

8. Refactoring in a function renderList

```javascript
class GifList extends Component {
  renderList = () => {
    return this.props.ids.map((gif) => {
      return <Gif id={gif.id} key={gif.id} />;
    });
  };

  render() {
    return (
      <div className="gif-list">
        { this.renderList() }
      </div>
    )
  }
}
```

9. Use implicit return in the renderList function. Note the absence of () around the definition of the child element and of { } after the fat arrow.

```javascript
  renderList = () => {
    return this.props.ids.map(gif => <Gif id={gif.id} key={gif.id} />);
  };
```

## Add states to the App

1. Add a constructor method to the app.
It will store the values needed by the component and the default ones.

```javascript
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      selectedGifId: '4KdtAcSh3pMD6'
    };
  }
  // ...
}
```

2. Use the new state properties in the render method.

```javascript
    render() {
      return (
        <div>
          <div className="left-scene">
            <SearchBar />
            <div className="selected-gif">
              <Gif id={this.state.selectedGifId} />
            </div>
          </div>
          <div className="right-scene">
            <GifList ids= { this.state.gifs } />
          </div>
        </div>
      );
    }
```

## Fill the list from the search bar

Objective: Every time we type a letter in the search bar we want to call the function and fetch the gif IDs.

1. Add an event listener in the SearchBar component

```javascript
render() {
    return (
      <input type="text" className="form-control form-search" onChange={this.handleUpdate} />
    );
  }
```

2. Create the handleUpdate method of the SearchBar. For now, we just want to display the keys stroke by the user

```javascript
  handleUpdate = (event) => {
    console.log(event.target.value);
  };
```

3. We want to update the state.gifs array of the app, so we will implement a function ```search``` that calls the Giphy API. Look for a Giphy package in npm. Note that the doc mentions to use 'require', which is ```import``` in ES2015.
In app.jsx:

```javascript
import giphy from 'giphy-api';
```

So the syntax
```javascript
var giphy = require('giphy-api')('API KEY HERE');
```
becomes

```javascript
import giphy from 'giphy-api';

class App extends Component {
  // ...
  search = (query) => {
    giphy('YOUR_API_KEY').search({
      q: query,
      limit: 7
    }, (err, res) => {
      console.log(res);
    });
  };
}
```

4. To test it, we call the search method into the constructor with a static query.


```javascript
class App extends Component {
  constructor(props) {
    //...
    this.search('vintage');
  }
  //...
}
```

Result:
```json
{data: Array(7), pagination: {…}, meta: {…}}
data: Array(7)
0: {type: "gif", id: "QMozgDyV3CutNj2cVs", slug: "90s-80s-QMozgDyV3CutNj2cVs", url: "https://giphy.com/gifs/90s-80s-QMozgDyV3CutNj2cVs", bitly_gif_url: "https://gph.is/2pABo3C", …}
1: {type: "gif", id: "nIM0pmYCPZ11S", slug: "vintage-nostalgia-the-real-ghostbusters-nIM0pmYCPZ11S", url: "https://giphy.com/gifs/vintage-nostalgia-the-real-ghostbusters-nIM0pmYCPZ11S", bitly_gif_url: "https://gph.is/15QgsKV", …}
2: {type: "gif", id: "POQ8hywutpYIw", slug: "vintage-movie-black-and-white-POQ8hywutpYIw", url: "https://giphy.com/gifs/vintage-movie-black-and-white-POQ8hywutpYIw", bitly_gif_url: "https://gph.is/YBD5bP", …}
3: {type: "gif", id: "7LdWVapE6xfK8", slug: "thegoodfilms-black-and-white-vintage-7LdWVapE6xfK8", url: "https://giphy.com/gifs/thegoodfilms-black-and-white-vintage-7LdWVapE6xfK8", bitly_gif_url: "https://gph.is/14s3nmd", …}
4: {type: "gif", id: "26xBEHMc1NgkDyGwU", slug: "26xBEHMc1NgkDyGwU", url: "https://giphy.com/gifs/26xBEHMc1NgkDyGwU", bitly_gif_url: "https://gph.is/2ktMG69", …}
5: {type: "gif", id: "f2amVVgFXoUAo", slug: "50s-british-path-f2amVVgFXoUAo", url: "https://giphy.com/gifs/50s-british-path-f2amVVgFXoUAo", bitly_gif_url: "https://gph.is/1fMqJ8w", …}
6: {type: "gif", id: "xThtacAEJQWyTpBdIs", slug: "movie-film-fashion-xThtacAEJQWyTpBdIs", url: "https://giphy.com/gifs/movie-film-fashion-xThtacAEJQWyTpBdIs", bitly_gif_url: "https://gph.is/2EjlNjo", …}
length: 7
__proto__: Array(0)
meta: {status: 200, msg: "OK", response_id: "5cc6c4067768753763e1a0a7"}
pagination: {total_count: 21732, count: 7, offset: 0}
__proto__: Object
```

5. Let's update the state of the component with this array of objects

```javascript
search = (query) => {
    giphy('CjLxP0mzR2jAMD752sKC7StXEXAkqRyG').search({
      q: query,
      limit: 7
    }, (err, res) => {
      this.setState({
        gifs: res.data
      });
    });
  }
```

6. Now that the search function works, let's use it from the search bar input and not the constructor. The search function in the App, which is a parent of the SearchBar. To give data to the child element, the parent has to pass props. Props can be functions too, they're just considered as a piece of data by JS.

```javascript
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
          <GifList ids={this.state.gifs } />
        </div>
      </div>
    );
  };
```

7. Call the search function in the SearchBar component

```javascript
class SearchBar extends Component {
  handleUpdate = (event) => {
    this.props.searchFunction(event.target.value);
  }
}
```





























