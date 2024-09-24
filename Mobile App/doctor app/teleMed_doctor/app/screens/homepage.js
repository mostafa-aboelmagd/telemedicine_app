import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';

export default function HomePage ({ navigation }) {
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Doctor home page</Text>
      </View>
      <Footer navigation={navigation}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', 
  },
})
