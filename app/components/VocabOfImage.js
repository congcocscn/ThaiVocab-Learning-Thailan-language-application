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
  ScrollView,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
class VocabOfImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocabs: [],
      sound: 0,
      image: this.props.route.params,
    };
    this.getVocabs();
  }

  async getVocabs() {
    await axios
      .get(
        "https://thaiserver.herokuapp.com/vocab/getByTopicImage/" +
          this.state.image._id
      )
      .then((res) => {
        this.setState({ vocabs: res.data });
        console.log("vocabs: ");
        console.log(this.state.vocabs);
      });
  }

  async playSound(audioUrl) {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      this.setState({ sound: sound });

      console.log("Playing Sound");
      await this.state.sound.playAsync();

      // const playbackObject = new Audio.Sound();
      // // OR
      // const { sound: playbackObject } = await Audio.Sound.createAsync(
      //   { uri: audioUrl },
      //   { shouldPlay: true }
      // );
    } catch (err) {
      console.log(err);
      console.log("Unloading Sound");
    }
  }

  playAudio = (audioUrl) => {
    this.playSound(audioUrl);
  };

  renderTopics = () => {
    if (this.state.vocabs == null || this.state.vocabs.length == 0)
      return (
        <Image
          style={styles.loadingPic}
          source={{
            uri: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
          }}
        ></Image>
      );

    return (
      <View>
        {this.state.vocabs.map((vocab) => (
          <View key={vocab._id}>
            <View style={styles.vocabBar}>
              <Image
                style={styles.vocabIcon}
                source={{ uri: vocab.vocabImage.url }}
              ></Image>

              <View style={styles.textView}>
                <Text style={styles.vocabText}>{vocab.vocab} : </Text>
                <Text style={styles.definitionText}>{vocab.definition}</Text>
              </View>

              <TouchableOpacity
                style={styles.audioContainer}
                onPress={() => this.playAudio(vocab.audio)}
              >
                <Image
                  style={styles.audioBtn}
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1024px-Speaker_Icon.svg.png",
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.containter}>
        <ScrollView style={styles.vocabsView}>{this.renderTopics()}</ScrollView>
      </SafeAreaView>
    );
  }
}
// const [sound, setSound] = React.useState();
// async function playSound(audioUrl) {
//   console.log("Loading Sound");
//   const { sound } = await Audio.Sound.createAsync(audioUrl);
//   setSound(sound);

//   console.log("Playing Sound");
//   await sound.playAsync();
// }

// React.useEffect(() => {
//   return sound
//     ? () => {
//         console.log("Unloading Sound");
//         sound.unloadAsync();
//       }
//     : undefined;
// }, [sound]);

const styles = StyleSheet.create({
  containter: {},

  vocabText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  definitionText: {
    fontSize: 20,
  },
  textView: {
    flex: 0.95,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  vocabBar: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
    width: Dimensions.get("screen").width * 0.8,
    flexWrap: "nowrap",
  },

  vocabsView: {
    width: Dimensions.get("screen").width,
  },

  audioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  vocabIcon: {
    width: 70,
    height: 70,
    padding: 10,
  },

  audioBtn: {
    width: 30,
    height: 30,
  },
  loadingPic: {
    width: 100,
    height: 100,
    marginLeft: Dimensions.get("screen").width / 2 - 70,
    marginTop: Dimensions.get("screen").height / 2 - 70,
  },
});

export default VocabOfImage;
