import { IButtonProps, IconButton } from "@fluentui/react";
import React, { FC } from "react";
import { redTheme } from "../../styles/themes";

interface IProps extends IButtonProps {}

const EditUserButton: FC<IProps> = (props) => {
  return (
    <IconButton
      {...props}
      iconProps={{
        iconName: "Delete",
      }}
      title="Delete"
      ariaLabel="Delete"
      theme={redTheme}
    />
  );
};

export default EditUserButton;
