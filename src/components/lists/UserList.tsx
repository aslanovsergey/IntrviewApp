import {
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  DialogType,
  IColumn,
  IDetailsRowProps,
  IDetailsRowStyles,
  IRenderFunction,
  SelectionMode,
} from "@fluentui/react";
import React, { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IUser from "../../models/IUser";
import { AppDialogType, setDialog, storeSelector } from "../../store";
import { blueTheme } from "../../styles/themes";
import DeleteUserButton from "../buttons/DeleteUserButton";
import EditUserButton from "../buttons/EditUserButton";
import DeleteConfirmDialog from "../forms/DeleteConfirmDialog";
import NewEditUserForm, { UserDialogMode } from "../forms/NewEditUserForm";

interface IProps {
  users: IUser[];
}

const UserList: FC<IProps> = (props) => {
  const { users } = props;

  const [selectedUser, setSelectedUser] = useState<IUser>();

  const { dialog } = useSelector(storeSelector);

  const dispatch = useDispatch();

  const columns: IColumn[] = useMemo(() => {
    const columns: IColumn[] = [
      {
        key: "login",
        fieldName: "login",
        name: "Login",
        minWidth: 150,
      },
      {
        key: "firstName",
        fieldName: "firstName",
        name: "First Name",
        minWidth: 100,
      },
      {
        key: "lastName",
        fieldName: "lastName",
        name: "Last Name",
        minWidth: 100,
      },
      {
        key: "role",
        fieldName: "role",
        name: "Role",
        minWidth: 150,
      },
      {
        key: "createdOn",
        fieldName: "createdOn",
        name: "Created On",
        minWidth: 150,
        onRender: (item: IUser) => item.createdOn.toLocaleString(),
      },
      {
        key: "updatedOn",
        fieldName: "updatedOn",
        name: "Updated On",
        minWidth: 150,
        onRender: (item: IUser) => item.updatedOn.toLocaleString(),
      },
      {
        key: "isActive",
        fieldName: "isActive",
        name: "Is Active",
        minWidth: 100,
      },
      {
        key: "edit",
        name: "",
        minWidth: 50,
        onRender: (item: IUser) => (
          <EditUserButton
            onClick={() => {
              setSelectedUser(item);
              dispatch(setDialog(AppDialogType.Edit));
            }}
          />
        ),
      },
      {
        key: "delete",
        name: "",
        minWidth: 50,
        onRender: (item: IUser) => (
          <DeleteUserButton
            onClick={() => {
              setSelectedUser(item);
              dispatch(setDialog(AppDialogType.Delete));
            }}
          />
        ),
      },
    ];

    return columns;
  }, []);

  return (
    <>
      <DetailsList
        items={users}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        //   selection={this._selection}
        selectionPreservedOnEmptyClick={true}
        // onItemInvoked={this._onItemInvoked}
        selectionMode={SelectionMode.none}
        ariaLabelForGrid="UserList"
        onRenderRow={onRenderRow}
      />
      {dialog ? (
        dialog === AppDialogType.Edit && selectedUser ? (
          <NewEditUserForm
            mode={UserDialogMode.Edit}
            onClose={() => {
              setSelectedUser(undefined);
              dispatch(setDialog(null));
            }}
            user={selectedUser}
          />
        ) : (
          dialog === AppDialogType.Delete &&
          selectedUser && (
            <DeleteConfirmDialog
              user={selectedUser}
              onClose={() => {
                setSelectedUser(undefined);
                dispatch(setDialog(null));
              }}
            />
          )
        )
      ) : null}
    </>
  );
};

export default UserList;

const onRenderRow: IRenderFunction<IDetailsRowProps> = (props) => {
  if (props) {
    const customStyles: Partial<IDetailsRowStyles> = {
      cell: {
        minHeight: 52,
        display: "flex",
        alignItems: "center",
        backgroundColor:
          props.itemIndex % 2 === 0
            ? blueTheme.palette.themeLighterAlt
            : undefined,
      },
    };

    console.log("props.theme", props.theme);
    console.log("customStyles", customStyles);
    return <DetailsRow {...props} styles={customStyles} />;
  }

  return null;
};
