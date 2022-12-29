import {ChangeEvent, useState} from "react";
import {IValidationsType} from "../models/validation";
import {useValidation} from "./useValidation";

export const useInput = <T extends string | number>(initialValue: T, validations: IValidationsType)=>{
  const [value, setValue] = useState<T>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement>)=>{
    setIsDirty(true);
  }

  return {
    value, onChange, onBlur, isDirty, ...valid
  }
}