import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';

//Screen
import Home from './src/screens/Home'

export default function App() {
  return (
    <>
      <Home/>
      <StatusBar style="auto" />
    </>
  );
}


