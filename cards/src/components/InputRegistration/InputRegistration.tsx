import React, {ChangeEvent} from 'react';
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import style from './InputRegistration.module.scss'
import {useFormik} from "formik";
import {useAppDispatch} from "../../app/redax/store";
import {RegistrationTC} from "../../app/redax/auth-reducer";


type FormikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const InputRegistration = () => {
    const [value, setValues] = React.useState<boolean>(false);
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values)=> {
            const errors:FormikErrorType = {}
            if(!values.email){
                errors.email = 'requred'
            } else  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if(!values.password){
                errors.password = 'requred'
            } else if ( values.password.length < 6){
                errors.password = 'Invalid password'
            }
            if(!values.confirmPassword){
                errors.confirmPassword = 'requred'
            } else if (values.confirmPassword !== values.password){
                errors.confirmPassword = 'passwords must be equal'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(RegistrationTC(values.email,values.password))
            formik.resetForm()
        },
    });
    const handleClickShow = () => {
        setValues(!value)
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (

        <div className={style.inputs}>
            <form onSubmit={formik.handleSubmit} className={style.form}>
                <FormControl className={style.formControl}>
                    <InputLabel>Email</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type='text'
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email && <div className={style.error}><div style={{color:'red'}}>{formik.errors.email}</div></div>}
                <FormControl className={style.formControl}>
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={value ? 'text' : 'password'}
                        {...formik.getFieldProps('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShow}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {value ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&<div className={style.error}> <div style={{color:'red'}}>{formik.errors.password}</div></div>}
                <FormControl className={style.formControl}>
                    <InputLabel htmlFor="filled-adornment-password">Confirm password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={value ? 'text' : 'password'}
                        {...formik.getFieldProps('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShow}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {value ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&<div className={style.error}> <div style={{color:'red'}}>{formik.errors.confirmPassword}</div></div>}
                <Button style = {{  borderRadius: '18px',
                    marginTop:"20px",
                    width: "255px",
                    height: "36px",
                    textTransform: "none",
                    background: "#366EFF",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#fff"}}
                    type={'submit'} variant={'contained'}>
                    Sign up
                </Button>
                <h5 className={style.already}>Already have an account?</h5>
                <a className={style.sing}>Sing in</a>
            </form>
        </div>
    );
}