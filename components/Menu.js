import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from './context/AuthContext';

const Menu = () => {
  const navigation = useNavigation();
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToScreen('Accueil')}>
        <Text style={styles.menuItem}>Accueil</Text>
      </TouchableOpacity>
      { !isLoggedIn &&
        <TouchableOpacity onPress={() => navigateToScreen('Inscription')}>
        <Text style={styles.menuItem}>Inscription</Text>
      </TouchableOpacity>
      }
      {isLoggedIn ? (
        <>
          <TouchableOpacity onPress={() => navigateToScreen('Profil')}>
            <Text style={styles.menuItem}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Rechercher')}>
            <Text style={styles.menuItem}>Rechercher</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Combinaisons')}>
            <Text style={styles.menuItem}>Combinaisons</Text>
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity onPress={() => navigateToScreen('A propos')}>
        <Text style={styles.menuItem}>A propos</Text>
      </TouchableOpacity>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.menuItem}>Sign out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigateToScreen('Connexion')}>
          <Text style={styles.menuItem}>Connexion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default Menu;