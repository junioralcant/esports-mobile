import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Games } from '../components/Games';
import { Home } from '../screens/Home/Index';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Games} />
    </Navigator>
  );
}
