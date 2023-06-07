import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View,Text, StyleSheet } from 'react-native';
import AccueilScreen from './components/AccueilScreen';
import InscriptionScreen from './components/InscriptionScreen';
import AProposScreen from './components/AProposScreen';
import ConnexionScreen from './components/ConnexionScreen';
import Profil from './components/Profil';
import Rechercher from './components/Rechercher';
import Menu from './components/Menu';

import { AuthProvider } from './components/context/AuthContext'; // Import the AuthProvider

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
      <View style={styles.container}>
      <Text style={styles.title}>ProfSwap - أساتذة التعليم العالي</Text>
    </View>
        <Drawer.Navigator
          initialRouteName="Accueil"
          drawerContent={(props) => <Menu {...props} />}>
          <Drawer.Screen name="Accueil" component={AccueilScreen} />
          <Drawer.Screen name="A propos" component={AProposScreen} />
          <Drawer.Screen name="Connexion" component={ConnexionScreen} />
          <Drawer.Screen name="Inscription" component={InscriptionScreen} />
          <Drawer.Screen name="Profil" component={Profil} />
          <Drawer.Screen name="Rechercher" component={Rechercher} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 20, 
    left: 0,
    right: 0,
    backgroundColor: '#5f83a7',
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20, /* Ajoutez cette propriété pour définir la marge inférieure */
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
 
});
export default App;
