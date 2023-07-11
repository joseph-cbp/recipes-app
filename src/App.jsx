import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
// import Meals from './pages/Meals';
import Done from './pages/Done';
// import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes/Recipes';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/meals"
        render={ () => (
          <Layout
            search
            pageTitle="Meals"
            footer
          >
            <Recipes recipeType="meal" />
          </Layout>
        ) }
      />
      <Route
        path="/meals/:id"
        component={ MealDetails }
      />
      <Route
        path="/drinks"
        render={ () => (
          <Layout
            search
            pageTitle="Drinks"
            footer
          >
            <Recipes recipeType="drink" />
          </Layout>
        ) }
      />
      <Route
        path="/drinks/:id"
        component={ DrinkDetails }
      />
      <Route
        path="/done-recipes"
        render={ () => (
          <Layout
            pageTitle="Done Recipes"
          >
            <Done />
          </Layout>
        ) }
      />
      <Route
        path="/favorite-recipes"
        render={ () => (
          <Layout
            pageTitle="Favorite Recipes"
          >
            <Favorites />
          </Layout>
        ) }
      />
      <Route
        path="/profile"
        render={ () => (
          <Layout
            pageTitle="Profile"
            footer
          >
            <Profile />
          </Layout>
        ) }
      />
    </Switch>
  );
}

export default App;
