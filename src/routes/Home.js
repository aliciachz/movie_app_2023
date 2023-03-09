import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import '../styles/Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        'https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count'
      );
      const { movies } = response.data.data;
      setIsLoading(false);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='container'>
      {isLoading ? (
        <div className='loader'>
          <span className='loader_text'>Loading...</span>
        </div>
      ) : (
        <div className='movies'>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
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

export default Home;
