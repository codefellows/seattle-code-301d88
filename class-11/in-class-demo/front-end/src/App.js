import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async() => {
    try {
      // make a call to my server/cats to get cats
      let catData = await axios.get(`${process.env.REACT_APP_SERVER}/cats`);
      // catData.data
      this.setState({
        cats: catData.data
      })

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log(this.state.cats);
    let cats = this.state.cats.map(cat => (
      <p key={cat._id}>{cat.name} is a {cat.color}</p>
    ))
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            {cats}
          </>
        }
        </main>
      </>
    );
  }
}

export default App;
