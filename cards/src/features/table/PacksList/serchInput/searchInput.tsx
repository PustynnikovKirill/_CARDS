import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../../../../components/Debounce/Debounce";

type SearchInputType = {
    setSearchInput: (value: string) => void
}

export const SearchInput: React.FC<SearchInputType> = ({setSearchInput, ...props}) => {

    let [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 2000)

    const searchInputHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value)
    }

    useEffect(() => {
        setSearchInput(debouncedValue)
    }, [debouncedValue])

    return (
        <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (

                    <TextField
                        value={value}
                        onChange={searchInputHandler}
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
    {title: '', year: 0},
];