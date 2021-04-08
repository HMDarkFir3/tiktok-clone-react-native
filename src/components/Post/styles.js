//Style
import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  //Container Post
  containerPost: {
    width: "100%",
    height: Dimensions.get("window").height - 45,
  },
  video: {
    position: "absolute",

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    justifyContent: "flex-end",

    height: "100%",
  },
  //Right Container
  rightContainer: {
    alignSelf: "flex-end",

    height: 300,

    marginRight: 5,

    justifyContent: "space-between",
  },
  profilePictureContainer: {},
  profilePicture: {
    width: 50,
    height: 50,

    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  iconContainer: {
    alignItems: "center",
  },
  statsLabel: {
    marginTop: 5,

    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  //Bottom Container
  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    padding: 10,
  },
  handle: {
    marginBottom: 5,

    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  description: {
    marginBottom: 5,

    fontSize: 16,
    fontWeight: "300",
    color: "#ffffff",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    marginLeft: 5,

    fontSize: 16,
    color: "#ffffff",
  },
  songPicture: {
    width: 50,
    height: 50,

    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#666666",
  },
});
