import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard
} from "react-native";
import Text from "../components/Text";
import DismissKeyboard from "../components/DismissKeyboard";
import Input from "../components/Input";
import Button from "../components/Button";
import B from "../components/BoldText";
import IntroHeader from "../components/IntroHeader";
import NavigationService from "../services/NavigationService";
import { DEFAULT_COLOUR, YELLOW, WHITE } from "../utils/constants";
import ExtStyle from "../utils/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: DEFAULT_COLOUR
  },
  boldText: {
    color: YELLOW,
    fontSize: 30,
    fontWeight: "500"
  },
  buttomText: {
    color: WHITE,
    fontSize: 20
  },
  whiteText: {
    color: WHITE
  }
});

export default class Login extends Component {
  state = {
    emailOrPhone: "",
    password: "",
    secure: true,
    keyboard: false
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", e =>
      this.keyboardDidShow(e)
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", e =>
      this.keyboardDidHide(e)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showPassword = () =>
    this.setState(prevState => ({
      secure: !prevState.secure
    }));

  keyboardDidShow() {
    return this.setState({ keyboard: true });
  }

  keyboardDidHide() {
    return this.setState({ keyboard: false });
  }

  render() {
    const { secure, keyboard } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={ExtStyle.flex1} behavior="behaviour">
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="always"
          >
            <Fragment>
              <IntroHeader fn={() => goBack()} back keyboard={keyboard} />
            </Fragment>
            <View style={{ alignItems: "center", marginTop: "15%" }}>
              <Text style={styles.boldText}> Log In</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: "3%" }}>
              <Text style={styles.buttomText}>
                {` Welcome back ! Enter your details `}
              </Text>
              <Text style={styles.buttomText}>
                {` below to log into your account `}
              </Text>
            </View>
            <View style={{ marginTop: "15%" }}>
              <Input
                text="Email Address or Phone Number"
                textStyle={styles.whiteText}
                // medium={true}
              />
              <View style={{ marginTop: "5%" }}>
                <Input
                  text="Password"
                  showPass
                  secure={secure}
                  showPassword={this.showPassword}
                  textStyle={styles.whiteText}
                />
              </View>
              <View
                style={{
                  marginTop: "5%",
                  alignSelf: "flex-end"
                }}
              >
                <Text
                  onPress={() => NavigationService.navigate("ForgotPassword")}
                  style={styles.buttomText}
                >
                  {` Forgot password?`}
                </Text>
              </View>
              <View style={{ marginTop: "5%" }}>
                <Button medium text="Log In" color={YELLOW} textColor={WHITE} />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 40
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.buttomText}>
                    {" Don/t have an account? "}
                    <B fn={() => NavigationService.navigate("OnBoarding")}>
                      {` Get Started`}
                    </B>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}
