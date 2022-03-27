import React,{Component} from "react";
import ReactDOM from 'react-dom';

class Index extends React.Component{

    state={
        count:0,
        hour:0,
        minute:0,
        second:0,
        startDisabled:false,
        interval: ''
    }

    addCounter=(item)=>{
        const {hour, minute, second}= this.state;

        if (item =='h'){
            this.setState({
                hour: this.state.hour+1
            })
        }else if (item == 'm'){
            this.setState({
                minute: minute+1
            })
        }else {
            this.setState({
                second: second+1
            })
        }
    }

    removeCounter=(item)=>{
        const {hour, minute, second}= this.state;

        if (item =='h'){
            this.setState({
                hour: this.state.hour-1
            })
        }else if (item == 'm'){
            this.setState({
                minute: minute-1
            })
        }else {
            this.setState({
                second: second-1
            })
        }
    }

    onStartClicked=()=>{

        this.setState({
            startDisabled:true
        })

        let i = setInterval(()=>{
            const {hour, minute, second} = this.state;

            if(second===0){
                if (minute===0){
                    if (hour===0){
                        alert("Finished..!")
                        clearInterval(this.state.interval)
                    }
                    else {
                        this.setState({
                            second: 59,
                            minute: 59,
                            hour: hour-1
                        })
                    }
                }else {
                    this.setState({
                        second: 59,
                        minute: minute-1,
                    })
                }
            }else {
                this.setState({
                    second: second-1
                })
            }


        }, 1000)

        this.setState({
            interval:i
        })
    }

    onPauseClicked=()=>{
        clearInterval(this.state.interval)
        this.setState({
            startDisabled:false
        })
    }

    onClearClicked=()=>{
        this.onPauseClicked()

        this.setState({
            second:0,
            minute:0,
            hour:0
        })

    }

    render() {
        const {hour, minute, second, startDisabled}= this.state;
        return (
            <div>
                <div className="container">
                    <div className="row mt-2">

                        <div className="col-md-3 offset-1">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Select Time...!</h2>
                                </div>
                                <div className="card-body">
                                   <div>
                                       Hours: <button className={'btn btn-success'} onClick={()=>this.addCounter('h')}>+</button> {hour} <button className={'btn btn-danger'} onClick={()=>this.removeCounter('h')}> -</button>
                                   </div>
                                    <br/>
                                    <div>
                                        Minutes: <button className={'btn btn-success'} onClick={()=>this.addCounter('m')}>+</button> {minute} <button className={'btn btn-danger'} onClick={()=>this.removeCounter('m')}>-</button>
                                    </div>
                                    <br/>
                                    <div>
                                        Seconds: <button className={'btn btn-success'} onClick={()=>this.addCounter('')}>+</button> {second} <button className={'btn btn-danger'} onClick={()=>this.removeCounter('')}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 offset-1 ">
                            <div className="card">

                                <div className="card-header">
                                    <h2>Timer</h2>
                                </div>

                                <div className="card-body">
                                    <h3 className={'text-center'}> {hour} : {minute} : {second}</h3>
                                </div>

                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <button className="btn btn-success" onClick={this.onStartClicked} disabled={startDisabled}>Start</button>
                                        </div>

                                        <div className="col-md-4">
                                            <button className="btn btn-warning" onClick={this.onPauseClicked}>Pause</button>
                                        </div>

                                        <div className="col-md-4">
                                            <button className="btn btn-danger" onClick={this.onClearClicked}>Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
