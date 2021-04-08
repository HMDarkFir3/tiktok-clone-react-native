import "react-native-get-random-values";
//React
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

//Navigation
import { useRoute, useNavigation } from "@react-navigation/native";

//Amplify
import { Storage, API, graphqlOperation, Auth } from "aws-amplify";

//GraphQL
import { createPost } from "../../graphql/mutations";

//uuid
import { v4 as uuidv4 } from "uuid";

//Style
import { styles } from "./styles";

export default function CreatePost() {
  const [description, setDescription] = useState("");
  const [videoKey, setVideoKey] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    uploadToStorage(route.params.videoUri);
  }, []);

  async function uploadToStorage(imagePath) {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `${uuidv4()}.mp4`;

      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
    } catch (e) {
      console.error(e);
    }
  }

  async function onPublish() {
    if (!videoKey) {
      console.warn("Video is not yet uploaded");
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        songID: "86a4b937-0545-4938-83e8-40fd9694afac",
      };

      const response = await API.graphql(
        graphqlOperation(createPost, { input: newPost })
      );

      navigation.navigate("Home", { screen: "Home" });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.containerCreatePost}>
      <TextInput
        style={styles.textInput}
        value={description}
        onChangeText={setDescription}
        placeholder={"Descrição"}
        numberOfLines={5}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
