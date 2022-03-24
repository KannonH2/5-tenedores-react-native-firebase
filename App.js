import React from 'react';
import Navigation from './app/navigations/Navigation';
import { LogBox } from 'react-native';
import { firebaseApp } from './app/utils/firebase';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {
  
  return (
    <Navigation />
  );
}
