import React, { Component } from 'react';
import './../css/month-picker.css';
import '../css/picker-styles.css';

export default class MonthPicker extends Component {
  constructor(props){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    super(props);
    if(this.props.months && this.props.months.length === 12)
      months = this.props.months;

    this.state = {cells:[], selectedDate:new Date(), selectedYear:new Date().getFullYear(), currentView:"months",renderDate:true, months:months};
    this.selectCell = this.selectCell.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentWillMount() {
    this.setState({cells:this.state.months});
  }

  selectCell(cellContent, index) {        
    let date = this.state.selectedDate;
    let year = this.state.selectedYear
    date.setMonth(index);
    date.setFullYear(year);
    this.setState({selectedDate:date, renderDate:true});
    if(this.props.onChange && typeof this.props.onChange === "function")
      this.props.onChange(this.state.selectedDate);
  }

  previous() {
    var d = this.state.selectedYear
    this.setState({selectedYear: (d-1)})
  }

  next() {
    var d = this.state.selectedYear
    this.setState({selectedYear: (d+1)})
  }

  render() {
    let head =
      <div className="section_mp group_mp">
        <div className="col_mp span_1_of_3_mp arrows_mp" onClick={()=>{this.previous()}}>&lt;</div>
        <div className="col_mp span_1_of_3_mp">{this.state.selectedYear}</div>
        <div className="col_mp span_1_of_3_mp arrows_mp" onClick={()=>{this.next()}}>&gt;</div>
      </div>;
    let body = [];
    for( let i = 0 ; i< 12 ; i++){
      let cellContent = this.state.cells[i];
      body.push(<div key={i}  onClick={()=>{this.selectCell(cellContent, i)}} className={"col_mp span_1_of_3_mp"}>{cellContent}</div>);
    }
    return (
      <div>
        {head}
        {body}
      </div>
    );
  }
}
