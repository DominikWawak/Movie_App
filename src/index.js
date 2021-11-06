import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage.js";
import upcomingMoviesPage from "./pages/upcomingMoviesPage.js";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import { PageNumProvider } from "./contexts/pageNumberContext";
import signUpPage from "./pages/signUpPage"
import logIn from "./pages/logInPage"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/privateRoute"
import forgotPassword from "./components/forgotPassword";
import UpdateProfile from "./components/updateProfile.js";


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
        <Route exact path="/signUp" component={signUpPage} />
        <Route exact path="/logIn" component={logIn} />
        <Route path="/forgotPassword" component={forgotPassword} />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <PrivateRoute exact path="/updateProfile" component={UpdateProfile}/>
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