import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SafeArea from '../../components/safeArea';
import Footer from '../../components/footer';

export default function Support ({ navigation }) {
return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Support</Text>
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