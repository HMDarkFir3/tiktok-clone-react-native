//React
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Dimensions } from "react-native";

//Component
import Post from "../../components/Post";

//Style
import { styles } from "./styles";

//Amplify
import { API, graphqlOperation } from "aws-amplify";

//GraphQL
import { listPosts } from "../../graphql/queries";

//Data
//import posts from "../../../data/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
      } catch (e) {
        console.error(e);
      }
    }

    fetchPost();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        decelerationRate={"fast"}
        showsVerticalScrollIndicator={false}
        snapToAlignment={"start"}
        snapToInterval={Dimensions.get("window").height - 45}
      />
    </SafeAreaView>
  );
}
