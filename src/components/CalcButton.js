import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

import "./calcButton.css";

const CalcButton = (props) => {
  return (
    <Button id={props.btn.id} onClick={props.btn.fun}>{props.btn.name}</Button>
  );
}

CalcButton.propTypes = {
    btn: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.number,
        fun: PropTypes.func
    })
}

export default CalcButton
