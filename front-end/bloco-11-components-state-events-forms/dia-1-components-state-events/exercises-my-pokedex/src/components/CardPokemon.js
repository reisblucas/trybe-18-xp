import React, { Component } from "react";
import '../App.css';
import Image from './Image';

class Card extends Component {
  render () {
    const { name, type, averageWeight: { value, measurementUnit }, image, moreInfo } = this.props.pokemons;
    return (
      <article className="ArtPoke">
        <div className="InfoColumn">
          <p>{name}</p>
          <p>{type}</p>
          <p>Average weight: {value} {measurementUnit}</p>
          <a href={moreInfo} target="_blank" rel="noreferrer"><button>More Info</button></a>
        </div>
        <vr style={{border: '1px solid lightgrey'}}/>
        <div className="ImageRow">
          <Image src={image} alt={`Pokemon image of ${name}`}/>
        </div>
      </article>
    );
  }
}

export default Card;