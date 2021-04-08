//React
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

//Expo
import { Camera } from "expo-camera";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Style
import { styles } from "./styles";

export default function RNCamera() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const camRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  async function onRecord() {
    if (!isRecording) {
      setIsRecording(true);
      const data = await camRef.current.recordAsync();
      navigation.navigate("CreatePost", { videoUri: data.uri });
    } else {
      setIsRecording(false);
      camRef.current.stopRecording();
    }
  }

  return (
    <SafeAreaView style={styles.containerRNCamera}>
      <Camera style={styles.preview} type={type} ref={camRef} />
      <TouchableOpacity
        onPress={onRecord}
        style={isRecording ? styles.buttonStopRecord : styles.buttonRecord}
      ></TouchableOpacity>
    </SafeAreaView>
  );
}
