import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import IntroComp from '../components/Intro/Intro';
import AppIntroSlider from 'react-native-app-intro-slider';
import Home from './Home';

const styles = StyleSheet.create({
    image: {
        height: '70%',
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

const slides = [
    {
        key: 'somethun',
        image: require('../../assets/img/building.png'),
    },
    {
        key: 'somethun-dos',
        image: require('../../assets/img/man.png'),
        imageStyle: styles.image,

    },
    {
        key: 'somethun1',
        image: require('../../assets/img/woman.png'),
    }
];

export default class Intro extends React.Component {
    state = {
        showRealApp: false
    }
    onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    renderItem = props => (
        console.log('props', props),
        <IntroComp
            image={props.image}
            shortText="Fund"
            longText="Find, fund and track development"
        />
    );

    render() {
        if (this.state.showRealApp) {
            return <Home
                props={this.props}
            />;
        } else {
            return <AppIntroSlider style={{ flex: 1 }}
                showSkipButton={true}
                slides={slides}
                renderItem={this.renderItem}
                onDone={this.onDone} />
        }
    }
};
