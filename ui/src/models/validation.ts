export type IValidationsType = {
  [value in ValidationTypes]?: any;
}

export enum  ValidationTypes {
  minLength = 'minLength',
  maxLength = 'maxLength',
  isEmpty = 'isEmpty',
  isEmail='isEmail',
  isPasswordsEqual='isPasswordsEqual',
}