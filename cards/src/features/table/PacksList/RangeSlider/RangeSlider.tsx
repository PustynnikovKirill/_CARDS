import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDebounce} from "../../../../components/Debounce/Debounce";
import {useEffect} from "react";
import {packRangeAC} from "../../../../app/redax/packs-reducer";
import {useAppDispatch} from "../../../../app/redax/store";


function valuetext(value: number) {
    return `${value}°C`;
}

export const RangeSlider = () => {
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([0, 100]);
    const debouncedValue = useDebounce<number[]>(value, 2000)

    useEffect(() => {
        dispatch(packRangeAC(debouncedValue))
    }, [debouncedValue])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Box sx={{width:300}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}