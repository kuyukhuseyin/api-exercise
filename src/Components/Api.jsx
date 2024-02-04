import React, { Component } from "react";
import axios from "axios";
import "./main.css";
export default class Api extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonData: [],
      pageUrl: "https://pokeapi.co/api/v2/pokemon/",
      nextPageUrl: "",
      previousPageUrl: "",
    };
  }
  componentDidMount() {
    axios.get(this.state.pageUrl).then(async (response) => {
      let pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          let res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            sprite: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
          };
        })
      );
      this.setState({ nextPageUrl: response.data.next });
      this.setState({ previousPageUrl: response.data.previous });
      this.setState({ pokemonData });
    });
  }

  nextPageEvent = () => {
    this.setState({
      pageUrl: this.state.nextPageUrl,
    });

    axios.get(this.state.pageUrl).then(async (response) => {
      let pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          let res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            sprite: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
          };
        })
      );
      this.setState({ nextPageUrl: response.data.next });
      this.setState({ previousPageUrl: response.data.previous });
      this.setState({ pokemonData });
    });
  };

  prevPageEvent = () => {
    this.setState({
      pageUrl: this.state.previousPageUrl,
    });

    axios.get(this.state.pageUrl).then(async (response) => {
      let pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          let res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            sprite: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
          };
        })
      );
      this.setState({ nextPageUrl: response.data.next });
      this.setState({ previousPageUrl: response.data.previous });
      this.setState({ pokemonData });
    });
  };

  render() {
    return (
      <div>
        <table className="tble">
          <tbody>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>HP</th>
              <th>Attack</th>
              <th>Defence</th>
            </tr>
            {this.state.pokemonData.map((pokemon, index) => (
              <tr key={index}>
                <td>
                  <img src={pokemon.sprite} alt={pokemon.name} />
                </td>
                <td>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </td>
                <td>{pokemon.hp}</td>
                <td>{pokemon.attack}</td>
                <td>{pokemon.defense}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.prevPageEvent}>Previous Page</button>
        <button onClick={this.nextPageEvent}>Next Page</button>
      </div>
    );
  }
}
