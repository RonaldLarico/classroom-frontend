// store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import checkboxReducer from '@/components/utils/format/checkbox'; // Importa tus reducers aquí

// Combinamos los reducers si tienes más de uno
const rootReducer = combineReducers({
  checkbox: checkboxReducer,
  // Otros reducers aquí si los tienes
});

// Tipo para el estado raíz
export type RootState = ReturnType<typeof rootReducer>;

// Creamos el store con Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  // Puedes configurar middleware y otras opciones aquí si es necesario
});

export default store;
