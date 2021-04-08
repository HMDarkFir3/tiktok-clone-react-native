//Style
import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  containerRNCamera: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000",
  },
  preview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonRecord: {
    alignSelf: "center",
    height: 50,
    width: 50,

    marginVertical: 10,

    backgroundColor: "#ff4343",
    borderRadius: 25,
  },
  buttonStopRecord: {
    alignSelf: "center",
    height: 30,
    width: 30,

    marginVertical: 20,

    backgroundColor: "#ff4343",
    borderRadius: 3,
  },
});
