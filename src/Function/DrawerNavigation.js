import * as React from 'react';
import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from './Home';
// import Match from './Matches';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import Notification from '../Notification/Notification';
import AddTeams from '../Backend/AddTeams';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    // <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName="DrawerHome">
        <Drawer.Screen name="DrawerHome" component={TabNavigations} />
        <Drawer.Screen name="Notifications" component={Notification} />
        <Drawer.Screen name="Add Teams" component={AddTeams} />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
}