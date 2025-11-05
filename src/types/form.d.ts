import { Dispatch, SetStateAction } from "react";

type Field<T = string> = {
  value: T;
  setter: Dispatch<SetStateAction<T>>;
  type: string;
  required?: boolean;
  label?: string;
};
