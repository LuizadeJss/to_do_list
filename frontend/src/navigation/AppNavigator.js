// Navegador do aplicativo
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { TasksScreen } from '../screens/TasksScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScreenWithHeader } from '../screens/ScreenWithHeader';
import { SideSheet } from '../components/common/SideSheet';
import { Button, View } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function AppNavigator({navigation}) {
  const { theme } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  
  const onOpenMenu = () => setMenuVisible(true);
  const onCloseMenu = () => setMenuVisible(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ccc',
          tabBarStyle: {
            backgroundColor: theme.primary,
            height: 70,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'Tarefas' ? 'list-outline' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Tarefas"
          children={() => (
            <ScreenWithHeader title="Tarefas" onOpenMenu={onOpenMenu}>
              <TasksScreen />
            </ScreenWithHeader>
          )}
        />
        <Tab.Screen
          name="Perfil"
          children={() => (
            <ScreenWithHeader title="Perfil" onOpenMenu={onOpenMenu}>
              <ProfileScreen />
            </ScreenWithHeader>
          )}
        />
      </Tab.Navigator>

      <SideSheet visible={menuVisible} onClose={onCloseMenu}>
        
        <Text style={{ fontSize: 18, fontWeight: 'bold',width: '100%', marginBottom: 10 }}>Menu</Text>
        
        <View style={{marginBottom: 10}}>
          <TouchableOpacity
            style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
            onPress={() => {
              alert('Opção 1 selecionada');
              onCloseMenu();
            }}
          >
            <Ionicons name="apps-outline" style={{ marginRight: 5}}/>
            <Text style={{ fontSize: 16 }}>Categoria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              alert('Opção 2 selecionada');
              onCloseMenu();
            }}
          >
            <Ionicons name="color-palette-outline" style={{ marginRight: 5}}/>
            <Text style={{ fontSize: 16}}>Tema</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}
             onPress={() => {
              navigation.navigate('../Configuracao');
              onCloseMenu();
            }}
          >
            <Ionicons name="settings-outline" style={{ marginRight: 5}}/>
            <Text style={{ fontSize: 16 }}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </SideSheet>
    </NavigationContainer>
  );
}