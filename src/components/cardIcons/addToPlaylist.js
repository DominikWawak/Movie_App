import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  // const handleAddToFavorites = (e) => {
  //   e.preventDefault();
  //   context.addToFavorites(movie);
  // };
  return (
    <IconButton aria-label="add to favorites">
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;