import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Svg } from 'expo';
const { Line } = Svg;

// redux
const SELECT = 'SELECT';
const UNSELECT = 'UNSELECT';
const LOAD = 'LOAD';

const select = (idx) => ({ type: SELECT, payload: { idx } });
const load = (data) => ({ type: LOAD, payload: { data } });

const initState = {
  data: [],
  selectedItem: 0,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT: {
      const { data, selectedItem } = state;
      const { idx } = action.payload;
      const newData = [...data];
      newData[selectedItem].isSelected = false;
      newData[idx].isSelected = true;
      return {
        data: newData,
        selectedItem: idx,
      }
    }

    case LOAD: {
      const { data } = action.payload;
      return {
        ...state,
        data,
      };
    }

    default:
      return state;
  }
};
const store = createStore(reducer);

// constants
const RATIO_WH = .3;
const { width: WIDTH } = Dimensions.get('screen');
const HEIGHT = WIDTH * RATIO_WH;
const VIEWBOX_X = 3;
const VIEWBOX_Y = 3;
const VIEWBOX_X_MAX = 97;
const VIEWBOX_Y_MAX = 30;
const VIEWBOX_HEIGHT = VIEWBOX_Y + VIEWBOX_Y_MAX;
const VIEWBOX_WIDTH = VIEWBOX_X + VIEWBOX_X_MAX;

class Axes extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <React.Fragment>
        <Line
          x1="3"
          y1="1"
          x2="3"
          y2={VIEWBOX_Y_MAX}
          fill="#000"
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
        <Line
          x1="3"
          y1="1"
          x2="1.5"
          y2="2.5"
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
        <Line
          x1="3"
          y1="1"
          x2="4.5"
          y2="2.5"
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
        <Line
          x1="3"
          y1={VIEWBOX_Y_MAX}
          x2={VIEWBOX_X_MAX + 2}
          y2={VIEWBOX_Y_MAX}
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
        <Line
          x1={VIEWBOX_X_MAX + 2}
          y1={VIEWBOX_Y_MAX}
          x2={VIEWBOX_X_MAX + .5}
          y2={VIEWBOX_Y_MAX - 1.5}
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
        <Line
          x1={VIEWBOX_X_MAX + 2}
          y1={VIEWBOX_Y_MAX}
          x2={VIEWBOX_X_MAX + .5}
          y2={VIEWBOX_Y_MAX + 1.5}
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={.5}
        />
      </React.Fragment>
    );
  }
}

class DailyGoal extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    return (
      <Line
        x1={VIEWBOX_X}
        y1={VIEWBOX_Y_MAX}
        x2={VIEWBOX_X_MAX}
        y2={VIEWBOX_Y}
        stroke="#000"
        strokeWidth={.25}
        strokeDasharray="1"
      />
    );
  }
}

class ChartLine extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { isSelected } = this.props;
    return nextProps.isSelected !== isSelected;
  }

  render() {
    const {
      x1,
      y1,
      x2,
      y2,
      isSelected,
      index,
    } = this.props;

    return (
      <Line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isSelected ? '#67F' : '#000'}
        strokeLinecap="round"
        strokeWidth={isSelected ? .5 : .5}
      />
    );
  }
}

const ChartDrawer = ({ data }) => {
  return (
    <React.Fragment>
      {data.map((el, ii) => (ii !== data.length - 1
        ? (
          <ChartLine
            x1={el.x}
            y1={el.y}
            x2={data[ii + 1].x}
            y2={data[ii + 1].y}
            key={`${ii}`}
            isSelected={el.isSelected}
            index={ii}
          />
        )
        : null
      ))}
    </React.Fragment>
  );
}
const ConnectedChartDrawer = connect(
  state => ({ data: state.data }),
)(ChartDrawer);

const scaleValue = (value, minAllowed, maxAllowed, max) => (
  (maxAllowed - minAllowed) * value / max + minAllowed
);

const ITEM_WIDTH = 100;
const ITEM_SEPARATOR = 30;

class Chart extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    console.log('render chart')

    const { data } = this.props;
    return (
      <Svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        <Axes />
        <DailyGoal />
        <ConnectedChartDrawer />
      </Svg>
    );
  }
}

class ChartWrapper extends React.Component {
  shouldComponentUpdate = () => this.props.data.length === 0;

  componentDidMount() {
    const { initData, selectedItem, loadData } = this.props;
    const max = Math.max(...initData);

    const scaledData = initData.map((val, index) => ({
      y: VIEWBOX_HEIGHT - scaleValue(val, VIEWBOX_Y, VIEWBOX_Y_MAX, max),
      x: scaleValue(index, VIEWBOX_X, VIEWBOX_X_MAX, initData.length - 1),
      isSelected: index === selectedItem,
    }));

    loadData(scaledData);
  }

  onScoll = (e) => {
    const { selectedItem: prevSelectedItem, select, data } = this.props;

    const selectedItem = Math.round(e.nativeEvent.contentOffset.x / (ITEM_WIDTH + ITEM_SEPARATOR));
    if (selectedItem < 0
    || selectedItem === prevSelectedItem
    || selectedItem >= data.length) {
      return;
    }

    select(selectedItem);
  }

  render() {
    const { data } = this.props;

    console.log('render wrapper')

    if (data.length == 0) {
      return <Text>Loading...</Text>
    }

    return (
      <FlatList
        horizontal
        data={data}
        extraData={null}
        onScroll={this.onScoll}
        keyExtractor={({ x, y }) => `${x}_${y}`}
        // ItemSeparatorComponent={() => <View style={{ width: ITEM_SEPARATOR }}/>}
        renderItem={({ item }) => (
          <Text style={{ width: ITEM_WIDTH, height: 50, backgroundColor: 'pink', marginLeft: ITEM_SEPARATOR / 2, marginRight: ITEM_SEPARATOR / 2 }}>
            {Math.round(item.y)}
          </Text>
        )}
      />
    );
  }
}
const ConnectedChartWrapper = connect(
  state => ({ data: state.data, selectedItem: state.selectedItem }),
  dispatch => ({ loadData: (data) => dispatch(load(data)), select: (idx) => dispatch(select(idx)) }),
)(ChartWrapper);

const App = ({ data }) => (
  <Provider store={store}>
    <View style={{ height: 200 }}>
      <Chart />
      <ConnectedChartWrapper initData={data} />
    </View>
  </Provider>
);

export default App;
