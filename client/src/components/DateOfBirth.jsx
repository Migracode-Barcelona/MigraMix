import * as React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from "prop-types";


const minDateAllowed = dayjs().subtract(120, 'year');
const maxDateAllowed = dayjs().subtract(18, 'year');


const DateOfBirth = ({onChange}) => {
    const [dateSelected, setDateSelected] = React.useState(null)
    const [error, setError] = React.useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

    const handlerDateClick = (date) => {
        setDateSelected(date);
        onChange(date.format('YYYY-MM-DD'))
    }
    
    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate':
            case 'minDate': {
                return 'You must be at least 18 years old to register.';
            }
            case 'invalidDate': {
                return 'Your date is not valid';
            }
            default: {
                return '';
            }
        }
    }, [error]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box 
                width={300}
            >
                <DatePicker
                    value={dateSelected} 
                    onChange={handlerDateClick}
                    onOpen={() => toggleCalendar()}
                    onClose={() => toggleCalendar()}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                        textField: {
                        helperText: errorMessage,
                        },
                    }}
                    minDate={minDateAllowed}
                    maxDate={maxDateAllowed}
                    disableOpenPicker={false}//tuve que deshabilitar por que no me funciona el picker
                    InputProps={{ style: { fontSize: '16px' } }} 
                    InputLabelProps={{ style: { fontSize: '16px' } }}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderWidth: '0.8px', 
                            borderColor: '#2B2D42'
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}

DateOfBirth.propTypes = {
    onChange: PropTypes.func.isRequired
}
export default DateOfBirth
