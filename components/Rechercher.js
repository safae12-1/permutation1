import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import DropDownPicker from 'react-native-dropdown-picker';

import Footer from './footer';
const Rechercher = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);
  const [newVilleDesireeOptions, setNewVilleDesireeOptions] = useState([])
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professeurs = data;
        setResultList(data);
        setSpecialiteOptions([...new Set(professeurs.map(professeur => professeur.specialite))]);
        setVilleActuelleOptions([...new Set(professeurs.map(ville => ville.villeFaculteActuelle))]);
        setVilleDesireeOptions([...new Set(professeurs.map(ville => ville.villeDesiree))]);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const handleReset = () => {
    setSpecialite('');
    setVilleActuelle('');
    setVilleDesiree('');
    setResultList([])
  };

  useEffect(() => {
    let allCities = [];

    villeDesireeOptions.forEach((item) => {
      const splitCities = item.split(';');
      allCities = allCities.concat(splitCities);
    });

    const uniqueCities = Array.from(new Set(allCities));

    setNewVilleDesireeOptions(uniqueCities);
      
  }, [villeDesireeOptions]);


const handleSubmit = () => {
  let filteredList = resultList;

  if (specialite) {
    filteredList = filteredList.filter((result) => result.specialite === specialite);
  }

  if (villeActuelle) {
    filteredList = filteredList.filter((result) => result.villeFaculteActuelle === villeActuelle);
  }

  if (villeDesiree) {
    filteredList = filteredList.filter((result) => result.villeDesiree === villeDesiree);
  }

  setResultList(filteredList);
};



  return (
     <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher</Text>

      <Text style={styles.label}>Spécialité</Text>
      <Picker
        style={styles.dropdownContainer}
        selectedValue={specialite}
        onValueChange={itemValue => setSpecialite(itemValue)}
      >
        <Picker.Item label="Sélectionner une spécialité" value="" />
        {specialiteOptions.map((specialiteItem, index) => (
          <Picker.Item key={index} label={specialiteItem} value={specialiteItem} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Actuelle</Text>
      <Picker
        style={styles.dropdownContainer}
        selectedValue={villeActuelle}
        onValueChange={itemValue => setVilleActuelle(itemValue)}
      >
        <Picker.Item label="Sélectionner une ville" value="" />
        {villeActuelleOptions.map((villeAct, index) => (
          <Picker.Item key={index} label={villeAct} value={villeAct} />
        ))}
      </Picker>

      <Text style={styles.label}>Ville Désirée</Text>
      <Picker
        style={styles.dropdownContainer}
        selectedValue={villeDesiree}
        onValueChange={itemValue => setVilleDesiree(itemValue)}
      >
        <Picker.Item label="Sélectionner une ville" value="" />
        {newVilleDesireeOptions.map((villeAct, index) => (
          <Picker.Item key={index} label={villeAct} value={villeAct} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Réinitialiser" onPress={handleReset} color="#808080" />
        <Button title="Rechercher" onPress={handleSubmit} />
      </View>

      <View>
        <Text style={styles.label}>Résultats de la recherche</Text>
        {
          resultList?.map((result) => (
            <View style={styles.card}>
          <Text style={{ fontSize: 20 }}>{result.nom} {result.prenom} ({result.email} | {result.tel} | {result.grade}) - {result.specialite} - ({result.faculteActuelle} | {result.villeFaculteActuelle}) ---> {result.villeDesiree}}</Text>
        </View>
          ))
        }
      </View>
      <Footer /> 
    </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 16,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Rechercher;
