import * as React from 'react';
import './App.css';
import {Container, Box, TextField, InputAdornment} from "@mui/material";

function App() {

    const [values, setValues] = React.useState({
        birthDay: '',
        age: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    // 만 나이 계산
    const handleChange = (birthDay) => {
        const today = new Date();
        let age = today.getFullYear() - Number(birthDay.slice(0, 4));
        let mon = today.getMonth() - Number(birthDay.slice(4, 6));

        if (mon < 0 || (mon === 0 && today.getDate() < Number(birthDay.slice(6, 8)))) {
            return age = age - 1;
        } else {
            return age;
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>도산대지급금 계산기</h1>
                <h5>재판상 도산이나 사실상 도산을 신청한 날을 기준으로 1년전부터 3년 이내에 당해 사업장에서 퇴직한 근로자는 대지급금을 신청하실 수 있습니다.<br/>
                    (※ 도산기업의 사업주는 6월이상 사업을 영위하였어야 함)</h5>
                <Container maxWidth="sm">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="birth-day" label="생년월일" variant="outlined"
                                   helperText="ex) 19801011"
                                   onChange={handleChange('weight')}
                        />
                        <TextField id="age" label="나이"
                                   variant="outlined"
                        />
                        <TextField id="work-period" label="근무기간" variant="outlined"/>
                        <TextField id="overdue-payment-period" label="체불기간" variant="outlined"/>
                        <TextField id="monthly-pay" label="월급여" variant="outlined"/>
                        <TextField id="severance-pay" label="퇴직금" variant="outlined"/>
                        <TextField id="expectation-pay" label="예상대지급금" variant="outlined"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                                   helperText="※ 예상대지급금은 실제 금액과 다를 수 있습니다."
                        />

                    </Box>
                </Container>
            </header>


        </div>
    );
}

export default App;
