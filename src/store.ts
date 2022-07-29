import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { immerable } from "immer";
import IUser from "./models/IUser";
import { v4 as uuidv4 } from "uuid";

export enum AppDialogType {
  New = 1,
  Edit,
  Delete,
}

class Store {
  [immerable] = true;

  users: IUser[] = [
    {
      id: uuidv4(),
      login: "sergey.aslanov",
      firstName: "Sergey",
      lastName: "Aslanov",
      role: "Senior Software Developer",
      createdOn: new Date(),
      updatedOn: new Date(),
      isActive: true,
    },
    {
      id: uuidv4(),
      login: "ivanov.ivan",
      firstName: "Ivan",
      lastName: "Ivanov",
      role: "Junior Software Developer",
      createdOn: new Date(),
      updatedOn: new Date(),
      isActive: true,
    },
  ];
  dialog: AppDialogType | null = null;
}

const stateSlice = createSlice({
  name: "store",
  initialState: new Store(),
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const user = action.payload;
      const date = new Date();
      user.createdOn = date;
      user.updatedOn = date;

      return {
        ...state,
        users: [...state.users, user],
      };
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const updatedUser = action.payload;

      const userIndex = state.users.findIndex((u) => u.id === updatedUser.id);
      const updatedUsers = [...state.users]
      updatedUsers.splice(userIndex, 1, updatedUser);

      return {
        ...state,
        users: updatedUsers,
      };
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const updatedUsers = state.users.filter((u) => u.id !== action.payload);

      return {
        ...state,
        users: updatedUsers,
      };
    },
    setDialog: (state, action: PayloadAction<AppDialogType | null>) => ({
      ...state,
      dialog: action.payload,
    }),
  },
});

const { actions, reducer } = stateSlice;

export const { addUser, updateUser, deleteUser, setDialog } = actions;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type StoreDispatch = typeof store.dispatch;

export const storeSelector = (state: StoreState): Store => state;
