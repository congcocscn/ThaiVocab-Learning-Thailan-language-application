import { Component } from "react";
import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "alo",
      newPassword: "",
      confirmPassword: "",
      check: true,
    };
  }

  register = () => {
    const account = {
      username: this.state.username,
      password: this.state.newPassword,
    };
    console.log(account );
    const newPass = this.state.newPassword.value;
    const confirmPass = this.state.confirmPassword.value;
    if (newPass != confirmPass) {
      alert("Wrong password");
    } else {
       this.checkAll(account);
    }
  };

  async checkAll(account){
    await this.isAccountExisted(account);
    await this.addAccount(account);
  }

  async isAccountExisted(account) {

    await axios
      .post("https://thaiserver.herokuapp.com/account/isAccountExisted", account)
      .then((res) => {
        this.setState({ check: res.data });
      }).catch((err) => {
        console.log(err.message);
      });
  }

  async addAccount(account) {
    if (this.state.check == false) {
      await axios.post("https://thaiserver.herokuapp.com/account/", account).catch((err) => {console.log(err.message)});
      this.navigateToMain(this.props);
    } else {
      alert("This account is existed!!!");
    }
  }

  navigateToLogin = ({ navigation }) => {
    navigation.navigate("Login");
  };

  navigateToMain = ({ navigation }) => {
    alert("Register successful!!!");
    navigation.navigate("Dictionary");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style = {styles.scrollView}>
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
            placeholder="  New Password"
            onChangeText={(newPassword) => this.setState({ newPassword })}
          />

          <TextInput
            ref={(el) => {
              this.state.confirmPassword = el;
            }}
            secureTextEntry={true}
            style={styles.input}
            placeholder="  Confirm password"
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />

          <TouchableOpacity style={styles.loginButton} onPress={this.register}>
            <Text style={styles.loginText}> Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hrLine}></View>

        <View style={styles.registerComment}>
          <Text style={styles.registerText}>You had an account?</Text>
          <TouchableOpacity onPress={() => this.navigateToLogin(this.props)}>
            <Text style={styles.regtisterLink}>Login</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

        
      </SafeAreaView>
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
    marginTop: 40,
    width: 100,
    height: 100,
  },
  logoContainer: {
    top: 50,
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
    marginTop: 30,
    width: "70%",
    height: 40,
    borderRadius: 30,
    backgroundColor: "#0095f6",
    justifyContent: "center",
    alignItems: "center",
  },

  hrLine: {
    marginTop: 20,
    borderColor: "grey",
    borderWidth: 0.5,
    margin: 10,
    width: "70%",
  },
  registerComment: {
    marginTop: 30,
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
