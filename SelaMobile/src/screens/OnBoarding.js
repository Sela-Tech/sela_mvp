import React, { Component } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import StepIndicator from "../components/npm/StepIndicator";
import DismissKeyboard from "../components/DismissKeyboard";
import IntroHeader from "../components/IntroHeader";
import OnBoardView from "../components/OnBoarding/OnBoardView";

import ExtStyle from "../utils/styles";
import { DEFAULT_COLOUR, YELLOW } from "../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLOUR
  },
  stepIndicator: {
    marginVertical: "4%"
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const firstIndicatorStyles = {
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 10,
  currentStepStrokeWidth: 5,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 12,
  currentStepLabelColor: YELLOW
};

export default class OnBoarding extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      currentPage: 0,
      keyboard: false,
      name: "",
      emailOrPhone: "",
      password: "",
      role: "funder",
      secure: true
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", e =>
      this.keyboardDidShow(e)
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", e =>
      this.keyboardDidHide(e)
    );
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { currentPage } = this.state;
    if (nextState.currentPage != currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage);
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showPassword = () =>
    this.setState(prevState => ({ secure: !prevState.secure }));

  changePage = () =>
    this.setState(prevState => ({
      currentPage:
        prevState.currentPage === 0
          ? prevState.currentPage + 1
          : prevState.currentPage - 1
    }));

  changeRole = role =>
    this.setState({
      role
    });

  keyboardDidShow() {
    return this.setState({ keyboard: true });
  }

  keyboardDidHide() {
    return this.setState({ keyboard: false });
  }

  render() {
    const { goBack, navigate } = this.props.navigation;
    const { currentPage, keyboard, secure } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
        keyboardShouldPersistTaps="always"
      >
        <DismissKeyboard>
          <KeyboardAvoidingView style={ExtStyle.flex1} behavior="padding">
            <View style={styles.container}>
              <View
                style={{
                  flex: 1
                }}
              >
                <IntroHeader
                  fn={() => (currentPage === 1 ? this.changePage() : goBack())}
                  back
                  keyboard={keyboard}
                />
                <View style={styles.stepIndicator}>
                  <StepIndicator
                    stepCount={3}
                    customStyles={firstIndicatorStyles}
                    currentPosition={currentPage}
                  />
                </View>
              </View>
              {currentPage === 0 ? (
                <OnBoardView
                  currentPage={currentPage}
                  changePage={this.changePage}
                  state={this.state}
                  secure={secure}
                  changeRole={this.changeRole}
                  navigate={navigate}
                  showPassword={this.showPassword}
                />
              ) : (
                <OnBoardView
                  second
                  currentPage={currentPage}
                  changePage={this.changePage}
                  secure={secure}
                  state={this.state}
                  changeRole={this.changeRole}
                  navigate={navigate}
                  showPassword={this.showPassword}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </ScrollView>
    );
  }
}
