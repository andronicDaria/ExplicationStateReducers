// Explicatie la bucata de cod:
// este scris in React, Redux, Flow, ce sunt verificate starea tipului unui reducer
// in redux.

import type { Action } from '../types/Action';
type State = number;
export default function counter(state: State = 0, action: Action) {
  switch (action.type) {
  case 'INCREMENT_COUNTER':
    return state + action.payload;
  case 'DECREMENT_COUNTER':
    return state - action.payload;
  default:
    return state;
  }
}
<strong>type</strong> State = number;

// Intrarea in functional ar fi o functie de reducer (care este una sau mai multe functii
//  de reducers) de tip Reducers cu stare si actiuni, 
// starea poate avea predefinit vri-un tip.

const reducers = {
  counter,
};
export type Reducers = typeof reducers;
export default combineReducers(reducers);


// In functional este descrisa generarea automata a tipurilor de stari pentru reducers 
// noastre(Reducers) care dorim sa setam starea. Atât pentru Redux, cât și pentru Flow
//  este descrisa starea si nu trebuie separat sa setam forma stari, adica includem 
// tipul starii care trebuie sa fie pentru aceste reducers.

import type { Reducers } from '../reducers';

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;


// Tipul ExtractFunctionReturn este o verificare, setare a starii reducers care sunt 
// incluse in Reducers.

//Pentru a trece mai departe in createStore.
