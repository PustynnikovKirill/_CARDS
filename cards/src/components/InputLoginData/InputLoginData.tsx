import React, {ChangeEvent} from 'react';
import {
    Button, Checkbox,
    FilledInput,
    FormControl, FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import {Link} from 'react-router-dom';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import style from './InputLoginData.module.scss'
import {useFormik} from "formik";
import {useAppDispatch} from "../../app/redax/store";
import { LoginTC} from "../../app/redax/auth-reducer";
import {PATH} from "../../features/Header/Pages";


type FormikErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const InputLoginData = () => {
    const [value, setValues] = React.useState<boolean>(false);
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
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
            return errors
        },
        onSubmit: values => {
            dispatch(LoginTC(values.email,values.password,values.rememberMe))
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
                <div className={style.checkbox}><div><FormControlLabel control={<Checkbox  {...formik.getFieldProps('rememberMe')} defaultChecked checked={formik.values.rememberMe}/>} label="Remember me" /></div></div>
                <div className={style.forgot}> <Link style = {{color: 'rgb(54, 110, 255)'}}  to={PATH.REGISTRATION}>Forgot
                    Password</Link></div>
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
                    Sign In
                </Button>
                <h5 className={style.already}>Already have an account?</h5>
                <a className={style.sing}>Sing Up</a>
            </form>
        </div>
    );
}