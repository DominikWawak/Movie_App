import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage.js";
import upcomingMoviesPage from "./pages/upcomingMoviesPage.js";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
            {" "}
      <Switch>
        <Route exact path="/movies/upcoming" component={upcomingMoviesPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));