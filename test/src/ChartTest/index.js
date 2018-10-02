import React from 'react';
import Chart from './Chart';

class ChartTest extends React.Component {
  render() {
    return (
      <Chart
        data={[ ...Array(50) ].map((_, ii) => 1 + Math.floor(Math.random() * 10))}
      />
    );
  }
}

export default ChartTest;
