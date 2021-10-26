import React from "react";
import Login from "./app/components/Login";
import Register from "./app/components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dictionary from "./app/components/Dictionary";
import TopicDictionaryImage from "./app/components/TopicDictionaryImage";
import * as ScreenOrientation from "expo-screen-orientation";
import VocabOfImage from "./app/components/VocabOfImage";
const Stack = createStackNavigator();

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

const App = () => {
  changeScreenOrientation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="VocabOfImage" component={VocabOfImage} />
        <Stack.Screen
          name="TopicDictionaryImage"
          component={TopicDictionaryImage}
          options={{
            title: "Topic Image",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
