import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GraphContainer from './GraphContainer';

const Combinaisons = () => {

  const [specialite, setSpecialite] = useState('');
  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [professeursCont, setProfesseursCont] = useState()

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professeurs = data;
        setProfesseursCont(data)
        setSpecialiteOptions([...new Set(professeurs.map(professeur => professeur.specialite))]);
   
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, [])

  return (
  <>
    <GraphContainer ProfesseursContext={professeursCont} />

    <View>
    <Text style={styles.label}>Spécialité</Text>
      <Picker
        style={styles.dropdownContainer}
        selectedValue={specialite}
        onValueChange={itemValue => setSpecialite(itemValue)}
      >
        <Picker.Item label="Tous les spécialité" value="" />
        {specialiteOptions.map((specialiteItem, index) => (
          <Picker.Item key={index} label={specialiteItem} value={specialiteItem} />
        ))}
      </Picker>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

});

export default Combinaisons;
