// @flow

class Converter {
  static rgbWithOpacity (color: string, opacity: number) {
    const rgbTester = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    const matchs = rgbTester.exec(color);
    if (!matchs) {
      console.warn('You must provide rgb color in rgbWithOpacity.');
      return color;
    }

    return `rgba(${matchs[1]},${matchs[2]},${matchs[3]},${opacity})`;
  };
}

export default Converter;
