import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Custombutton from '../components/button.js';
import SafeArea from '../components/safeArea.js';

export default function Index({ navigation }) {

  const sign = () => {
    navigation.navigate('sign in');
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={[styles.title, {marginTop: '10%'}]}>Welcome to</Text>
        <Text style={styles.title}>Telemedicine</Text>
        <Text style={styles.title}>Pilot</Text>
        <View style={styles.center}>
        <Custombutton onPress={sign}>
          Sign in
        </Custombutton>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '10%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  center: {
    alignItems: 'center',
    marginTop: '70%'
  }
});