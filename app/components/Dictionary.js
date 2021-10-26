import axios from "axios";
import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    this.getTopics();
  }

  async getTopics() {
    const res = await axios
      .get("https://thaiserver.herokuapp.com/topic")
      .then((res) => {
        this.setState({ topics: res.data });
        console.log(this.state.topics);
      });
  }

  navigateToVocabImage = ({ navigation }, topic) => {
    console.log(topic);
    navigation.navigate("TopicDictionaryImage", topic);
  };

  renderTopics = () => {
    if (this.state.topics == null) return <Text>There is no topic</Text>;

    return (
      <View style={styles.topicContainer}>
        {this.state.topics.map((topic) => (
          <TouchableOpacity
            style={styles.topicView}
            key={topic._id}
            onPress={() => this.navigateToVocabImage(this.props, topic)}
          >
            <Image
              style={styles.topicIcon}
              source={{ uri: topic.icon }}
            ></Image>

            <Text>{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.containter}>
        {this.renderTopics()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containter: {},

  topicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginLeft: 20,
  },

  topicView: {
    marginTop: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  topicIcon: {
    width: 100,
    height: 100,
  },
});

export default Dictionary;
