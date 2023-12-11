import React from 'react';
import './FavPage.css';

const FavPage = ({ lists }) => {
  return (
    <div id='all2'>
      <div id='container2'>
        <div id='head2'>
          <h2>SAVED LISTS</h2>
        </div>
        <div id='div-ul'>
          {lists && lists.length > 0 ? (
            <ol id='ol'>
              {lists.map((list) => (
                <li id='li2' key={list.name}>
                  <h3>{list.name}</h3>
                  <ol id='ul2'>
                    {list.films.map((film) => (
                      <li id='li3' key={film.imdbID}>{film.Title}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          ) : (
            <p id='no'>No saved lists</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavPage;
