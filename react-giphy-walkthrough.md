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
