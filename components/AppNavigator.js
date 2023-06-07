// Import necessary dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import AccueilScreen from './AccueilScreen';
import InscriptionScreen from './InscriptionScreen';
import AProposScreen from './AProposScreen';
import ConnexionScreen from './ConnexionScreen';
import Rechercher from './Rechercher';
import Profil from './Profil';

// Create a stack navigator
const Stack = createStackNavigator();

// Define your navigation component
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={AccueilScreen} />
      <Stack.Screen name="A Propos" component={AProposScreen} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Rechercher" component={Rechercher} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
