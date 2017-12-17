import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from "antd";

import "./calcResult.css";

const CalcResult = props => {
    return (
            <InputNumber value={props.value} />
    );
};

CalcResult.propTypes = {
    value: PropTypes.number
};

export default CalcResult;