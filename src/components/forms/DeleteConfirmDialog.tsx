import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Text,
} from "@fluentui/react";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import IUser from "../../models/IUser";
import { deleteUser } from "../../store";
import { redTheme } from "../../styles/themes";

interface IProps {
  onClose: () => void;
  user: IUser;
}

const DeleteConfirmDialog: FC<IProps> = (props) => {
  const { onClose, user } = props;

  const dispatch = useDispatch();

  return (
    <Dialog
      hidden={false}
      onDismiss={onClose}
      dialogContentProps={{
        title: "Delete user",
      }}
      modalProps={{}}
    >
      <Text>{`Are you sure you want to delete user ${user.login}`}</Text>
      <DialogFooter>
        <PrimaryButton
          onClick={() => {
            dispatch(deleteUser(user.id));
            onClose();
          }}
          theme={redTheme}
          text="Delete"
        />
        <DefaultButton onClick={onClose} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
