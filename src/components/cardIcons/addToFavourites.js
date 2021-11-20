import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth } from "../../contexts/AuthContext";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
 const currentUser= useAuth()
 //console.log("CARD",currentUser)
  const handleAddToFavorites = (e) => {
    if(currentUser.currentUser!= null){
    e.preventDefault();
    context.addToFavorites(movie);
    }
  };
  return (
    
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;