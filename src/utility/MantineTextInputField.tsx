import { Input, InputWrapper } from "@mantine/core";
import { useController, Control } from "react-hook-form";

type Props = {
  type: string
  label: string;
  errorMessage?: string;
  value?: string
  name: string;
  control: Control<any>;
};

const MantineTextInputField = ({ type, label, value, errorMessage, control, name }: Props) => {

  const { field } = useController({ name, control });

  return (
    <InputWrapper label={label} error={errorMessage}>
      <Input
        defaultValue={field.value}
        value={value}
        type={type}
        id={name}
        name={field.name}
        ref={field.ref}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </InputWrapper>
  );
};

export default MantineTextInputField;
