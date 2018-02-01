import React from 'react';

const MARKER_WIDTH = 30;
const MARKET_HEIGHT = 30;

const style = {
  position:'absolute',
  width: MARKER_WIDTH,
  height: MARKET_HEIGHT,
  left: -MARKER_WIDTH/2,
  top: -MARKET_HEIGHT/2,
  backgroundColor: 'white',
  fontSize: 12,
  fontWeight: 'bold',
  zIndex: 10000
};

class Stop extends React.Component {
  render () {
    // TODO make some nice tooltips with more details
    return (
      <div style={style}>
        {this.props.stop_id}
      </div>
    );
  }
}

export default Stop;
