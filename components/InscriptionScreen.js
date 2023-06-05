import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const InscriptionScreen = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState([]);
  const [grades, setGrades] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [villesActuelles, setVillesActuelles] = useState([]);
  const [villesOptions, setVillesOptions] = useState([]);
  const [etablissement, setEtablissement] = useState('');

  // Fetch les données de grade, spécialité, ville actuelle et villes désirées
  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professeur = data[0]; // Supposons que vous récupérez un seul objet professeur du tableau
        setGrades([...new Set(data.map(professeur => professeur.grade))]);
        setSpecialites([...new Set(data.map(professeur => professeur.specialite))]);

        const villesActuelles = professeur.villeFaculteActuelle.split(';');
        const villesDesirees = professeur.villeDesiree.split(';');

        // Récupérer les données des villes actuelles
        const villesActuellesFetchPromises = villesActuelles.map(villeActuelle =>
          fetch(`https://troubled-red-garb.cyclic.app/villes/${villeActuelle}`)
            .then(response => response.json())
            .then(villeData => villeData)
        );

        Promise.all(villesActuellesFetchPromises)
          .then(villesActuellesData => {
            const villesActuellesOptions = villesActuellesData.map(ville => ({
              label: ville.nom,
              value: ville.nom,
            }));
            setVillesOptions(villesActuellesOptions);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données des villes actuelles:', error);
          });

        // Récupérer les données des villes désirées
        const villesDesireesFetchPromises = villesDesirees.map(villeDesiree =>
          fetch(`https://troubled-red-garb.cyclic.app/villes/${villeDesiree}`)
            .then(response => response.json())
            .then(villeData => villeData)
        );

        Promise.all(villesDesireesFetchPromises)
          .then(villesDesireesData => {
            const villesDesireesOptions = villesDesireesData.map(ville => ({
              label: ville.nom,
              value: ville.nom,
            }));
            setVillesDesirees(villesDesireesOptions);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données des villes désirées:', error);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    // Effectuer les actions nécessaires avec les données saisies
    console.log('Données soumises :', {
      nom,
      prenom,
      telephone,
      email,
      password,
      grade,
      specialite,
      villeActuelle,
      villesDesirees,
      etablissement,
    });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Nom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={text => setNom(text)}
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { marginBottom: 5 }]}>Prénom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={text => setPrenom(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Téléphone :</Text>
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={telephone}
          onChangeText={text => setTelephone(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Grade :</Text>
        <Picker
        style={styles.dropdown}
        selectedValue={grade}
        onValueChange={itemValue => setGrade(itemValue)}
      >
        <Picker.Item label="Sélectionner un grade" value="" />
        {grades.map(gradeItem => (
          <Picker.Item key={gradeItem} label={gradeItem} value={gradeItem} />
        ))}
      </Picker>
      </View>
      

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Etablissement (abréviation: FST, FS, EST, ENSA ...) :</Text>
        <TextInput
        style={styles.input}
        placeholder="Etablissement"
        value={etablissement}
        onChangeText={text => setEtablissement(text)}
      />
      </View>
      

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>spécialité:</Text>
      <Picker
        style={styles.dropdown}
        selectedValue={specialite}
        onValueChange={itemValue => setSpecialite(itemValue)}
      >
        <Picker.Item label="Sélectionner une spécialité" value="" />
        {specialites.map(specialiteItem => (
          <Picker.Item key={specialiteItem} label={specialiteItem} value={specialiteItem} />
        ))}
      </Picker>
      </View>
      
        <View style={styles.fieldContainer}>
        <Text style={styles.label}>Ville Actuelle:</Text>
         <Picker
        style={styles.dropdown}
        selectedValue={villeActuelle}
        onValueChange={itemValue => setVilleActuelle(itemValue)}
      >
        <Picker.Item label="Sélectionner une ville actuelle" value="" />
        {villesOptions.map(villeItem => (
          <Picker.Item key={villeItem.value} label={villeItem.label} value={villeItem.value} />
        ))}
      </Picker>
      </View>
     

     <View style={styles.fieldContainer}>
        <Text style={styles.label}>Villes Désirées:</Text>
      <Picker
        style={styles.dropdown}
        selectedValue={villesDesirees}
        onValueChange={itemValue => setVillesDesirees(itemValue)}
        mode="multiple"
      >
        <Picker.Item label="Sélectionner des villes désirées" value="" />
        {villesDesirees.map(villeItem => (
          <Picker.Item key={villeItem.value} label={villeItem.label} value={villeItem.value} />
        ))}
      </Picker>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 100,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  dropdown: {
    height: 40,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InscriptionScreen;