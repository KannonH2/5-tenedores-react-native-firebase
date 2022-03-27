import React from 'react';
import { firebaseApp } from './app/utils/firebase';
import { LogBox } from 'react-native';
import Navigation from './app/navigations/Navigation';
import {decode, encode} from 'base-64'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

LogBox.ignoreLogs(
  [
    'Warning: ...', 
    'expo-permissions is ',
    'Unhandled promise rejection',
    'Setting a timer', 
    'It appears that',
    'This can cause',
    'AsyncStorage has been',
    'Warning: Failed prop type: Invalid prop `',
  ]); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  
  return (
    <Navigation />
  );
}
