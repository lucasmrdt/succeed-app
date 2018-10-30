// @flow

import React from 'react';

type UpdaterType = () => void;
type GlobalListenersType = { [key: string]: UpdaterType };
type ScopedListenersType = { [props: string]: Set<UpdaterType> };

/**
 * eg.
 *
 * context = new Context({ foo: 'bar' });
 *
 * const Child = context.withContext(props => <p>props.foo</p>);
 *
 * class Parent extends Context.Provider {
 *  componentDidMount() {
 *    this.setState({ foo: 'bar2 });
 *  }
 *
 *  render() {
 *    <Child /> // Will display bar2.
 *  }
 * }
 */
class Context {
  globalListeners: GlobalListenersType = {};
  scopedListeners: ScopedListenersType = {};

  Provider: React.ComponentType<any> = class extends React.PureComponent {};

  constructor(state: Object) {
    this.state = state;

    this.Provider.prototype.setState = this.setState;
    this.Provider.prototype.state = this.state;
  }

  removeListenerForKey = (updater: UpdaterType, key: string) => {
    if (typeof this.scopedListeners[key] === 'object') {
      this.scopedListeners[key].delete(updater);
    }
  };

  removeListener = (updater: UpdaterType) => {
    if (this.globalListeners[updater]) {
      delete this.globalListeners[updater];
    }
    Object.keys(this.scopedListeners).forEach(
      this.removeListenerForKey.bind(null, updater)
    );
  };

  addListenerForKey = (updater: UpdaterType, key: string) => {
    const listenersForKey = this.scopedListeners[key];

    if (typeof listenersForKey === 'object') {
      listenersForKey.add(updater);
    } else {
      this.scopedListeners[key] = new Set([updater]);
    }
  };

  addListener = (updater: UpdaterType, keys: Array<string>) => {
    if (!keys || keys.length === 0) {
      this.globalListeners[updater] = { updater };
    } else {
      keys.forEach(this.addListenerForKey.bind(null, updater));
    }
  };

  setState = (state: Object | Function) => {
    const updatedComponent = new Set();

    if (typeof state === 'function') {
      state = state(this.state);
    }

    Object.assign(this.state, state);
    Object.keys(state).forEach((key: string) => {
      const listenersForKey = this.scopedListeners[key];
      if (!listenersForKey) return;

      listenersForKey.forEach((updater: UpdaterType) => {
        if (!updatedComponent.has(updater)) {
          updatedComponent.add(updater);
          updater();
        }
      });
    });
  };

  withContext = (...keys: Array<string>) => {
    return component => {
      const addListener = this.addListener;
      const removeListener = this.removeListener;
      const state = this.state;
      const factoriedComponent = React.createFactory(component);

      class Consumer extends React.PureComponent {
        componentDidMount() {
          addListener(this.forceUpdate.bind(this), keys);
        }

        componentWillUnmount() {
          removeListener(this.forceUpdate.bind(this));
        }

        render() {
          return factoriedComponent({ ...this.props, ...state });
        }
      }
      return Consumer;
    };
  };
}

export default Context;
