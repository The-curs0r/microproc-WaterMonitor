
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap'
import {Dropdown,DropdownButton,Button} from 'react-bootstrap'

import Row from 'react-bootstrap'
import { LineChart, Line , CartesianGrid, XAxis, YAxis,Tooltip,Legend,PieChart,Pie ,Cell,Brush,BarChart,Bar,ResponsiveContainer } from 'recharts';
import './Water.css'

import currentWaterData from './Data/CurWaterData.json'
import freshTempTime from './Data/FreshTempTime.json'
import tapTempTime from './Data/TapTempTime.json'
import sewageTempTime from './Data/SewageTempTime.json'
import drinkTempTime from './Data/DrinkTempTime.json'
import freshWater from './Data/FreshWater.json'
import tapWater from './Data/TapWater.json'
import sewageWater from './Data/SewageWater.json'
import drinkWater from './Data/DrinkWater.json'

function custom_sort(a, b) {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
}
var pointspHTemp=[];
export default class Water extends Component {
    constructor(props){
        super(props);
        this.state={
            value:0,
            selected:"Select Water Type",
        }
    }
    componentDidMount=()=>{
        freshTempTime.sort(custom_sort);
        tapTempTime.sort(custom_sort);
        sewageTempTime.sort(custom_sort);
        drinkTempTime.sort(custom_sort);
        freshWater.sort(custom_sort);
        tapWater.sort(custom_sort);
        sewageWater.sort(custom_sort);
        drinkWater.sort(custom_sort);
    }
    getPoint = ()=>{
        pointspHTemp= [];
        for(var i=0;i<50;i++){
            var val = -0.1*i+8.9;
            pointspHTemp.push({'temp':i,'ph':val});
        }
        // console.log(pointspHTemp)
        return pointspHTemp;
    }
    getData = ()=>{
        switch(this.state.value){
            case 1 : return freshTempTime;
            case 2 : return tapTempTime;
            case 3 : return sewageTempTime;
            case 4 : return drinkTempTime;
        }
    }
    getDataCat = ()=>{
        switch(this.state.value){
            case 1 : return freshWater;
            case 2 : return tapWater;
            case 3 : return sewageWater;
            case 4 : return drinkWater;
        }
    }
    render() {
        return (
            <div className='Wrapper'>
                <div id="titleDashDiv"> 
                    <h1 id="welcomeTo">STATISTICS</h1>
                    <h1 id="adminDash">Water Types @BPHC</h1>
                </div>
                <DropdownButton title={this.state.selected}>
                    
                        <Dropdown.Item onClick={(e)=>{e.preventDefault();this.setState({selected:'FreshWater',value:1})}}>FreshWater</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault();this.setState({selected:'Tap Water',value:2})}}>Tap Water</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault();this.setState({selected:'Sewage Water',value:3})}}>Sewage Water</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault();this.setState({selected:'Drinking Water',value:4})}}>Drinking Water</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault();this.setState({selected:'Select Water Type',value:0})}}>Current Data</Dropdown.Item>
                   
                </DropdownButton>
                {
                    (this.state.value)?
                    
                    <div div className="defaultLoc">
                        <div className="dashboardStatsDiv">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">30 Days Temperature Stats</h1>
                        </div>
                    </div>
                    <ResponsiveContainer width = "75%" height={400}>
                        <LineChart
                                width={750}
                                height={600}
                                data={this.getData()}
                                margin={{
                                top: 40, right: 30, left: 20, bottom: 5,
                                }}
                            >
                            
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[5,50]} unit=" °C"/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name=" Max Temperature Per Day" dataKey="tempMax" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" name=" Min Temperature Per Day" dataKey="tempMin" stroke="#FFBB28" activeDot={{ r: 8 }} />
                            </LineChart>
                            </ResponsiveContainer>
                        <div className="dashboardStatsDiv">
                            <div className="profileSubTitleDiv">
                                <h1 className="profileSubTitle">30 Days Parameters</h1>
                            </div>
                        </div>
                        <ResponsiveContainer width = "75%" height={400}>
                        <LineChart
                                width={1500}
                                height={600}
                                data={this.getDataCat()}
                                margin={{
                                top: 40, right: 30, left: 20, bottom: 5,
                                }}
                            >
                            
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[5,20]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name=" Oxygen Level in mg/L" dataKey="oxygen" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" name=" pH" dataKey="pH" stroke="#FFBB28" activeDot={{ r: 8 }} />
                                <Line type="monotone" name=" Turbidity in NTU" dataKey="turbidity" stroke="#0088FE" activeDot={{ r: 8 }} />
                            </LineChart>
                            </ResponsiveContainer>
                            <div className="dashboardStatsDiv">
                            <div className="profileSubTitleDiv">
                                <h1 className="profileSubTitle">30 Days Conductivity Stats</h1>
                            </div>
                        </div>
                        <ResponsiveContainer width = "75%" height={400}>
                        <LineChart
                                width={1500}
                                height={600}
                                data={this.getDataCat()}
                                margin={{
                                top: 40, right: 30, left: 20, bottom: 50,
                                }}
                            >
                            
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[5,20]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name=" Conductivity in µS/cm" dataKey="conductivity" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                            </ResponsiveContainer>
                    </div>
                    
                    :
                    <div className="defaultLoc">
                    <div className="dashboardStatsDiv">
                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">Current Stats</h1>
                    </div>
                </div>
                <ResponsiveContainer width = "75%" height={400}>
                    <BarChart
                        width={1000}
                        height={400}
                        data={currentWaterData}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Temperature" unit=" F" dataKey="temp" fill="#8884d8" />
                        <Bar name="Conductivity" unit=" µS/cm" dataKey="conductivity" fill="#82ca9d" />
                        <Bar name="Acidity (pH)" dataKey="pH" fill="#0088FE" />
                        <Bar name="Turbidity" unit=" NTU" dataKey="turbidity" fill="#00C49F" />
                        <Bar name="Oxygen Level" unit=" mg/L" dataKey="oxygen" fill="#FFBB28" />
                    </BarChart>
                    </ResponsiveContainer>
                    <div className="dashboardStatsDiv">
                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">Conductivity of Pure Water vs Temperature</h1>
                    </div>
                </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Conductivity_of_Pure_Water.svg" className="img" />
                    Source : https://upload.wikimedia.org/wikipedia/commons/3/39/Conductivity_of_Pure_Water.svg
                    <div className="dashboardStatsDiv">
                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">Oxygen Solubility In Water</h1>
                    </div>
                </div>
                    <img src="https://www.engineeringtoolbox.com/docs/documents/841/oxygen-solubility-water.png" className="img" />
                    Source : https://www.engineeringtoolbox.com/docs/documents/841/oxygen-solubility-water.png
                    <div className="dashboardStatsDiv">
                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">pH of Water vs Temperature Graph</h1>
                    </div>
                </div>
                <ResponsiveContainer width = "75%" height={400}>
                    <LineChart
                                data={this.getPoint()}
                                margin={{
                                top: 40, right: 30, left: 20, bottom: 50,
                                }}
                            >
                                <XAxis dataKey="temp" />
                                <YAxis domain={[5,10]}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name=" pH" dataKey="ph" stroke="#8884d8" />
                            </LineChart>
                            </ResponsiveContainer>
                    </div>

                }
            </div>
        )
    }
}
const white = '#FFFFFF';
const black = "#161617";
const gray = "#F8F8F9";