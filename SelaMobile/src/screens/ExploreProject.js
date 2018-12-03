import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
import { WHITE, YELLOW } from '../utils/constants';
import Box from '../components/ExploreProject/Box';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    // marginBottom: 20,
    paddingBottom: 20,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
});

export default class ExploreProject extends Component {
  static navigationOptions = {
    title: 'EXPLORE',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
    },
    headerStyle: {
      fontFamily: 'proximaNova',
      fontWeight: 'normal',
    },
  };
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: WHITE,
        }}
        contentContainerStyle={styles.container}
      >
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: '5%',
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '300' }}>
            {' '}
            Search for Projects{' '}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingBottom: 15 }}>
            <Input
              text="All Locations"
              style={styles.inputStyle}
              placeHolderColor="#696F74"
              sideImage={require('../../assets/location.png')}
              sideImageStatus
            />
          </View>
          <View style={{ paddingBottom: 15 }}>
            <Input
              text="Project Status"
              placeHolderColor="#696F74"
              style={styles.inputStyle}
              sideImage={require('../../assets/dropdown.png')}
              sideImageStatus
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Input
              text="Project Tag"
              placeHolderColor="#696F74"
              style={styles.inputStyle}
              sideImage={require('../../assets/dropdown.png')}
              sideImageStatus
            />
          </View>
          <View>
            <Button
              text="Find Projects"
              textSize={20}
              color={YELLOW}
              medium
              textColor={WHITE}
              style={styles.inputStyle}
              fn={() => console.log('perfecto')}
            />
          </View>
        </View>
        <View style={{ flex: 5, alignItems: 'center' }}>
          <View style={{ marginVertical: '10%' }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              Featured Projects
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Box
                img={require('../../assets/img/man.png')}
                firstText="K-Dere Portharcourt"
                secondText="Sustainability Intl"
                thirdText="OnGoing"
                title="Affordable housing scheme - 200 Units"
                cost="$50,000"
                tags={['Resilient infrasture', 'Sustainable Cities']}
              />
            </View>

            <View>
              <Box
                img={require('../../assets/img/woman.png')}
                firstText="K-Dere Portharcourt"
                secondText="Sustainability Intl"
                thirdText="Proposed"
                title="Affordable housing scheme - 200 Units"
                cost="$25,000"
                tags={['Resilient infrasture', 'Sustainable Cities']}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
