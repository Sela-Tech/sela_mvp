import React, { Fragment } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; // eslint-disable-line
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import Text from '../Text';

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
  container: {},
  innerContainer: {
    flexDirection: 'row',
    height: height / 10,
    width: width / 3,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B1BAD2',
    paddingLeft: 5,
  },
  textColor: {
    fontSize: 13,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CalendarBox = ({
  showCalendar,
  upText,
  downText,
  openCalender,
  chooseDate,
  val,
}) => (
  <Fragment>
    {!showCalendar ? (
      <TouchableOpacity
        style={style.innerContainer}
        onPress={() => openCalender(val)}
      >
        <View style={{ marginLeft: '1%', flex: 2 }}>
          <View>
            <Text style={[style.textColor, { color: '#B1BAD2' }]}>
              {upText}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={[style.textColor, { color: '#696F74' }]}>
              {downText}
            </Text>
          </View>
        </View>

        <View style={style.bottomContainer}>
          <EvilIcons name="calendar" size={25} color="#696F74" />
        </View>
      </TouchableOpacity>
    ) : (
      <Calendar onDayPress={day => chooseDate(day, val)} />
    )}
  </Fragment>
);

CalendarBox.propTypes = {
  downText: PropTypes.string.isRequired,
  upText: PropTypes.string.isRequired,
  showCalendar: PropTypes.bool,
  // openCalender: PropTypes.func,
};

export default CalendarBox;
