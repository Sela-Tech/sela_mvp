import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Input from '../Input';
import B from '../BoldText';
import Box from '../Box';
import Button from '../Button';
import ExtStyle from '../../utils/styles';
import { WHITE, YELLOW } from '../../utils/constants';


const styles = {
  buttomText: {
    color: WHITE,
    fontSize: 15,
  },
};

const OnBoardView = ({ second }) => (
  <Fragment>
      <View style={{
          marginTop: '5%',
          flex: 6,
          alignItems: 'center',
        }}
        >
          <View>
              <View style={{
                  alignItems: 'center',
                }}
                >
                  <B
                      color={YELLOW}
                      size={22}
                    >
                      {' '}
                      {second ? 'Your Personal Details' : 'Your Role'}
                    </B>
                </View>
              <View style={{
                  alignItems: 'center',
                  marginTop: '2%',
                }}
                >
                  <Text style={{ color: WHITE, fontSize: 15 }}>
                      {second ? 'Great! Now enter your personal' : 'Begin by selecting your role as a'}
                    </Text>
                  <Text style={{ color: WHITE, fontSize: 15 }}>
                      {second ? 'details to set up your account' : 'Sela citizen'}
                    </Text>
                </View>
              <View style={{ marginTop: '7%' }}>
                  {
                        second
                          ? (
                              <Fragment>
                                  <View>
                                      <Input
                                          text="Full Name"
                                          medium
                                        />
                                    </View>
                                  <View style={{ marginTop: '4%' }}>
                                      <Input
                                          text="Email Address or Phone Number"
                                          medium
                                        />
                                    </View>
                                  <View style={{ marginTop: '4%' }}>
                                      <Input
                                          text="Password"
                                          secure
                                          medium
                                        />
                                    </View>
                                </Fragment>
                          )
                          : (
                              <Fragment>
                                  <Box
                                      upText="Project Funder"
                                      downText="I want to manage or track projects I fund"
                                      fn={() => console.log('h')}
                                      textColor={WHITE}
                                      color={YELLOW}
                                      checked
                                      textSize={12}
                                    />
                                  <Box
                                      upText="Contractor"
                                      downText="I want to track the progress of my project"
                                      fn={() => console.log('h')}
                                      textColor={WHITE}
                                      textSize={12}
                                      below
                                    />
                                  <Box
                                      upText="Evaluation Agent"
                                      downText="I want to help validate projects  around me"
                                      fn={() => console.log('h')}
                                      textColor={WHITE}
                                      textSize={12}
                                      below
                                    />
                                </Fragment>
                          )
                    }
                </View>
              <View style={{ marginTop: '4%' }}>
                  <Button
                      text={second ? 'Get Started' : 'Next'}
                      color={YELLOW}
                      textColor={WHITE}
                      fn={() => console.log('ajja')}
                      medium
                    />
                </View>

            </View>

        </View>
      <Fragment>
          {
                !second ? (
                  <View style={{
                      position: 'absolute',
                      bottom: 30,
                      left: 0,
                      right: 0,
                    }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <View>
                              <Text style={styles.buttomText}>
                                  {' '}
                                    Already have an account?
                                  {' '}
                                  <B>Log In </B>
                                  {' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                )
                  : null
            }
        </Fragment>
    </Fragment>
);

OnBoardView.propTypes = {
  second: PropTypes.bool,
};


export default OnBoardView;
