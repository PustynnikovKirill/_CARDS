import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../../../../components/Debounce/Debounce";


type SearchInputMyPackType = {
    setSearchValue:(valueSearch:string)=>void
}

export const SearchInputMyPack: React.FC<SearchInputMyPackType> = ({setSearchValue}) => {


    let[valueSearch,setValue] = useState('')
    const debouncedValue = useDebounce<string>(valueSearch, 2000)

    useEffect(()=>{
        setSearchValue(debouncedValue)
    },[debouncedValue])


    const setValueHandler =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setValue(e.currentTarget.value)
    }

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (

                    <TextField
                        value={valueSearch}
                        onChange={setValueHandler}
                        {...params}
                        size={'small'}
                        label="Provide your text"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            size: 'small',
                        }}
                    />
                )}
            />
        </Stack>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {title: '', year: null},

];