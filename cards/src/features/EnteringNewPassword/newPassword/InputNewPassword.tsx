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
import style from './InputNewPasword.module.scss'
import {useFormik} from "formik";
import {useAppDispatch} from "../../../app/redax/store";
import {setNewPasswordTC} from "../../../app/redax/app-reducer";


type FormikErrorType = {
    password?: string,

}
type InputNewPasswordType = {
    token:string | undefined
}

export const InputNewPassword:React.FC<InputNewPasswordType> = (props) => {
    const [value, setValues] = React.useState<boolean>(false);
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values)=> {
            const errors:FormikErrorType = {}
            if(!values.password){
                errors.password = 'requred'
            } else if ( values.password.length < 6){
                errors.password = 'Invalid password'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password,props.token))
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
                    {formik.errors.password && formik.touched.password ? <div><InputLabel style={{color:'red'}} htmlFor="filled-adornment-password">Password</InputLabel></div>:<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>}
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
                <h5 className={style.already}>Create new password and we will send you further instructions to email</h5>
                <Button className={style.button}
                    type={'submit'} variant={'contained'}>
                    Sign up
                </Button>
            </form>
        </div>
    );
}