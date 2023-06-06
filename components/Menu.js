import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
        <View style={styles.menuItemContainer}>
          <FontAwesome name="home" size={20} style={styles.icon} />
          <Text style={styles.menuItem}>Accueil</Text>
        </View>
      </TouchableOpacity>
      {!isLoggedIn && (
        <TouchableOpacity onPress={() => navigateToScreen('Inscription')}>
          <View style={styles.menuItemContainer}>
            <FontAwesome name="user-plus" size={20} style={styles.icon} />
            <Text style={styles.menuItem}>Inscription</Text>
          </View>
        </TouchableOpacity>
      )}
      {isLoggedIn ? (
        <>
          <TouchableOpacity onPress={() => navigateToScreen('Profil')}>
            <View style={styles.menuItemContainer}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <Text style={styles.menuItem}>Profil</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Rechercher')}>
            <View style={styles.menuItemContainer}>
              <FontAwesome name="search" size={20} style={styles.icon} />
              <Text style={styles.menuItem}>Rechercher</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity onPress={() => navigateToScreen('A propos')}>
        <View style={styles.menuItemContainer}>
          <FontAwesome name="info-circle" size={20} style={styles.icon} />
          <Text style={styles.menuItem}>A propos</Text>
        </View>
      </TouchableOpacity>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.menuItemContainer}>
            <FontAwesome name="sign-out" size={20} style={styles.icon} />
            <Text style={styles.menuItem}>Sign out</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigateToScreen('Connexion')}>
          <View style={styles.menuItemContainer}>
            <FontAwesome name="sign-in" size={20} style={styles.icon} />
            <Text style={styles.menuItem}>Connexion</Text>
          </View>
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
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  menuItem: {
    fontSize: 20,
  },
});

export default Menu
