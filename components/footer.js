import React from 'react';
import { View, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 12, color: 'gray' }}>
        © 2023. Tous droits réservés. Développé par Pr. Mohamed LACHGAR
      </Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>
        (+212 708 193 797 - lachgar.m@ucd.ac.ma)
      </Text>
    </View>
  );
};

export default Footer;
