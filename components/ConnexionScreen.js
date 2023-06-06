import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from './context/AuthContext';
import Footer from './footer';
const ConnexionScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login, insertCurrentEmail } = useContext(AuthContext);

  const handleLogin = () => {
    if (email === '') {
      setEmailError('Veuillez remplir ce champ');
      return;
    }

    if (password === '') {
      setPasswordError('Veuillez remplir ce champ');
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    fetch('https://troubled-red-garb.cyclic.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        const { message, token } = data;
        if (message === 'Authentication successful') {
          login();
          insertCurrentEmail(email);
          navigation.navigate('Accueil');
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('Adresse e-mail ou mot de passe incorrect.');
      });
  };

  return (
    <View>
      <Text style={styles.title}>Authentification</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir votre email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          required
        />
        <Text style={styles.error}>{emailError}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisir votre mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          required
        />
        <Text style={styles.error}>{passwordError}</Text>
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.error}>{loginError}</Text>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  forgotPassword: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
};

export default ConnexionScreen;
