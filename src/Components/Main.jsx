import React, { useState } from 'react';
import './Main.css';
import logoImage from '../images/logo.png';
import heartImage from '../images/heart.png';
import heartImage2 from '../images/heart2.png';
import { Link } from 'react-router-dom';

const Main = ({ lists, setLists }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState([]);
  const [listName, setListName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  const updateFilms = (updatedFilms) => {
    setFilms(updatedFilms);
  };

  const handleSearchClick = async () => {
    try {
      const apiKey = '461172b1';
      const apiUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Search) {
        updateFilms((prevFilms) =>
          data.Search.map((film) => ({
            ...film,
            isFavorite:
              prevFilms.some((fav) => fav.imdbID === film.imdbID) ||
              favorites.some((fav) => fav.imdbID === film.imdbID),
          }))
        );
        setShowNoResults(false);
      } else {
        setShowNoResults(true);
        setFilms([]);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleSaveListClick = () => {
    if (!listName) {
      window.alert('Please enter a list name');
      return;
    }
    const isListNameExists = lists.some((savedList) => savedList.name === listName);

    if (isListNameExists) {
      window.alert('List with this name already exists. Please choose a different name.');
      return;
    }

    if (favorites.length === 0) {
      window.alert('Please add at least one movie to the list before saving');
      return;
    }

    const newList = {
      name: listName,
      films: favorites.map((film) => ({ imdbID: film.imdbID, Title: film.Title })),
    };

    setLists((prevLists) => [...prevLists, newList]);
    setListName('');
    setFavorites([]);
  };

  const handleFavoriteClick = (film) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.imdbID === film.imdbID);

      if (isAlreadyFavorite) {
        const updatedFavorites = prevFavorites.filter((fav) => fav.imdbID !== film.imdbID);
        updateFilms((prevFilms) =>
          prevFilms.map((prevFilm) =>
            prevFilm.imdbID === film.imdbID ? { ...prevFilm, isFavorite: false } : prevFilm
          )
        );
        return updatedFavorites;
      }
      const updatedFavorites = [...prevFavorites, film];
      updateFilms((prevFilms) =>
        prevFilms.map((prevFilm) =>
          prevFilm.imdbID === film.imdbID ? { ...prevFilm, isFavorite: true } : prevFilm
        )
      );
      return updatedFavorites;
    });
  };

  const handleRemoveFromFavorites = (film) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.imdbID !== film.imdbID));

    setFilms((prevFilms) =>
      prevFilms.map((prevFilm) =>
        prevFilm.imdbID === film.imdbID ? { ...prevFilm, isFavorite: false } : prevFilm
      )
    );
  };

  return (
    <div className="all">
      <div className="head">
        <img className="logo" src={logoImage} alt="logo" />
        <div id="language">
          <p>AZ</p><p><b>EN</b></p><p>RU</p>
        </div>
      </div>
      <div id="container">
        <div id="movies">
          <div className="search">
            <input id="first" type="text"
              value={searchTerm} onChange={handleSearchChange}
              placeholder="Enter movie..."/>
            <button type="button" id="butt" onClick={handleSearchClick}>Search </button>
          </div>
          {showNoResults && ( 
          <div>
            <p id="no-res">No results</p>
          </div>
          )}
          {films.map((film) => (
            <div id="films" key={film.imdbID}>
              <img id="posters" src={film.Poster} alt={'film\'s Poster'} />
              <div className="film-details">
                <h4 id="title">{film.Title}</h4>
                <div id="more-fav">
                  <p id="link">
                    <a href={`https://www.imdb.com/title/${film.imdbID}`}
                      target="_blank">More</a>
                  </p>
                  <img id="heart"  alt="favIcon"
                    src={film.isFavorite ? heartImage2 : heartImage}
                    onClick={() => handleFavoriteClick(film)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="div">
          <h2 id="h2">My Lists</h2>
          <input type="text" id="second"
            value={listName} onChange={handleListNameChange}
            placeholder="Enter list..."
          />
          {favorites.length > 0 && (
            <div>
              <ul id="ul">
                {favorites.map((film) => (
                  <div id="li-x" key={film.imdbID}>
                    <li id="li" key={film.imdbID}>
                      {film.Title}
                      <button type="button" id="remove"
                        onClick={() => handleRemoveFromFavorites(film)}>x</button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <button type="button" id="save" onClick={handleSaveListClick}>
            Save
          </button>
          <Link id="saved-lists" to="/favorites">
            Saved lists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;