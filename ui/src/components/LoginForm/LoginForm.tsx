import React, {FC, useEffect, useMemo, useState} from "react";
import store, {useDispatch, useSelector} from "../../store";
import {login, registration} from "../../store/ActionsCreators";
import styles from './LoginForm.module.scss';
import cn from 'classnames'
import {MdMailOutline, MdLockOpen, MdLockOutline, MdPersonOutline, MdRemoveRedEye} from "react-icons/md";
import {useInput} from "../../customHooks/useInput";
import {ValidationTypes} from "../../models/validation";

const LoginForm: FC = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoginTabActive, setIsLoginTabActive] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermAccepted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isLoginValid, setIsLoginValid] = useState<boolean>(false);
  const [isSignUpValid, setIsSignUpValid] = useState<boolean>(false);
  const {error} = useSelector(state => state.authReducer);

  const email = useInput<string>('', {
    [ValidationTypes.isEmpty]: true,
    [ValidationTypes.maxLength]: 50,
    [ValidationTypes.minLength]: 5,
    [ValidationTypes.isEmail]: true,
  });
  const password = useInput<string>('', {
    [ValidationTypes.isEmpty]: true,
    [ValidationTypes.maxLength]: 50,
    [ValidationTypes.minLength]: 3
  });
  const confirmPassword = useInput<string>('', {
    [ValidationTypes.isEmpty]: true,
    [ValidationTypes.maxLength]: 50,
    [ValidationTypes.minLength]: 3,
    [ValidationTypes.isPasswordsEqual]: password.value
  });
  const name = useInput<string>('', {
    [ValidationTypes.isEmpty]: true,
    [ValidationTypes.maxLength]: 100,
    [ValidationTypes.minLength]: 2,
  });
  const surname = useInput<string>('', {
    [ValidationTypes.isEmpty]: true,
    [ValidationTypes.maxLength]: 100,
    [ValidationTypes.minLength]: 2,
  });

  useEffect(() => {
    if (email.isInputValid && password.isInputValid) {
      setIsLoginValid(true);
    } else {
      setIsLoginValid(false);
    }
  }, [email.isInputValid, password.isInputValid]);

  useEffect(() => {
    if (email.isInputValid && password.isInputValid && name.isInputValid && surname.isInputValid && confirmPassword.isInputValid && isTermsAccepted) {
      setIsSignUpValid(true);
    } else {
      setIsSignUpValid(false);
    }
  }, [email.isInputValid, password.isInputValid, name.isInputValid, surname.isInputValid, confirmPassword.isInputValid, isTermsAccepted])

  const onRegistration = () => {
    dispatch(registration(email.value, password.value, name.value, surname.value));
  }
  const onLogin = () => {
    dispatch(login(email.value, password.value));
  }

  const emailErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {email.isDirty && email.isEmpty.value && <span>{email.isEmpty.text}</span>}
      {email.isDirty && email.minLengthError.value && <span>{email.minLengthError.text}</span>}
      {email.isDirty && email.maxLengthError.value && <span>{email.maxLengthError.text}</span>}
      {email.isDirty && email.emailError.value && <span>{email.emailError.text}</span>}
    </div>
  ), [email]);

  const passwordErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {password.isDirty && password.isEmpty.value && <span>{password.isEmpty.text}</span>}
      {password.isDirty && password.minLengthError.value && <span>{password.minLengthError.text}</span>}
      {password.isDirty && password.maxLengthError.value && <span>{password.maxLengthError.text}</span>}
    </div>
  ), [password]);

  const confirmPasswordErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {confirmPassword.isDirty && confirmPassword.isEmpty.value &&
          <span>{confirmPassword.isEmpty.text}</span>}
      {confirmPassword.isDirty && confirmPassword.minLengthError.value &&
          <span>{confirmPassword.minLengthError.text}</span>}
      {confirmPassword.isDirty && confirmPassword.maxLengthError.value &&
          <span>{confirmPassword.maxLengthError.text}</span>}
      {confirmPassword.isDirty && confirmPassword.isPasswordEqualError.value &&
          <span>{confirmPassword.isPasswordEqualError.text}</span>}
    </div>
  ), [confirmPassword]);

  const nameErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {name.isDirty && name.isEmpty.value && <span>{name.isEmpty.text}</span>}
      {name.isDirty && name.minLengthError.value && <span>{name.minLengthError.text}</span>}
      {name.isDirty && name.maxLengthError.value && <span>{name.maxLengthError.text}</span>}
    </div>
  ), [name]);

  const surNameErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {surname.isDirty && surname.isEmpty.value && <span>{surname.isEmpty.text}</span>}
      {surname.isDirty && surname.minLengthError.value && <span>{surname.minLengthError.text}</span>}
      {surname.isDirty && surname.maxLengthError.value && <span>{surname.maxLengthError.text}</span>}
    </div>
  ), [surname]);

  const responseErrorBlock = useMemo(() => (
    <div className={styles.validationText}>
      {error && <span>{error}</span>}      
    </div>
  ), [error]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={cn(styles.forms, isLoginTabActive && styles.active)}>
          <div className={cn(styles.form, isLoginTabActive && styles.active, styles.login)}>
            <span className={styles.title}>Login</span>
            <form action="#">
              <div className={styles.inputField}>
                {emailErrorBlock}
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)}
                       onBlur={(e: React.ChangeEvent<HTMLInputElement>) => email.onBlur(e)}
                       value={email.value}
                       placeholder='E-mail'
                       type='text'
                />
                <MdMailOutline/>
              </div>
              <div className={styles.inputField}>
                {passwordErrorBlock}
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)}
                       onBlur={(e: React.ChangeEvent<HTMLInputElement>) => password.onBlur(e)}
                       value={password.value}
                       placeholder='Password'
                       type={isShowPassword ? 'text' : 'password'}
                />
                {isShowPassword ? <MdLockOpen className={styles.icon}/> : <MdLockOutline className={styles.icon}/>}
                <MdRemoveRedEye
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className={styles.showHidePw}/>
                  {responseErrorBlock}
              </div>

              <div className={cn(styles.inputField, styles.button)}>
                <input disabled={!isLoginValid} onClick={onLogin} type="button" value="Login"/>
              </div>
            </form>
            <div className={styles.loginSignup}>
            <span className={styles.text}>Not a member?
                <span onClick={() => setIsLoginTabActive(!isLoginTabActive)}
                      className={styles.textLink}>Signup Now</span>
            </span>
            </div>
          </div>

          {/*// Registration Form*/}
          <div className={cn(styles.form, isLoginTabActive && styles.active, styles.signup)}>
            <span className={styles.title}>Registration</span>
            <form action="#">
              <div className={styles.inputField}>
                {nameErrorBlock}
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => name.onChange(e)}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => name.onBlur(e)}
                  value={name.value}
                  placeholder='Name'
                  type='text'
                />
                <MdPersonOutline/>
              </div>
              <div className={styles.inputField}>
                {surNameErrorBlock}
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => surname.onChange(e)}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => surname.onBlur(e)}
                  value={surname.value}
                  placeholder='Surname'
                  type='text'
                />
                <MdPersonOutline/>
              </div>
              <div className={styles.inputField}>
                {emailErrorBlock}
                <input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => email.onBlur(e)}
                  value={email.value}
                  placeholder="Enter your email"
                />
                <MdMailOutline/>
              </div>
              <div className={styles.inputField}>
                {passwordErrorBlock}
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => password.onBlur(e)}
                  value={password.value}
                />
                {isShowPassword ? <MdLockOpen className={styles.icon}/> : <MdLockOutline className={styles.icon}/>}
              </div>
              <div className={styles.inputField}>
                {confirmPasswordErrorBlock}
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => confirmPassword.onChange(e)}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => confirmPassword.onBlur(e)}
                  value={confirmPassword.value}
                  placeholder="Confirm a password"
                />
                {isShowPassword ? <MdLockOpen className={styles.icon}/> : <MdLockOutline className={styles.icon}/>}
                <MdRemoveRedEye
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className={styles.showHidePw}/>
                  {responseErrorBlock}
              </div>

              <div className={styles.checkboxText}>
                <div className={styles.checkboxContent}>
                  <input type="checkbox"
                         id={'termCon'}
                         checked={isTermsAccepted}
                         onChange={() => setIsTermAccepted(!isTermsAccepted)}
                  />
                  <label htmlFor="termCon" className={styles.text}>I accepted all terms and conditions</label>
                </div>
              </div>

              <div className={cn(styles.inputField, styles.button)}>
                <input disabled={!isSignUpValid} onClick={onRegistration} type="button" value="Signup"/>
              </div>
            </form>

            <div className={styles.loginSignup}>
            <span className={styles.text}>Already a member?
              <span onClick={() => setIsLoginTabActive(!isLoginTabActive)} className={styles.textLink}>Login Now</span>
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;