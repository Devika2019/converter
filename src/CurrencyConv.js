import React from 'react';
import './App.css';
import { currency, currencyJson } from './Constant';

export default class CurrencyConv extends React.Component {
    constructor() {
        super()
        this.state = {
            valueTo: "",
            valueFrom: "",
            selectedTo: "AUD",
            selectedFrom: "AUD"
        };
        this.currencyPair = {
            AUDUSD: 0.837,
            CADUSD: 0.871,
            USDCNY: 6.171,
            EURUSD: 1.231,
            GBPUSD: 1.568,
            NZDUSD: 0.775,
            USDJPY: 119.9,
            EURCZK: 27.602,
            EURDKK: 7.440,
            EURNOK: 8.665
        };
    }

    handleFromValue = (e) => {
        let valueFrom = e.target.value;
        const resultvalue = this.getConverterdValues(this.state.selectedFrom, this.state.selectedTo, valueFrom);
        const withdecimal = this.state.selectedTo !== 'JPY' ? parseFloat(resultvalue).toFixed(2) : parseFloat(resultvalue).toFixed(0);
        this.setState({
            valueFrom,
            valueTo: withdecimal
        })
    }
    handleSelectionFrom = (e) => {
        let selectedFrom = e.target.value;
        const resultvalue = this.getConverterdValues(selectedFrom, this.state.selectedTo, this.state.valueFrom);
        const withdecimal = this.state.selectedTo !== 'JPY' ? parseFloat(resultvalue).toFixed(2) : parseFloat(resultvalue).toFixed(0);
        this.setState({
            selectedFrom,
            valueTo: withdecimal
        })
    }
    handleSelectionTo = (e) => {
        let selectedTo = e.target.value;
        const resultvalue = this.getConverterdValues(this.state.selectedFrom, selectedTo, this.state.valueFrom);
        const withdecimal = selectedTo !== 'JPY' ? parseFloat(resultvalue).toFixed(2) : parseFloat(resultvalue).toFixed(0);
        this.setState({
            selectedTo,
            valueTo: withdecimal
        })
    }

    getConverterdValues = (fromValue, toValue, fromData) => {
        if (currencyJson && currencyJson[fromValue] && currencyJson[fromValue][toValue]) {
            let jsonResult = currencyJson[fromValue][toValue];
            if (jsonResult === "1:1") {
                return fromData;
            }
            else if (jsonResult === "D") {
                const svalue = this.currencyPair[fromValue + toValue];
                return fromData * svalue;
            }
            else if (jsonResult === "Inv") {
                const svalue = this.currencyPair[toValue + fromValue];
                return fromData * (1 / svalue);
            }
            else if (jsonResult !== '') {
                const fromCal = this.getConverterdValues(fromValue, jsonResult, fromData);
                const toCal = this.getConverterdValues(jsonResult, toValue, fromCal);
                return toCal;
            }
        } else {
            alert('Unable to find rate');
            return 0;
        }
    }

    render() {
        let currencyValue = currency.map((x) => <option>{x}</option>)
        return (
            <div>
                <h1>FX Converter</h1>
                <label className="label">From</label>&nbsp;
                <input style={{ height: "43px" }} type="number" value={this.state.valueFrom} onChange={(event) => this.handleFromValue(event)} />&nbsp;
                <select style={{ height: "50px" }} onChange={(event) => this.handleSelectionFrom(event)} value={this.state.selectedFrom}>
                    {currencyValue}
                </select>&nbsp;
                <label className="label">To</label>&nbsp;
                <input style={{ height: "43px" }} type="number" value={this.state.valueTo} />&nbsp;
                <select style={{ height: "50px" }} onChange={(event) => this.handleSelectionTo(event)} value={this.state.selectedTo}>
                    {currencyValue}
                </select>
            </div>
        )
    }
}
