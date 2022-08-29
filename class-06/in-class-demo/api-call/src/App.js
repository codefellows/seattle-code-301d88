import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: [],
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''
    }
  }

  // *** CITY DATA DEMO HANDLERS ***

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    // build out the URL with the query parameters needed to get data back from LocationIQ
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

    let cityData = await axios.get(url);

    console.log(cityData.data[0]);

    // FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example:
    // `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`
  }

  handleGetPokemon = async (e) => {
   e.preventDefault();
    try {
      // make a request to the Pokemon API and get data using Axios
      let pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon');

      // proof of life
      // console.log(pokemonData.data.results);
      // save the data into state
      this.setState({
        pokemonData: pokemonData.data.results,
        error: false
      });
    } catch(error){
      console.log(error)
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.message}`
      });
    }
  }

  render() {
    console.log('app state: ', this.state);

    let pokemonItems = this.state.pokemonData.map((pokemon, index) => {
      return <li key={index}>{pokemon.name}</li>
    })
    return (
      <>
        <h1>Pokemon Data</h1>

        <form>
          <button onClick={this.handleGetPokemon}>Gotta Catch them all!</button>
        </form>
        {/* TERNARY: WTF to handle errors */}
      {
        this.state.error
        ?
        <p>{this.state.errorMessage}</p>
        :
        <ul>
          {pokemonItems}
        </ul>
      }

      {/* FORM TO HANDLE CITY DATA */}
        <form onSubmit={this.getCityData}>
          <label> Pick a city!
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>
      </>
    );
  }
}

export default App;
