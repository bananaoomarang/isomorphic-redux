import { fromJS } from 'immutable';
import assign     from 'object-assign';

Object.assign = Object.assign || assign;

// Abstraction to handle pre-composedstate received from server
// (ie, leave top level keys untouched)
export default function immutifyState(obj) {

  // creating a shallow copy of the original object
  let objMut = Object.assign({}, obj);

  // converting each property to an "immutable" object
  Object
    .keys(objMut)
    .forEach(key => {
      objMut[key] = fromJS(objMut[key]);
    });

  return objMut;
}
