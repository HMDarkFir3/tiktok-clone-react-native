//React
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

//Routes
import Routes from "./src/routes";

//Amplify Configure
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

//Amplify
import { Auth, API, graphqlOperation } from "aws-amplify";

//Amplify Auth
import { withAuthenticator } from "aws-amplify-react-native";

//GraphQL
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

function getRandomImage() {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
}

function App() {
  useEffect(() => {
    async function fetchUser() {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (!userInfo) {
        return;
      }

      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );

      if (getUserResponse.data.getUser) {
        console.log("User already exists in database");
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };

      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    }

    fetchUser();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.container}>
        <Routes />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default withAuthenticator(App);
