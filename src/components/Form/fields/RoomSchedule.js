import React from 'react';

const schedule_style = {
  width : '20%',
  height: '100%',
  margin: '10px',
  float : 'right'
};


export default class RoomSchedule extends React.Component {
  constructor(props) {
    super();
    this.state = {
      width: 0,
      height: 0
    };

    this.chartRef = React.createRef();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    let el = this.chartRef.current;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    console.log(width, height);
    this.setState({ width, height });
  }

  render() {
    return (
      <div style={schedule_style} ref={this.chartRef} className="ms-Grid-col ms-sm3">
        <svg
          className="ms-borderBase"
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}