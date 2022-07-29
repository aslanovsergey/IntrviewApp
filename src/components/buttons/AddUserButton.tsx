import { IButtonProps, PrimaryButton } from "@fluentui/react";
import React, { FC } from "react";

interface IProps extends IButtonProps {
  
}

const AddUserButton: FC<IProps> = (props) => {
  return (
    <PrimaryButton
      {...props}
      text="Add new user"
      styles={{
        root: {
          width: "fit-content",
        },
      }}
    />
  );
};

export default AddUserButton;
