//React
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";

//Expo
import { Video, AVPlaybackStatus } from "expo-av";

//Amplify
import { Storage } from "aws-amplify";

//Style
import { styles } from "./styles";

//Icon
import { AntDesign, Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";

export default function Post(props) {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [paused, setPaused] = useState(true);
  const [videoUri, setVideoUri] = useState(null);

  const video = useRef(null);

  useEffect(() => {
    getVideoUri();
  }, []);

  function onLikePress() {
    const likesToAdd = isLiked ? -1 : +1;

    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });

    setIsLiked(!isLiked);
  }

  async function getVideoUri() {
    if (post.videoUri.startsWith("http")) {
      setVideoUri(post.videoUri);
      return;
    }

    setVideoUri(await Storage.get(post.videoUri));
  }

  return (
    <View style={styles.containerPost}>
      <TouchableWithoutFeedback
        onPress={() =>
          paused.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      >
        <View>
          <Video
            ref={video}
            style={styles.video}
            source={{ uri: videoUri }}
            onError={(e) => console.log(e)}
            resizeMode="cover"
            isLooping={true}
            shouldPlay={false}
            onPlaybackStatusUpdate={(paused) => setPaused(() => paused)}
          />

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <View style={styles.profilePictureContainer}>
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri: post.user.imageUri,
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onLikePress}
              >
                <AntDesign
                  name="heart"
                  color={isLiked ? "#ff0000" : "#ffffff"}
                  size={40}
                />
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="commenting" color="#ffffff" size={40} />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconContainer}>
                <Fontisto name="share-a" color="#ffffff" size={35} />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>
                <View style={styles.songRow}>
                  <Entypo name="beamed-note" color="#ffffff" size={24} />
                  <Text style={styles.songName}>{post.song.name}</Text>
                </View>
              </View>
              <Image
                style={styles.songPicture}
                source={{ uri: post.song.imageUri }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
