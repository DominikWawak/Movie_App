import React, { useState ,useEffect} from "react";
import  { getFirestore, deleteDoc,collection,query, where, getDocs,limit,orderBy,doc,setDoc } from "firebase/firestore"
import { useAuth } from '../contexts/AuthContext'



export const MoviesContext = React.createContext(null);

const db = getFirestore();


const MoviesContextProvider = (props) => {
  
  const [favorites, setFavorites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )
  const currentUser = useAuth()
  
 
  const addWatchlist = (movie) => {
    setMustWatch([...mustWatch,movie.id])
  };
  // We will use this function in a later section
  const removeFromWatchList = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const favRef = collection(db,"favourites")

         useEffect(() => {
            const getFavourites = async() =>{
               
  
                const data = await getDocs(favRef)
                console.log(data)
                // map to the data in the database but not the id 
                const f = (data.docs.map((doc) => ({...doc.data(),id: doc.id})).filter(function (fa){
                    try{
                    return fa.email===  currentUser.currentUser.email}
                    catch{
                      
                    }
                }).map((movie)=> movie.movieID))
                //const f = (data.docs.map((doc) => ({...doc.data(),id: doc.id})).map((favourite) =>(favourite.movieID)))

                console.log("FAVVV",f)

                setFavorites(f)
                
            
            }
            
            getFavourites()
         }, [addToFavorites,currentUser])

  const addToFavorites = async (movie) => {
    
    console.log(movie)
    var id = movie.id
    const docRef = doc(db,"favourites",id+"")
    const payload = {movieID:id,email:currentUser.currentUser.email}

    await setDoc(docRef,payload)

    setFavorites([...favorites,movie.id])
  };
  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
      await deleteDoc(doc(db,"favourites",movie.id+""))

  };

  return (
    <MoviesContext.Provider
  
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addWatchlist,
        removeFromWatchList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;