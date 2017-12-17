import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Calc from './containers/Calc';

class App extends Component {
  render() {
    return (
        <Row>
            <Col span={8} offset={8}>
                <Calc></Calc>
            </Col>
        </Row>
    );
  }
}

export default App;
