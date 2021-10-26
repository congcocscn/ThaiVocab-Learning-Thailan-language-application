import axios from "axios";
import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
class TopicDictionaryImage extends Component {
  constructor(props) {
    super(props);
    console.log("Props: ");
    console.log(this.props);
    this.state = {
      topic: this.props.route.params,
      clickCount: 0,
      lastPress: 0,
    };
  }

  RenderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
        onPress={() => this.onDoublePress(item)}
      >
        <ImageBackground
          style={styles.introImageStyle}
          source={{ uri: item.url }}
        />
      </TouchableWithoutFeedback>
    );
  };

  onDoublePress = (item) => {
    const time = new Date().getTime();
    const delta = time - this.state.lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      // Success double press
      console.log("double press");
      this.props.navigation.navigate("VocabOfImage", item);
    }
    this.setState({ lastPress: time });
  };

  navigateToDictionary = () => {
    this.props.navigation.navigate("Dictionary");
  };

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <AppIntroSlider
          data={this.state.topic.images}
          renderItem={this.RenderItem}
          onDone={this.navigateToDictionary}
          showSkipButton={true}
          onSkip={this.navigateToDictionary}
          keyExtractor={(item) => item._id}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },

  introImageStyle: {
    width: "100%",
    height: "100%",
  },
});

export default TopicDictionaryImage;
