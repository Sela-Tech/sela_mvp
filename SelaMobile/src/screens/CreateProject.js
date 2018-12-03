import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CalendarBox from '../components/CreateProject/CalendarBox';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { WHITE, YELLOW } from '../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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

export default class CreateProject extends Component {
  static navigationOptions = {
    title: 'Create project',
  };

  state = {
    showFirstCalendar: false,
    showSecondCalendar: false,
  };

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      await this.handleImagePicked(pickerResult);
    }
  };

  // upload image to the server
  uploadImageAsync = async data => {};

  handleImagePicked = async pickerResult => {
    let uploadResponse;
    let uploadResult;

    try {
      this.setState({
        uploading: true,
      });

      if (!pickerResult.cancelled) {
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // uploadResult = await uploadResponse.json();

        // console.log('picker result', pickerResult)
        this.setState({
          image: pickerResult.uri, // uploadResult.location
        });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };

  openCalender = val => {
    if (val === 'first') {
      this.setState(prevState => ({
        showFirstCalendar: !prevState.showFirstCalendar,
      }));
    } else {
      this.setState(prevState => ({
        showSecondCalendar: !prevState.showSecondCalendar,
      }));
    }
  };

  chooseDate = (day, val) => {
    console.log('selected day', day);
    this.openCalender(val);
  };

  render() {
    const { image, showFirstCalendar, showSecondCalendar } = this.state;
    const avatar = require('../../assets/selectImage.png');
    const avatarURI = image || '';
    const icon = avatarURI === '' ? avatar : { uri: avatarURI };

    return (
      <KeyboardAwareScrollView
        // innerRef={ref => {
        //   this.scroll = ref;
        // }}
        // resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled
      >
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
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Project Avatar </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F8',
              width: width / 1.1,
              height: height / 9,
              borderRadius: 10,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: width / 1.1,
                height: height / 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.pickImage()}
            >
              <Image
                style={
                  avatarURI !== ''
                    ? {
                        width: width / 1.1,
                        height: height / 9,
                      }
                    : null
                }
                source={icon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            width: width / 1.1,
            justifyContent: 'space-between',
          }}
        >
          <CalendarBox
            upText="Start Date"
            downText="11/08/2018"
            val="first"
            showCalendar={showFirstCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
          />
          <Fragment>
            {showFirstCalendar === true || showSecondCalendar === true ? (
              <Fragment />
            ) : (
              <View style={{ justifyContent: 'center' }}>
                <Image source={require('../../assets/minus.png')} />
              </View>
            )}
          </Fragment>
          <CalendarBox
            upText="Start Date"
            downText="11/08/2018"
            val="second"
            showCalendar={showSecondCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
          />
        </View>
        <View>
          <Button
            text="Create Project"
            color={YELLOW}
            medium
            textColor={WHITE}
            style={styles.inputStyle}
            fn={() => this.props.navigation.navigate('SubmitFeedback')}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
