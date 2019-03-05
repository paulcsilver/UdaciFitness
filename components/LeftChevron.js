import React from 'react'
import PropTypes from 'prop-types'
import { Entypo } from '@expo/vector-icons'
import { white } from '../utils/colors'


const LeftChevron = (props) => {
  return (
    <Entypo name='chevron-thin-left' style={{paddingLeft: 10}} size={24} color={white} onPress={props.onPress} />
  )
}

LeftChevron.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default LeftChevron