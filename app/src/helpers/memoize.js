// @flow

class Memoize {
  static shouldUpdate(...keys: String) {
    return (target, name, descriptor) => {
      const func = descriptor.value;
      let store = null;
      let prevProps = {};

      descriptor.value = (props: Object) => {
        const needUpdate = keys.find(k => prevProps[k] !== props[k]);
        prevProps = props;

        if (needUpdate) {
          store = func(props);
        }
        return store;
      };
    };
  }

  static byKeys(...keys) {
    return (target, name, descriptor) => {
      const parentFunction: Function = descriptor.value;
      const store = {};

      descriptor.value = (props: Object) => {
        const key = keys.map(k => props[k]).join('_');
        if (store[key] === undefined) {
          store[key] = parentFunction(props);
        }
        return store[key];
      };
    }
  }
}

export default Memoize;
