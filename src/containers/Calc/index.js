import React, { Component } from 'react';
import { Row, Col } from 'antd';

import CalcButton from '../../components/CalcButton';
import CalcResult from '../../components/CalcResult';

const OPER_NONE   = 1000;
const OPER_CLEAR  = 1001;
const OPER_EQUAL  = 1002;
const OPER_DOT    = 1003;
const OPER_PLUS   = 1004;
const OPER_MINUS  = 1005;
const OPER_MULT   = 1006;
const OPER_DIV    = 1007;
const OPER_PERCNT = 1008;
const OPER_SIGN   = 1009;

const resetCompute = (compute, oper = OPER_NONE, result = 0) => {
    compute.curr_idx = 0;
    compute.oper     = oper;
    compute.base     = 10;
    compute[0]       = result;
    compute[1]       = 0;
    
    return compute;
}

const handleCompute = {
    [OPER_NONE]: (compute) => {
        return compute;
    },
    [OPER_CLEAR]: (compute) => {
        return compute;
    },
    [OPER_SIGN]: (compute) => {
        return compute;
    },
    [OPER_EQUAL]: (compute) => {
        return handleCompute[compute.oper](compute);
    },
    [OPER_PLUS]: (compute) => {
        var val1   = compute[0];
        var val2   = compute[1];
        var result = val1 + val2;

        return resetCompute(compute, OPER_EQUAL, result);
    },
    [OPER_MINUS]: (compute) => {
        var val1   = compute[0];
        var val2   = compute[1];
        var result = val1 - val2;

        return resetCompute(compute, OPER_EQUAL, result);
    },
    [OPER_MULT]: (compute) => {
        var val1   = compute[0];
        var val2   = compute[1];
        var result = val1 * val2;

        return resetCompute(compute, OPER_EQUAL, result);
    },
    [OPER_DIV]: (compute) => {
        var val1   = compute[0];
        var val2   = compute[1];
        var result = val1 / val2;

        return resetCompute(compute, OPER_EQUAL, result);
    }
}

class Calc extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        value: 0.0,
        eval: {
            oper: OPER_NONE, // operator
            curr_idx: 0,     // current value index
            base: 10,
            0: 0,            // first value or result
            1: 0             // second value
        },
        btn: {
            // Numbers
            1: {id: 1, name:'1', value:1, fun: (e) =>{this.handleNumber(e)} },
            2: {id: 2, name:'2', value:2, fun: (e) =>{this.handleNumber(e)} },
            3: {id: 3, name:'3', value:3, fun: (e) =>{this.handleNumber(e)} },
            4: {id: 4, name:'4', value:4, fun: (e) =>{this.handleNumber(e)} },
            5: {id: 5, name:'5', value:5, fun: (e) =>{this.handleNumber(e)} },
            6: {id: 6, name:'6', value:6, fun: (e) =>{this.handleNumber(e)} },
            7: {id: 7, name:'7', value:7, fun: (e) =>{this.handleNumber(e)} },
            8: {id: 8, name:'8', value:8, fun: (e) =>{this.handleNumber(e)} },
            9: {id: 9, name:'9', value:9, fun: (e) =>{this.handleNumber(e)} },
            0: {id: 0, name:'0', value:0, fun: (e) =>{this.handleNumber(e)} },

            // Operators
            [OPER_CLEAR]:  {id: OPER_CLEAR,  name:'AC',      value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_EQUAL]:  {id: OPER_EQUAL,  name:'\u003d',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_DOT]:    {id: OPER_DOT,    name:'\u00b7',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_PLUS]:   {id: OPER_PLUS,   name:'\u002b',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_MINUS]:  {id: OPER_MINUS,  name:'\u2212',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_MULT]:   {id: OPER_MULT,   name:'\u00d7',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_DIV]:    {id: OPER_DIV,    name:'\u00f7',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_PERCNT]: {id: OPER_PERCNT, name:'\u0025',  value:0, fun: (e) =>{this.handleOper(e)} },
            [OPER_SIGN]:   {id: OPER_SIGN,   name:'\u00b1',  value:0, fun: (e) =>{this.handleOper(e)} }
        }
      }
    }

    handleNumber(e) {
        var compute  = this.state.eval; 
        var value    = compute[compute.curr_idx];
        var base     = compute.base;
        
        if (compute.oper === OPER_EQUAL) {
            compute = resetCompute(compute);
            value = 0;
        }

        value = value * base + this.state.btn[e.target.id].value;
        compute[compute.curr_idx] = value;

        this.setState({eval: compute});
        this.setState({value: value});
    }

    handleOper(e) {
        var compute = this.state.eval;
        var oper = this.state.btn[e.target.id].id
        compute = handleCompute[oper](compute);

        switch (oper) {
            case OPER_EQUAL:
                this.setState({value: compute[compute.curr_idx]});
                this.setState({eval: compute});
                break;
            case OPER_CLEAR:
                this.setState({value: 0.0});
                this.setState({eval: resetCompute(compute)});
                break;
            case OPER_SIGN:
                compute[compute.curr_idx] = compute[compute.curr_idx] * -1;

                this.setState({value: compute[compute.curr_idx]});
                this.setState({eval: compute});
                break;
            case OPER_PLUS:
                compute.curr_idx = 1 - compute.curr_idx;
                compute.oper = OPER_PLUS;

                this.setState({value: compute[0]});
                this.setState({eval: compute});
                break;
            case OPER_MINUS:
                compute.curr_idx = 1 - compute.curr_idx;
                compute.oper = OPER_MINUS;

                this.setState({value: compute[0]});
                this.setState({eval: compute});
                break;
            case OPER_MULT:
                compute.curr_idx = 1 - compute.curr_idx;
                compute.oper = OPER_MULT;

                this.setState({value: compute[0]});
                this.setState({eval: compute});
                break;
            case OPER_DIV:
                compute.curr_idx = 1 - compute.curr_idx;
                compute.oper = OPER_DIV;

                this.setState({value: compute[0]});
                this.setState({eval: compute});
                break;
            default:
                // console.error("Unhandled operator: ", this.state.btn[e.target.id].name);
        }
    }

    render() {
        return (
            <div>
                <h1 align="center">Calc!!</h1>
                <Row type="flex" justify="center">
                    <Col span={16}> <CalcResult value={this.state.value} /> </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_CLEAR]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_SIGN]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_PERCNT]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_DIV]} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}><CalcButton btn={this.state.btn[7]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[8]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[9]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_MULT]} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}><CalcButton btn={this.state.btn[4]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[5]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[6]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_MINUS]} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={4}><CalcButton btn={this.state.btn[1]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[2]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[3]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_PLUS]} /></Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={8}><CalcButton btn={this.state.btn[0]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_DOT]} /></Col>
                    <Col span={4}><CalcButton btn={this.state.btn[OPER_EQUAL]} /></Col>
                </Row>
            </div>
        );
    }
}

export default Calc;