import axios from 'axios';
import React, { Component } from 'react';
import Movie from '../components/Movie';
import '../styles/Home.css';

export class Home extends Component {
  state = {
    isLoading: true,
    movies: [],
  };

  componentDidMount() {
    this.getMovies();
  }

  // An async function to fetch movies from the API
  getMovies = async () => {
    try {
      const response = await axios.get(
        'https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count'
      );
      const { movies } = response.data.data;
      console.log(movies);
      this.setState({
        isLoading: false,
        movies, // Equivalent to movies: movies
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, movies } = this.state; //구조 분해 할당 

    return (
      <section className='container'>
        {isLoading ? (
          <div className='loader'>
            <span className='loader_text'>Loading...</span>
          </div>
        ) : (
          <div className='movies'>
            {/* Map over the movies array and render a Movie component for each item */}
            {movies.map((movie, index) => (
              <Movie
                key={index}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;