import { NavigationIndependentTree } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '../components/auth';
import MovieList from '../components/list';
import Detail from '../components/detail';
import Edit from '../components/edit';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationIndependentTree>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "orange" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          }}
        >
          <Stack.Screen name="Login" component={Auth} />
          <Stack.Screen name="List of Movies" component={MovieList} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Edit" component={Edit} />

        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
