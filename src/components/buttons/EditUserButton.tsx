import { IButtonProps, IconButton } from "@fluentui/react";
import React, { FC } from "react";

interface IProps extends IButtonProps {}

const EditUserButton: FC<IProps> = (props) => {
  return (
    <IconButton
      {...props}
      iconProps={{
        iconName: "Edit",
      }}
      title="Edit"
      ariaLabel="Edit"
      //   disabled={disabled}
    />
  );
};

export default EditUserButton;
