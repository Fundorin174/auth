import {useEffect, useState} from "react";
import {IValidationsType, ValidationTypes} from "../models/validation";
type ErrorType = { value: boolean, text: string}

export const useValidation = (value: any, validations: IValidationsType) => {
  const [isEmpty, setIsEmpty] = useState<ErrorType>({value: true, text: ''});
  const [minLengthError, setMinLengthError] = useState<ErrorType>({value: false, text: ''});
  const [maxLengthError, setMaxLengthError] = useState<ErrorType>({value: false, text: ''});
  const [emailError, setEmailError] = useState<ErrorType>({value: false, text: ''});
  const [isPasswordEqualError, setIsPasswordEqualError] = useState<ErrorType>({value: false, text: ''});
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case ValidationTypes.minLength:
          value.length < validations[validation] ? setMinLengthError({value: true, text: `Minimum length - ${validations[validation]} char`}) : setMinLengthError({value: false, text: ``});
          break;
        case ValidationTypes.maxLength:
          value.length > validations[validation] ? setMaxLengthError({value: true, text: `Maximum length - ${validations[validation]} char`}) : setMaxLengthError({value: false, text: ``});
          break;
        case ValidationTypes.isEmpty:
          value ? setIsEmpty({value: false, text: ''}) : setIsEmpty({value: true, text: 'Required field'});
          break;
        case ValidationTypes.isEmail:
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          re.test(String(value).toLowerCase()) ? setEmailError({value: false, text: ''}) : setEmailError({value: true, text: 'Wrong email type'});
        break;
      case ValidationTypes.isPasswordsEqual:
        value !== validations[validation] ? setIsPasswordEqualError({value: true, text: `Passwords not equal`}) : setIsPasswordEqualError({value: false, text: ``});
        break;
      }
    }
  }, [value])

  useEffect(()=>{
    if (isEmpty.value || maxLengthError.value || minLengthError.value || emailError.value || isPasswordEqualError.value) {
      setIsInputValid(false)
    } else {
      setIsInputValid(true)
    }
  }, [isEmpty.value, maxLengthError.value, minLengthError.value, emailError.value, isPasswordEqualError.value])

  return {isEmpty, minLengthError, maxLengthError ,emailError, isPasswordEqualError, isInputValid}
}