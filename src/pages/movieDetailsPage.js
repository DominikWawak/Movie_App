import React from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'


const MovieDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const path=`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`

  return (
    <>
      {movie ? (
        <>
        <div style={{backgroundImage: `url(${path})`}}>
          <PageTemplate movie={movie}>

       
         
          {/* <img src={path}/> */}
            <div style={{backgroundColor:"white", color:'#2E3B55', marginTop:'20%'}}>
            <MovieDetails movie={movie} />
            </div>
            
          </PageTemplate>
          </div>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(MovieDetailsPage);