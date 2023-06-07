import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Footer from './footer';
const AccueilScreen = () => {
  const [nombreProfesseurs, setNombreProfesseurs] = useState(0);
  const [dataSpecialites, setDataSpecialites] = useState([]);
  const [dataVilles, setDataVilles] = useState([]);
  const [dataGrades, setDataGrades] = useState([]);
  const colors = ['#FFC107', '#FF5722', '#03A9F4', '#4CAF50', '#9C27B0', '#FF9800', '#8BC34A', '#E91E63', '#00BCD4', '#CDDC39', '#795548', '#673AB7', '#F44336', '#2196F3', '#FFEB3B'];

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((professeurs) => {
        const specialitesCount = {};
        const villesCount = {};
        const gradesCount = {};

        professeurs.forEach((professeur) => {
          const specialite = professeur.specialite;
          const ville = professeur.villeDesiree;
          const grade = professeur.grade;

          if (specialitesCount.hasOwnProperty(specialite)) {
            specialitesCount[specialite] += 1;
          } else {
            specialitesCount[specialite] = 1;
          }

          if (villesCount.hasOwnProperty(ville)) {
            villesCount[ville] += 1;
          } else {
            villesCount[ville] = 1;
          }

          if (gradesCount.hasOwnProperty(grade)) {
            gradesCount[grade] += 1;
          } else {
            gradesCount[grade] = 1;
          }
        });

        const filteredSpecialitesData = Object.keys(specialitesCount).map(specialite => ({
          specialite,
          professeur: specialitesCount[specialite],
        }));

        setDataSpecialites(filteredSpecialitesData);

        ///// pour villes 
        const filteredVillesData = Object.keys(villesCount).map(ville => ({
          ville,
          professeur: villesCount[ville],
        }));
        
        setDataVilles(filteredVillesData);

        // pour grades
        const filteredGradesData = Object.keys(gradesCount).map(grade => ({
          grade,
          professeur: gradesCount[grade],
        }));

        setDataGrades(filteredGradesData);


        const nombreProfesseurs = professeurs.length;
        setNombreProfesseurs(nombreProfesseurs);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des données des professeurs:',
          error
        );
      });
  }, []);

    const data1 = dataSpecialites
    .sort((a, b) => b.professeur - a.professeur) 
    .slice(0, 15)
    .map((item, index) => ({
      name: item.specialite,
      population: item.professeur,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      color: colors[index % colors.length], 
    }));

    const data2 = dataVilles
    .sort((a, b) => b.professeur - a.professeur) 
    .slice(0, 15)
    .map((item, index) => ({
      name: item.ville,
      population: item.professeur,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      color: colors[index % colors.length], 
    }));

    const data3 = dataGrades
    .sort((a, b) => b.professeur - a.professeur) 
    .slice(0, 15)
    .map((item, index) => ({
      name: item.grade,
      population: item.professeur,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      color: colors[index % colors.length], 
    }));


  return (
    <ScrollView>
      <View >
        <Text style={styles.card}>Nombre de professeurs : {nombreProfesseurs}</Text>
        <Text> {'\n'}</Text>

        <View style={styles.card} >
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par spécialité</Text>
          {dataSpecialites.length > 0 ? (
            <PieChart
              data={data1}
              width={300}
              height={200}
              accessor={"population"}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
            />
          ) : (
            <Text>{'Aucune donnée à afficher'}</Text>
          )}
        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Les villes les plus demandées</Text>
          {dataVilles.length > 0 ? (
            <PieChart
              data={data2}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
            />
          ) : (
            <Text>Aucune donnée à afficher</Text>
          )}
        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par grade</Text>
          {dataGrades.length > 0 ? (
            <PieChart
              data={data3}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
            />
          ) : (
            <Text>Aucune donnée à afficher</Text>
          )}
        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par spécialité (Top 15)</Text>
          
          {dataSpecialites.slice(0, 15).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{ flex: 1 }}>{item.specialite}</Text>
              <Text style={{ flex: 1 }}>{item.professeur}</Text>
             
            </View>
          ))}
        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Villes les plus demandées (Top 15)</Text>
          {dataVilles.slice(0, 15).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{ flex: 1 }}>{item.ville}</Text>
              <Text style={{ flex: 1 }}>{item.professeur}</Text>
             
            </View>
          ))}

        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par grade</Text>
            {dataGrades.slice(0, 15).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{ flex: 1 }}>{item.grade}</Text>
              <Text style={{ flex: 1 }}>{item.professeur}</Text>
             
            </View>
          ))}
          
        </View>

        <Footer />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
 
  card: {
    marginTop: 5,
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
  
});
export default AccueilScreen;