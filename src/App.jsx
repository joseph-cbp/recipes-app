import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Meals from './pages/Meals';
import Done from './pages/Done';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';

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
            filter="meal"
            pageIcon="meal"
          >
            <Meals />
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
            filter="drink"
            pageIcon="drink"
          >
            <Drinks />
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
            pageIcon="done"
            filter="all"
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
            pageIcon="favorite"
            filter="all"
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
            pageIcon="profile"
          >
            <Profile />
          </Layout>
        ) }
      />
    </Switch>
  );
}

export default App;
