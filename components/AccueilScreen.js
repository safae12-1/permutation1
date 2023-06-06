import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Footer from './footer';
const AccueilScreen = () => {
  const [nombreProfesseurs, setNombreProfesseurs] = useState(0);
  const [dataSpecialites, setDataSpecialites] = useState([]);
  const [dataVilles, setDataVilles] = useState([]);
  const [dataGrades, setDataGrades] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((professeurs) => {
        const specialitesCount = {};
        const villesCount = {};
        const gradesCount = {};

        professeurs.forEach((professeur) => {
          const specialite = professeur.specialite;
          specialitesCount[specialite] =
            (specialitesCount[specialite] || 0) + 1;

          const ville = professeur.villeDesiree;
          villesCount[ville] = (villesCount[ville] || 0) + 1;

          const grade = professeur.grade;
          gradesCount[grade] = (gradesCount[grade] || 0) + 1;
        });

        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

        const filteredSpecialitesData = Object.entries(specialitesCount)
          .filter(([label, value]) => value > 0)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 13)
          .map(([label, value], index) => ({
            name: label,
            value,
            color: colors[index % colors.length],
          }));

        const filteredVillesData = Object.entries(villesCount)
          .filter(([label, value]) => value > 0)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([label, value], index) => ({
            name: label,
            value,
            color: colors[index % colors.length],
          }));

        const filteredGradesData = Object.entries(gradesCount)
          .filter(([label, value]) => value > 0)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 7)
          .map(([label, value], index) => ({
            name: label,
            value,
            color: colors[index % colors.length],
          }));

        setDataSpecialites(filteredSpecialitesData);
        setDataVilles(filteredVillesData);
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

  return (
    <ScrollView>
      <View >
        <Text style={styles.card}>Nombre de professeurs : {nombreProfesseurs}</Text>
        <Text> {'\n'}</Text>

        <View style={styles.card} >
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par spécialité</Text>
          {dataSpecialites.length > 0 ? (
            <PieChart
              data={dataSpecialites}
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
              accessor="value"
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
              hasLegend={true}
              legend={dataSpecialites.map((item) => ({
                name: item.name,
                color: item.color,
              }))}
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
              data={dataVilles}
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
              accessor="value"
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
              hasLegend={true}
              legend={dataVilles.map((item) => ({
                name: item.name,
                color: item.color,
              }))}
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
              data={dataGrades}
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
              accessor="value"
              backgroundColor="transparent"
              paddingLeft={15}
              absolute
              hasLegend={true}
              legend={dataGrades.map((item) => ({
                name: item.name,
                color: item.color,
              }))}
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
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <Text style={{ flex: 1 }}>{item.value}</Text>
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
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <Text style={{ flex: 1 }}>{item.value}</Text>
            </View>
          ))}
        </View>

        <Text> {'\n'}</Text>

        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Nombre de profs par grade</Text>

          {dataGrades.length > 0 ? (
            dataGrades.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Text style={{ flex: 1 }}>{item.name}</Text>
                <Text style={{ flex: 1 }}>{item.value}</Text>
              </View>
            ))
          ) : (
            <Text>Aucune donnée à afficher</Text>
          )}
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
