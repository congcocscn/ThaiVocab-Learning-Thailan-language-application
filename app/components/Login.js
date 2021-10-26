import { Component } from "react";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView ,
  Dimensions 
} from "react-native";

import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      check: false,
    };
  }

  login = () => {
    const account = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(account);
    this.checkAll(account);
  };

  async checkAll(account) {
    await this.isAccountExisted(account);
    await this.navigateToMain(this.props);
  }

  navigateToRegister = ({ navigation }) => {
    navigation.navigate("Register");
  };

  navigateToMain = ({ navigation }) => {
    if (this.state.check == true) {
      alert("Login successful!!!");
      navigation.navigate("Dictionary");
    } else {
      alert("Invalid username or password");
    }
  };

  async isAccountExisted(account) {
    await axios
      .post(
        "https://thaiserver.herokuapp.com/account/isAccountExisted",
        account
      )
      .then((res) => {
        this.setState({ check: res.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style = {styles.scrollView} >
          <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logoHanu.png")}
          ></Image>
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="  Username"
            onChangeText={(value) => this.setState({ username: value })}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="  Password"
            onChangeText={(value) => this.setState({ password: value })}
          />
          <TouchableOpacity style={styles.loginButton} onPress={this.login}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hrLine}></View>

        <View style={styles.registerComment}>
          <Text style={styles.registerText}>You dont have any account?</Text>
          <TouchableOpacity onPress={() => this.navigateToRegister(this.props)}>
            <Text style={styles.regtisterLink}>Register</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  scrollView:{
    width:Dimensions.get('window').width,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    top: 70,
    alignItems: "center",
  },
  loginContainer: {
    marginTop: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingLeft: 15,
    width: "70%",
    borderRadius: 50,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  loginText: {
    fontSize: 15,
    color: "white",
  },
  loginButton: {
    paddingLeft: 15,
    marginTop: 50,
    width: "70%",
    height: 40,
    borderRadius: 30,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
  },

  hrLine: {
    marginTop: 30,
    borderColor: "grey",
    borderWidth: 0.5,
    marginLeft: "15%",
    width: "70%",
  },
  registerComment: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "grey",
  },
  regtisterLink: {
    marginTop: 10,
    color: "#0095f6",
  },
});
