import {configureStore} from "@reduxjs/toolkit"
import globalReducer from "./reducers/globalReducer";
import cartReducer from "./reducers/cartReducer";
import itemService from "./services/itemService";
import locationService from "./services/locationService";
import mealtypeService from "./services/mealtypeService";
import restaurentService from "./services/restaurantService";
const store = configureStore({
  reducer: {
    [restaurentService.reducerPath]:restaurentService.reducer,
     [locationService.reducerPath]:locationService.reducer,
     [mealtypeService.reducerPath]:mealtypeService.reducer,
     [itemService.reducerPath]:itemService.reducer,
    "globalReducer":globalReducer,
    "cartReducer":cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([restaurentService.middleware,locationService.middleware,mealtypeService.middleware,itemService.middleware])
})

export default store;