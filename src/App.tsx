import { Stack } from "@fluentui/react";
import React, { FC } from "react";
import AddUserButton from "./components/buttons/AddUserButton";
import UserList from "./components/lists/UserList";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import NewEditUserForm, {
  UserDialogMode,
} from "./components/forms/NewEditUserForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDialogType, setDialog, storeSelector } from "./store";
initializeIcons();

export const App: FC = (props) => {
  const { users, dialog } = useSelector(storeSelector);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Stack
        tokens={{
          childrenGap: 20,
        }}
      >
        <AddUserButton
          onClick={() => {
            dispatch(setDialog(AppDialogType.New));
          }}
        />
        <UserList users={users} />
        {dialog
          ? dialog === AppDialogType.New && (
              <NewEditUserForm
                mode={UserDialogMode.New}
                onClose={() => {
                  dispatch(setDialog(null));
                }}
              />
            )
          : null}
      </Stack>
    </div>
  );
};
