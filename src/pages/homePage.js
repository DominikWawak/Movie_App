import React, { useEffect, useState ,createContext,useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites'
import PageNumContext from "../contexts/pageNumberContext.js"
import Paginator from "../components/Paginator";
import { Carousel, CarouselItem } from "react-bootstrap";


const HomePage = (props) => {
  
  //console.log("PLEASE WORK",props.pagenum)
  const [currentPage,setCurrentPage] = useState(1); 

  // try no chaching
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(currentPage).then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage]);

  // const {  data, error, isLoading, isError }  = useQuery('discover', getMovies.bind(this,currentPage))
  
  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }  
  //const movies = data.results;
  
     
  const handlePageClicked = (data) =>{
    setCurrentPage(data.selected +1)
    console.log("clicked",data.selected)
    
    
  }

  console.log("outside",currentPage)
  
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 


  return (
    <>
    <div style={{backgroundColor:'#2E3B55'}}>
   <Carousel>

     {movies.map((movie)=>{
       return(
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={"https://image.tmdb.org/t/p/original"+movie.backdrop_path}
          alt={movie.original_title}
        />
        <Carousel.Caption>
          <h3>{movie.original_title}</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
       )
     })}
 
</Carousel>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
    
      }}
      
     
    />
    <Paginator clickFunction = {handlePageClicked}/>
    </div>
    </>
);
};

export default HomePage;