import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { WHITE, YELLOW } from '../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
  smallContainer: {
    marginBottom: 15,
  },
});

export default class Project extends Component {
  state = {};

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}> Name your project </Text>
            </View>
            <Input
              text="Project title"
              style={styles.inputStyle}
              textSyle="#BBBBBB"
              placeHolderColor="#B1BAD2"
            />
          </View>
          <View
            style={
              {
                // backgroundColor: '#F5F5F8',
                // width: width / 1.1,
                // height: height / 9,
                // borderRadius: 10,
                // marginBottom: 10,
                // justifyContent: 'center',
                // alignItems: 'center',
              }
            }
          >
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}> Project Avatar </Text>
            </View>
            <View
              style={
                {
                  backgroundColor: '#F5F5F8',
                  width: width / 1.1,
                  height: height / 9,
                  borderRadius: 10,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }
            >
              <TouchableOpacity
                style={{
                  width: width / 1.1,
                  height: height / 9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/selectImage.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}> Add a project description </Text>
            </View>
            <Input
              text="Project  description"
              multiline
              style={[styles.inputStyle, { height: 150 }]}
              textStyle={{
                textAlignVertical: 'top',
                marginTop: '2%',
                marginLeft: '2%',
              }}
              placeHolderColor="#B1BAD2"
            />
          </View>
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {' '}
                Project Tags (Seperate wit commas){' '}
              </Text>
            </View>
            <Input
              text="e.g education, sustainable cities"
              style={styles.inputStyle}
              placeHolderColor="#B1BAD2"
            />
          </View>
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {' '}
                Budget or financial Goal(if fundraising){' '}
              </Text>
            </View>
            <Input
              text="Enter amount in USD"
              style={styles.inputStyle}
              placeHolderColor="#B1BAD2"
            />
          </View>
          {/* <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}> Set the location </Text>
            </View>
            <Input
              text="Search places"
              style={styles.inputStyle}
              placeHolderColor="#B1BAD2"
            />
          </View> */}
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}> Set the location </Text>
            </View>
            <Input
              text="Search places"
              style={styles.inputStyle}
              placeHolderColor="#B1BAD2"
            />
          </View>
          <View style={styles.smallContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {` Add contractors and team members to the project `}
              </Text>
            </View>
            <Input
              text="Select"
              style={styles.inputStyle}
              placeHolderColor="#B1BAD2"
            />
          </View>

          <View>
            <Calendar />
            {/* <Agenda /> */}
            {/* <CalendarList /> */}
          </View>
          <View>
            <Button
              text="Create Project"
              color={YELLOW}
              medium
              textColor={WHITE}
              style={styles.inputStyle}
            />
          </View>

          {/* <View
          style={{
            backgroundColor: 'red',
            height: 150,
            width: '90%',
          }}
        /> */}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
