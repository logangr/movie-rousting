import React, { useReducer, createContext } from "react";
//Definimos el contexto de nuestra aplicacion
const AppContext = createContext();
//Definimos un estado inicial de aplicacion, que es interno
const initialState = {
    page: 1,
    count: 0,
    movies: []
}
//Serializamos las claves de nuestra aplicacion para no tener fallos
const ACTIONS = {
    SET_MENU_PAGE: "setMenuPage",
    LOAD_MOVIES: "loadMovies",
    INCREMENT_COUNT: "incrementCount"
}
// Aqui esta el turron! El reducer. Switch entre acciones que modifica parte del estado
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_MENU_PAGE:
            return {...state, page: action.payload}
        case ACTIONS.INCREMENT_COUNT:
            return {...state, count: state.count + 1}
        default:
            return state
    }
}
//AppProvider sera nuestro componente magico! Hara todo lo necesario para las acciones
// En esta clase, tendremos toda la logica de aplicacion
const AppProvider = ({ children }) => {
    //Aqui invocamos el reducer, nos trae el estado y el dispatch para lanzar eventos
    const [appState, dispatch] = useReducer(reducer, initialState);
    //Como no queremos usar dispatch fuera de la aplicacion, vamos a hacer un hub de funciones
    // Usamos payload como un elemento dinamico -> es un concepto redux
    const appActions = {
        setPage1: () => {
            dispatch({type: ACTIONS.SET_MENU_PAGE, payload: 1})
            console.log("page 1")
        },
        setPage2: () => {
            console.log("page 2")
            dispatch({type: ACTIONS.SET_MENU_PAGE, payload: 2})
        },
        setPage3: () => {
            console.log("page 3")
            dispatch({type: ACTIONS.SET_MENU_PAGE, payload: 3})
        },
        incrementCount: () => {
            console.log("incrementing count")
            dispatch({type: ACTIONS.INCREMENT_COUNT})
        },
    }
    //Esta function envia como valor un objeto json, con el estado y las acciones que queremos usar externas
    return (
        <AppContext.Provider value={{
            appState: appState,
            appActions: appActions,
        }}>
            {children}
        </AppContext.Provider>
    );
};
//Y lo mas importante, solo exportamos el componente y el contexto para usar useContext
export { AppProvider, AppContext };