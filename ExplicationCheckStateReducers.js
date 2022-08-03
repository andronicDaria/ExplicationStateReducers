// Explicatie la bucata de cod:
// este scris in React, Redux, Flow, ce sunt verificate starea tipului unui reducer
// in redux.

/* @flow */

type Action = {
  type: string,
  payload?: Object,
}

const name: 'settingsScreen' = 'settingsScreen'
const reducer = (
  state: { selectedLanguage: 'en' | 'de' | 'fr' } = { selectedLanguage: 'en' },
  action: Action,
) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGED':
      return {
        ...state,
        selectedLanguage: action.payload && action.payload.language
          ? action.payload.language
          : 'en',
      }

    default:
      return state
  }
}

const allReducers = {
  [name]: reducer,
}
// Intrarea in functional ar fi o functie de reducer (care este una sau mai multe functii
//  de reducers) de tip Reducers cu stare si actiuni, 
// starea poate avea predefinit vri-un tip.

// In functional este descrisa generarea automata a tipurilor de stari pentru reducers 
// noastre(Reducers) care dorim sa setam starea. Atât pentru Redux, cât și pentru Flow
//  este descrisa starea si nu trebuie separat sa setam forma stari, adica includem 
// tipul starii care trebuie sa fie pentru aceste reducers.

type Reducers = typeof allReducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
type State = $ObjMap<Reducers, $ExtractFunctionReturn>

const languageSelector = (state: State) => {
  let language = state[name].selectedLanguage
  return language
}

// Tipul ExtractFunctionReturn este o verificare, setare a starii reducers care sunt 
// incluse in Reducers.

// In tipul State se face un proces de mapare in obiectele a reducerilor cu scopul de 
// verifica/seta tipul starea si valoarea acesteia in cazul dat.

//For exemple:
//      Reducer ={
//                  ['settingsScreen' = 'settingsScreen'] = 
//                  { selectedLanguage: 'en' | 'de' | 'fr' } = { selectedLanguage: 'en' }
//               }
// ---> 1. in type State el mapeaza obiectele si le extrage valoarea fiind rezultat:
//        {
//                  ['settingsScreen'] = { selectedLanguage: 'en' }
//        }

// --->2 in constanta languageSelector el extrage transmite State cu cheia state
//        si o apeleaza in constanta language in urma careia fiind rezultatul
//         {['settingsScreen'] = { selectedLanguage: 'en' }} el extrage valoarea
//           din obiectul cu cheia 'settingsScreen' si dupa extrage cu cheia valoarea
//              selectedLanguage = 'en'.

// --->3 In asa forma sa extras constanta language prin parsarea(maparea) obiectaului starii
//       pentru extragerea unui obiect mai lizibil de extras in constantele care urmeaza
//       a fi apelate.

//Pentru a trece mai departe in createStore.
