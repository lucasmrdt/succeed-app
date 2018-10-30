// @flow

import React from 'react';
import FilterItem from './FilterItem';
import Context from './FilterContext';
import { Animated } from 'react-native';
import { Overlay } from '@/components/fragments';
import { DATA, COLORS, ANIMATIONS } from '@/constants';

import { type FilterType } from '@/types/dataTypes';
import { type OverlayContextType } from '@/types/contextType';

const OverlayWithContext = Context.withContext('status')(Overlay);
const OVERLAY_HEIGHT = 330;
const ANIMATION_OPTIONS = {
  easing: ANIMATIONS.EASING_EXP,
  duration: ANIMATIONS.VERY_QUICK_DURATION,
  useNativeDriver: true,
};

type Props = {
  selectedFilter: FilterType,
  onSelectFilter: (filter: FilterType) => void,
  children: any,
};

type State = OverlayContextType;

class FilterOverlay extends Context.Provider<Props, State> {

  constructor(props) {
    super(props);
    // We mutated it to avoid useless re-render.
    this.state.toggle = this.toggle;
  }

  open = () => {
    const { animationProgress } = this.state;

    Animated.timing(animationProgress, {
      toValue: 1,
      ...ANIMATION_OPTIONS,
    }).start(() => {
      this.setState({ status: 'open' });
    });
  };

  close = () => {
    const { animationProgress } = this.state;

    Animated.timing(animationProgress, {
      toValue: 0,
      ...ANIMATION_OPTIONS,
    }).start(() => {
      this.setState({ status: 'close' });
    });
  };

  toggle = () => {
    const { status } = this.state;

    if (status === 'moving') {
      // Prevent spamming click.
      return;
    }

    this.setState((prevState: State) => ({
      status: 'moving',
      light: !prevState.light,
    }));

    if (status === 'open') {
      this.close();
    } else {
      this.open();
    }
  };

  onSelectFilter = (index: number) => {
    const { selectedFilter, onSelectFilter } = this.props;
    const requestedFilter = DATA.FILTERS[index];

    if (requestedFilter === selectedFilter) {
      return;
    }
    onSelectFilter(requestedFilter);
  }

  renderOverlay() {
    const { selectedFilter } = this.props;

    return (
      <OverlayWithContext
        onSelectItem={this.onSelectFilter}
        height={OVERLAY_HEIGHT}
        backgroundColor={COLORS.WHITE}
      >
        {DATA.FILTERS.map((filter, index) => (
          <FilterItem
            key={`filter_${index}`}
            index={index}
            filter={filter}
            selectedFilter={selectedFilter}
          />)
        )}
      </OverlayWithContext>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        {this.renderOverlay()}
        {children}
      </React.Fragment>
    );
  }

}

export default FilterOverlay;
