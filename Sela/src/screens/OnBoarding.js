import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
// import { ViewPager } from 'rn-viewpager';
import DismissKeyboard from '../components/DismissKeyboard';
import IntroHeader from '../components/IntroHeader';
import OnBoardView from '../components/OnBoarding/OnBoardView';

import StepIndicator from 'react-native-step-indicator';

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
        alignItems: 'center'
    },


});

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];


const firstIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#F2994A',
    separatorUnFinishedColor: '#40F2994A',
    stepIndicatorFinishedColor: '#F2994A',
    stepIndicatorUnFinishedColor: '#F2994A',
    stepIndicatorCurrentColor: '#F2994A',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    // stepIndicatorLabelCurrentColor: '#000000',
    // stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#F2994A'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 15,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break;
        }
        case 1: {
            iconConfig.name = 'location-on';
            break;
        }
        case 2: {
            iconConfig.name = 'assessment';
            break;
        }
        case 3: {
            iconConfig.name = 'payment';
            break;
        }
        case 4: {
            iconConfig.name = 'track-changes';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};


export default class OnBoarding extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 0,
            keyboard: false,
        }
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
        this.setState({ keyboard: true })
    }

    keyboardDidHide() {
        this.setState({ keyboard: false })
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage != this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    render() {
        const { goBack } = this.props.navigation;
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
                                flex: 1
                            }}
                            >
                                <IntroHeader
                                    fn={() => goBack()}
                                    back
                                    keyboard={this.state.keyboard}
                                />
                                <View style={styles.stepIndicator}>
                                    <StepIndicator stepCount={3} customStyles={firstIndicatorStyles} currentPosition={this.state.currentPage} />
                                </View>
                            </View>
                            {/* <OnBoardView /> */}
                            <OnBoardView second={true} />
                        </View>
                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </ScrollView>

        );
    }

    renderViewPagerPage = (data) => {
        return (<View style={styles.page}>
            <Text>{data}</Text>
        </View>)
    }

    renderStepIndicator = params => (
        <View {...getStepIndicatorIconConfig(params)} />
    );

}

