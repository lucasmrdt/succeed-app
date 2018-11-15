// @flow

import React from 'react';
import { View, Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Header from './StepperFormHeader';
import Button from './StepperFormButton';
import { Wrapper, Body } from '@/components/fragments';
import { SIZES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type NavigationType } from '@/types/rnTypes';
import { type InputType } from '@/components/fragments/Inputs';

type ChildrenType = React.ComponentType<InputType>;

type Props = {
  children: Array<ChildrenType>,
  navigation: NavigationType,
};

type State = {
  index: number,
  status: 'submiting' | 'default',
  data: Object,
  scrollableChildrens: Array<ChildrenType>,
  childrens: Array<ChildrenType>,
  isValids: Array<bool>,
};

class StepperForm extends React.Component<Props, State> {

  state: State;
  _carousel: React.Ref;
  _inputs: Array<React.Ref>;
  _keyboardDidHide: any;

  constructor(props: Props) {
    super(props);

    const { children } = props;
    const childrenArray: Array<ChildrenType> = this.childrenWithProps(children);
    this._inputs = Array(childrenArray.length);
    this.state = {
      data: {},
      index: 0,
      status: 'default',
      childrens: childrenArray,
      scrollableChildrens: [ childrenArray[0] ],
      isValids: Array(childrenArray.length).fill(false),
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('didFocus', this.focusCurrentInput);
    this._keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { scrollableChildrens, isValids, index } = this.state;
    return (nextState.scrollableChildrens !== scrollableChildrens
      || nextState.isValids !== isValids
      || nextState.index !== index
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { scrollableChildrens, index } = this.state;
    if (prevState.scrollableChildrens !== scrollableChildrens) {
      // We have load new screen, we must scroll to it.
      this._carousel && this._carousel.snapToNext();
    }
    if (prevState.index !== index) {
      // We have change of screen, we need to focus the screen's input.
      this.focusCurrentInput();
    }
  }

  componentWillUnmount() {
    this._keyboardDidHide.remove();
  }

  keyboardDidHide = () => {
    const { status } = this.state;
    if (status === 'submiting') {
      this.nextScreen();
      this.setState({ status: 'default' });
    }
  };

  focusCurrentInput = () => {
    const { index } = this.state;
    const currentInput = this._inputs[index];
    currentInput && currentInput.ref.focus();
  }

  childrenWithProps(children: Array<ChildrenType>) {
    const length = React.Children.count(children);
    return React.Children.map(children,
      (children: ChildrenType, index: number) => (
        React.cloneElement(children, {
          ref: (node) => {
            this._inputs[index] = node;
            const { ref } = children;
            typeof ref === 'function' && ref(node);
          },
          returnKeyType: index === length - 1 ? 'done' : 'next',
          onSubmitEditing: this.onSubmitEditing,
          onEndEditing: this.onEndEditing,
          onStatusChange: status => this.onStatusChange(status, index),
        })
      )
    );
  }

  submit() {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }

  getNextStep = () => new Promise(res => {
    this.setState((state: State) => {
      const { scrollableChildrens, childrens } = state;

      if (scrollableChildrens.length >= childrens.length) return null;
      return {
        scrollableChildrens: [
          ...scrollableChildrens,
          childrens[scrollableChildrens.length],
        ]
      };
    }, res);
  });

  nextScreen = () => {
    const {
      scrollableChildrens,
      childrens,
      isValids,
      index,
    } = this.state;

    if (!isValids[index]) {
      // Prevent next when current screen is not valid.
      return;
    }

    if (index === childrens.length - 1) {
      // TODO: Save new goal into server/reducer.
      this.submit();
      return;
    }

    if (index === scrollableChildrens.length - 1) {
      this.getNextStep();
    } else {
      this._carousel && this._carousel.snapToNext();
    }
  };

  onEndEditing = ({ key, value }) => {
    this.setState(({ data }: State) => {
      if (data.key == value) return null;
      return ({ ...data, [key]: value });
    });
  };

  onStatusChange(status: bool, index: number) {
    this.setState((state: State) => ({
      isValids: state.isValids.map((val, ii) => (
        ii === index ? status : val
      )),
    }));
  }

  onSnapToItem = (index) => {
    this.setState({ index });
  }

  onSubmitEditing = () => {
    this.setState({ status: 'submiting' });
  }

  onClose = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }

  renderHeader() {
    const { childrens } = this.state;

    return (<Header
      onClose={this.onClose}
      nbSteps={childrens.length}
      progress={this._carousel && this._carousel._scrollPos}
    />);
  }

  renderItem = ({
    item,
  }: { item: ChildrenType, index: number }) => {
    if (!item) return null;

    return <View style={styles.item}>{item}</View>;
  };

  renderButton() {
    const { index, childrens, isValids } = this.state;
    const currentChildren = childrens[index];
    const isValid = isValids[index];

    if (!currentChildren) return null;

    const { props: { validText, errorText } } = currentChildren;

    return (<Button
      validText={validText}
      errorText={errorText}
      isLastScreen={index === childrens.length - 1}
      isValid={isValid}
      onPress={this.nextScreen}
    />);
  }

  render() {
    const { scrollableChildrens } = this.state;

    return (
      <Wrapper style={styles.wrapper}>
        {this.renderHeader()}
        <Body style={styles.body}>
          <Carousel
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeAnimationType='spring'
            data={scrollableChildrens}
            ref={r => this._carousel = r}
            renderItem={this.renderItem}
            sliderWidth={SIZES.WIDTH}
            itemWidth={SIZES.WIDTH}
            onSnapToItem={this.onSnapToItem}
            shouldOptimizeUpdates
            lockScrollWhileSnapping
          />
          {this.renderButton()}
        </Body>
        <KeyboardSpacer />
      </Wrapper>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    paddingBottom: 0,
  },
  body: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(StepperForm);
