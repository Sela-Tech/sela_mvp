import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Header, Title, Icon, Thumbnail } from 'native-base';
import { Camera, Permissions, Constants } from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';
import Text from '../components/Text';
import { isAndroid } from '../utils/helpers';
import { YELLOW } from '../utils/constants';

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const wbIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent',
};

const { width } = Dimensions.get('window');

const initialText =
  'Upload evidence of completion \
        non-completion of this task.This can \
        be a photo or video.Ensure you are at \
        the project site before proceeding';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 80,
    width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    elevation: isAndroid ? 6 : 2,
    shadowOpacity: isAndroid ? 0.5 : 0.1,
    shadowRadius: isAndroid ? 2 : 1,
    shadowOffset: {
      height: isAndroid ? 10 : 2,
      width: isAndroid ? 10 : 2,
    },
  },
  floatingButton: {
    backgroundColor: YELLOW,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 50,
    right: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 2,
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.12,
    flexDirection: 'row',
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Chat extends React.Component {
  static navigationOptions = () => ({
    header: null,
    //  (
    //   <View style={styles.header}>
    //     <View
    //       style={{
    //         justifyContent: 'center',
    //         paddingLeft: '5%',
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <Image source={require('../../assets/img/blackback.png')} />
    //       </TouchableOpacity>
    //     </View>

    //     <View
    //       style={{
    //         left: 40,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Text style={{ fontSize: 20 }}>Submit Update</Text>
    //     </View>
    //   </View>
    // ),
  });

  // 3.
  state = {
    openCamera: false,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    messages: [
      {
        _id: Math.round(Math.random() * 1000000), // .toString(),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2, // '.toString(),
          name: 'React Native',
          avatar: require('../../assets/goldlogo.png'),
        },
        text: initialText.trim(' '),
        // image:
        //   'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
        sent: true,
        received: true,
      },
    ],
    step: 0,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  onSend = (messages = []) => {
    let { step } = this.state;
    step += 1;
    console.log('message', messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        { ...messages[0], sent: true, received: true },
      ]),
      step,
    }));
  };

  snap = async () => {
    const { openCamera } = this.state;
    this.setState(prevstate => ({ openCamera: !prevstate.openCamera }));
  };

  updateFeedback = async () => {
    await this.takePicture();
    const messages = [
      {
        _id: Math.round(Math.random() * 1000000), // .toString(),
        createdAt: new Date(),
        user: {
          _id: 2, // '.toString(),
          name: 'React Native',
          avatar: require('../../assets/goldlogo.png'),
        },
        text: 'Was this task successfully completed ?',
        // image:
        //   'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
        sent: true,
        received: true,
      },
    ];
    let { step } = this.state;
    step += 1;
    console.log('message', messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        { ...messages[0], sent: true, received: true },
      ]),
      step,
    }));
  };

  takePicture = async () => {
    let { step } = this.state;
    step += 1;
    const { openCamera } = this.state;

    if (this.camera) {
      try {
        const photo = await this.camera.takePictureAsync({
          skipProcessing: true,
        });
        const messages = [
          {
            _id: Math.round(Math.random() * 1000000), // .toString(),
            text: '',
            createdAt: new Date(),
            // user: {
            //   _id: 3, // .toString(),
            //   name: 'React Native',
            //   avatar: require('../../assets/img/man.png'),
            // },
            image: photo.uri,
            sent: true,
            received: true,
          },
        ];
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [
            { ...messages[0], ...messages[1], sent: true, received: true },
          ]),
          step,
          openCamera: false,
        }));
      } catch (error) {
        this.setState({ error });
      }
    } else {
      this.setState({
        error: 'Request failed',
      });
    }
  };

  renderTopBar = () => <View style={styles.topBar} />;

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{ flex: 0.4 }}>
        <TouchableOpacity
          onPress={this.updateFeedback}
          style={{ alignSelf: 'center' }}
        >
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    const { messages, openCamera, type, flash, autoFocus } = this.state;
    return (
      <View style={styles.container}>
        <Header
          androidStatusBarColor="#311075"
          style={{
            backgroundColor: '#311b92',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            margin: 0,
            padding: 0,
          }}
        >
          <View style={styles.header}>
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: '5%',
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/img/blackback.png')} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                left: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20 }}>Submit Update</Text>
            </View>
          </View>
        </Header>

        <Fragment>
          {openCamera ? (
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              type={type}
              flashMode={flash}
              autoFocus={autoFocus}
              style={styles.camera}
            >
              {this.renderTopBar()}
              {this.renderBottomBar()}
            </Camera>
          ) : (
            <Fragment>
              <GiftedChat
                messages={messages}
                onSend={this.onSend}
                isAnimated
                listViewProps={{
                  contentContainerStyle: {
                    flex: 1,
                    justifyContent: 'flex-start',
                  },
                }}
              />
              <View style={styles.floatingButton}>
                <TouchableOpacity
                  onPress={() => this.snap()}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={require('../../assets/img/camera.png')} />
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Fragment>
      </View>
    );
  }
}
