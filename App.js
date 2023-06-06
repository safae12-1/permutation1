import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AccueilScreen from './components/AccueilScreen';
import InscriptionScreen from './components/InscriptionScreen';
import AProposScreen from './components/AProposScreen';
import ConnexionScreen from './components/ConnexionScreen';
import Profil from './components/Profil';
import Rechercher from './components/Rechercher';
import Combinaisons from './components/Combinaisons';
import Menu from './components/Menu';

import { AuthProvider } from './components/context/AuthContext'; // Import the AuthProvider

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Accueil"
          drawerContent={(props) => <Menu {...props} />}>
          <Drawer.Screen name="Accueil" component={AccueilScreen} />
          <Drawer.Screen name="A propos" component={AProposScreen} />
          <Drawer.Screen name="Connexion" component={ConnexionScreen} />
          <Drawer.Screen name="Inscription" component={InscriptionScreen} />
          <Drawer.Screen name="Profil" component={Profil} />
          <Drawer.Screen name="Rechercher" component={Rechercher} />
          <Drawer.Screen name="Combinaisons" component={Combinaisons} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
