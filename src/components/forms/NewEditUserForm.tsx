import {
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  Dialog,
  Stack,
  TextField,
  Toggle,
} from "@fluentui/react";
import { Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import IUser from "../../models/IUser";
import { addUser, updateUser } from "../../store";
import { v4 as uuidv4 } from "uuid";

export enum UserDialogMode {
  New = 1,
  Edit,
}

interface IProps {
  onClose: () => void;
  mode: UserDialogMode;
  user?: IUser;
}

const NewEditUserForm: FC<IProps> = (props) => {
  const { onClose, mode, user } = props;

  const dispatch = useDispatch();

  const title = mode === UserDialogMode.New ? "Create new user" : "Edit user";

  const onSubmit = (
    values: Partial<IUser>,
    formikHelpers: FormikHelpers<Partial<IUser>>
  ) => {
    const user = { ...values } as IUser;
    if (mode === UserDialogMode.New) {
      dispatch(addUser(user));
    } else {
      dispatch(updateUser(user));
    }

    formikHelpers.setSubmitting(false);
    onClose();
  };

  const validate = (values: Partial<IUser>) => {
    const errors: FormikErrors<Partial<IUser>> = {};

    if (!values.login) {
      errors.login = "Login is required field";
    }

    console.log("errors", errors);
    return errors;
  };

  const initalValues: Partial<IUser> =
    mode === UserDialogMode.Edit
      ? (user as IUser)
      : {
          id: uuidv4(),
          login: "",
          firstName: "",
          lastName: "",
          role: "",
          isActive: true,
        };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initalValues}
      validate={validate}
      validateOnChange={false}
    >
      {(formik: FormikProps<Partial<IUser>>) => {
        const values = formik.values;
        const errors = formik.errors;
        const isSubmitting = formik.isSubmitting;

        return (
          <Dialog
            hidden={false}
            onDismiss={onClose}
            dialogContentProps={{
              type: DialogType.close,
              title: title,
              closeButtonAriaLabel: "Close",
            }}
            modalProps={{
              isBlocking: true,
            }}
          >
            <Stack tokens={{ childrenGap: 15 }}>
              <TextField
                label="Login"
                name="login"
                value={values.login}
                onChange={formik.handleChange}
                errorMessage={errors.login}
                disabled={isSubmitting}
              />
              <TextField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={formik.handleChange}
                errorMessage={errors.firstName}
                disabled={isSubmitting}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={formik.handleChange}
                errorMessage={errors.lastName}
                disabled={isSubmitting}
              />
              <TextField
                label="Role"
                name="role"
                value={values.role}
                onChange={formik.handleChange}
                errorMessage={errors.role}
                disabled={isSubmitting}
              />
              <Toggle
                label="Is Active"
                onChange={(ev, checked) =>
                  formik.setFieldValue("isActive", checked)
                }
                checked={values.isActive}
                disabled={isSubmitting}
              />
            </Stack>
            <DialogFooter>
              <PrimaryButton
                onClick={formik.submitForm}
                text={mode === UserDialogMode.New ? "Create" : "Update"}
                disabled={
                  isSubmitting ||
                  (mode === UserDialogMode.Edit && !formik.dirty)
                }
              />
              <DefaultButton
                onClick={onClose}
                text="Cancel"
                disabled={isSubmitting}
              />
            </DialogFooter>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default NewEditUserForm;
