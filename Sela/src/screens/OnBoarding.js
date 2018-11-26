import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Keyboard,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import DismissKeyboard from '../components/DismissKeyboard';
import IntroHeader from '../components/IntroHeader';
import OnBoardView from '../components/OnBoarding/OnBoardView';


import ExtStyle from '../utils/styles';
import { DEFAULT_COLOUR, YELLOW, WHITE } from '../utils/constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLOUR,
  },
  stepIndicator: {
    marginVertical: '4%',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});


const firstIndicatorStyles = {
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 10,
  currentStepStrokeWidth: 5,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: YELLOW,
};

export default class OnBoarding extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      keyboard: false,
      name: '',
      emailOrPhone: '',
      password: '',
      role: 'funder',
      secure: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => this.keyboardDidShow(e));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e => this.keyboardDidHide(e));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    return this.setState({ keyboard: true });
  }

    showPassword = () => this.setState(prevState => ({ secure: !prevState.secure }));

    keyboardDidHide() {
      return this.setState({ keyboard: false });
    }


    changePage = () => this.setState(prevState => ({ currentPage: prevState.currentPage === 0 ? prevState.currentPage + 1 : prevState.currentPage - 1 }));

    changeRole = role => this.setState({
      role,
    })

    componentWillReceiveProps(nextProps, nextState) {
      if (nextState.currentPage != this.state.currentPage) {
        if (this.viewPager) {
          this.viewPager.setPage(nextState.currentPage);
        }
      }
    }

    render() {
      const { goBack } = this.props.navigation;
      const { currentPage } = this.state;

      renderViewPagerPage = data => (
          <View style={styles.page}>
              <Text>{data}</Text>
            </View>
      );
      return (
          <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled
              keyboardShouldPersistTaps="always"
            >
              <DismissKeyboard>
                  <KeyboardAvoidingView
                      style={ExtStyle.flex1}
                      behavior="padding"

                    >
                      <View style={styles.container}>
                          <View style={{
                              flex: 1,
                            }}
                            >
                              <IntroHeader
                                  fn={() => (currentPage === 1 ? this.changePage() : goBack())}
                                  back
                                  keyboard={this.state.keyboard}
                                />
                              <View style={styles.stepIndicator}>
                                  <StepIndicator stepCount={3} customStyles={firstIndicatorStyles} currentPosition={this.state.currentPage} />
                                </View>
                            </View>
                          {
                                this.state.currentPage === 0
                                  ? (
                                      <OnBoardView
                                          currentPage={this.state.currentPage}
                                          changePage={this.changePage}
                                          state={this.state}
                                          secure={this.state.secure}
                                          changeRole={this.changeRole}
                                        />
                                  ) : (
                                      <OnBoardView
                                          second
                                          currentPage={this.state.currentPage}
                                          changePage={this.changePage}
                                          secure={this.state.secure}
                                          state={this.state}
                                          changeRole={this.changeRole}
                                        />
                                  )
                            }
                        </View>
                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </ScrollView>
      );
    }
}
