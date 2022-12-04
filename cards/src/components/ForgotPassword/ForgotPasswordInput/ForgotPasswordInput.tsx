import React, {ChangeEvent} from 'react';
import {
    Button,
    FilledInput,
    FormControl,
    InputLabel,
} from "@mui/material";
import style from './ForgotPasswordInput.module.scss'
import {useFormik} from "formik";
import {useAppDispatch} from "../../../app/redax/store";
import {PATH} from "../../../features/Header/Pages";
import {recoveryPasswordTC} from "../../../app/redax/auth-reducer";


type FormikErrorType = {
    email?: string,
}

export const ForgotPasswordInput = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values)=> {
            const errors:FormikErrorType = {}
            if(!values.email){
                errors.email = 'requred'
            } else  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(recoveryPasswordTC(values.email))
            formik.resetForm()
        },
    });

    return (
        <div className={style.inputs}>
            <form onSubmit={formik.handleSubmit} className={style.form}>
                <FormControl className={style.formControl}>
                    {formik.errors.email && formik.touched.email
                        ? <div className={style.error}><InputLabel style={{color:'red'}}>Email</InputLabel></div>
                        :<InputLabel>Email</InputLabel>}
                    <FilledInput
                        id="filled-adornment-password"
                        type='text'
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email && <div className={style.error}><div style={{color:'red'}}>{formik.errors.email}</div></div>}
                <h5 className={style.already}>Enter your email address and we will send you further instructions</h5>
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
                    Send instructions
                </Button>
                <h5 className={style.already}>Did you remember your password?</h5>
                <a className={style.sing} href={PATH.LOGIN} >Try logging in</a>
            </form>
        </div>
    );
}