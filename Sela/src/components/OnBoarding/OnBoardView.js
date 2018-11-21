import React, { Fragment } from 'react';
import {
    View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import B from '../BoldText';
import Box from '../Box';
import Button from '../Button';

import { WHITE, YELLOW } from '../../utils/constants';


const { height, width } = Dimensions.get('window');
const styles = {
    buttomText: {
        color: WHITE,
        fontSize: 15,
    }
};

const OnBoardView = ({

}) => (
        <Fragment>
            <View style={{
                marginTop: '5%',
                flex: 3,
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
                            Your Role
                        </B>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: '2%',
                    }}
                    >
                        <Text style={{ color: WHITE, fontSize: 15 }}>Begin by selecting your role as a </Text>
                        <Text style={{ color: WHITE, fontSize: 15 }}> Sela Citizen </Text>
                    </View>
                    <View style={{ marginTop: '7%' }}>
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
                    </View>
                    <View style={{ marginTop: '4%' }}>
                        <Button
                            text="Next"
                            color={YELLOW}
                            textColor={WHITE}
                            fn={() => console.log('ajja')}
                        />
                    </View>

                </View>

            </View>
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
        </Fragment>
    );

OnBoardView.propTypes = {


};


export default OnBoardView;
