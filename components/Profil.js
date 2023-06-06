import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { AuthContext } from './context/AuthContext';
import Footer from './footer';
const Profil = () => {
  const [userInfo, setUserInfo] = useState({});
  const { currentEmail } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://troubled-red-garb.cyclic.app/professeurs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        const user = data.find((prof) => prof.email === currentEmail);
        if (user) {
          setUserInfo(user);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginError("Adresse e-mail ou mot de passe incorrect.");
      });

  }, []);

  return (
    <>
      {Object.keys(userInfo).length !== 0 ? (
        <View>

        <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
              placeholder="Nom"
              value={userInfo.nom}
        />
      </View>

        <View style={styles.inputContainer}>
        <Text style={styles.label}>{'Prénom'}</Text>
        <TextInput
          style={styles.input}
              placeholder="Prénom"
              value={userInfo.prenom}
        />
      </View>

        <View style={styles.inputContainer}>
        <Text style={styles.label}>Téléphone</Text>
        <TextInput
          style={styles.input}
              placeholder="Téléphone"
              value={userInfo.tel}
        />
      </View>


        <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
              placeholder="email"
              value={userInfo.email}
        />
      </View>

        <View style={styles.inputContainer}>
        <Text style={styles.label}>Grade</Text>
        <TextInput
          style={styles.input}
              placeholder="Grade"
              value={userInfo.grade}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Etablissement (abréviation: FST, FS, EST, ENSA ...)</Text>
        <TextInput
          style={styles.input}
              placeholder="Etablissement"
              value={userInfo.faculteActuelle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Spécialité</Text>
        <TextInput
          style={styles.input}
              placeholder="Spécialité"
              value={userInfo.specialite}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ville Actuelle</Text>
        <TextInput
          style={styles.input}
              placeholder="Ville Actuelle"
              value={userInfo.villeFaculteActuelle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Villes Désirées</Text>
        <TextInput
          style={styles.input}
              placeholder="Villes Désirées"
              value={userInfo.villeDesiree}
        />
      </View>
     
          <Button
            title="Modifier"
            // onPress={handleSubmit}
          />
<Text>{'\n'}</Text>
          <Button
  title="Supprimer mon compte"
  // onPress={handleSubmit}
  color="red"
/>
<Footer /> 
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({


  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10
  },

 

});

export default Profil;
