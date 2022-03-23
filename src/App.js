import * as React from 'react';
import './App.css';
import {Container, Box, TextField, InputAdornment, Button, Typography} from "@mui/material";

function App() {

  const [values, setValues] = React.useState({
    birthDay: '',
    workPeriod: '',
    overduePaymentPeriod: '',
    monthlyPay: '',
    severancePay: '',
    expectationPay: '',
  });
  //
  // const [birthDay, setBirthDay] = useState('');
  const [age, setAge] = React.useState(0);
  // const [workPeriod, setWorkPeriod] = useState('');
  // const [overduePaymentPeriod, setOverduePaymentPeriod] = useState('');
  // const [monthlyPay, setMonthlyPay] = useState('');
  // const [severancePay, setSeverancePay] = useState('');
  // const [expectationPay, setExpectationPay] = useState('');

  // 만 나이 계산
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value
    });

    console.log(prop);
    switch (prop) {
      case 'birthDay':
        if (event.target.value.length === 8) {
          let birthDay = event.target.value;
          const today = new Date();
          let age = today.getFullYear() - Number(birthDay.slice(0, 4));
          let mon = today.getMonth() - Number(birthDay.slice(4, 6));
          if (mon < 0 || (mon === 0 && today.getDate() < Number(birthDay.slice(6, 8)))) {
            setAge(age - 1);
          } else {
            setAge(age);
          }
        } else {
          setAge(0);
        }
        console.log(values.birthDay);
        break;
      case 'monthlyPay':
      case 'severancePay':
        let payValue = Number(event.target.value.replace(/,/g, ''));
        setValues({
          ...values,
          [prop]: payValue.toLocaleString('ko-KR')
        });
        break;
      default:
        console.log('default');
        break;
    }

  }

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 'sm',
          '& > :not(style)': {m: 1, width: '100%'},
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{
          typography: 'h4',
        }}>
          도산대지급금 계산기
        </Box>
        <Typography variant="body">
          재판상 도산이나 사실상 도산을 신청한 날을 기준으로 1년전부터 3년 이내에 당해 사업장에서 퇴직한 근로자는 대지급금을 신청하실 수 있습니다.<br/>
          (※ 도산기업의 사업주는 6월이상 사업을 영위하였어야 함)
        </Typography>

        <TextField id="birthDay" name="birthDay" label="생년월일" variant="outlined"
                   helperText="ex) 19801011"
                   value={values.birthDay}
                   onChange={handleChange('birthDay')}
        />
        <TextField id="age" label="나이"
                   variant="outlined"
                   color="success"
                   InputProps={{
                     readOnly: true,
                     endAdornment: <InputAdornment position="end">세</InputAdornment>,
                   }}
                   value={age}
        />
        <TextField id="workPeriod" label="근무기간" variant="outlined" value={values.workPeriod}
                   type="number"
                   onChange={handleChange('workPeriod')}/>
        <TextField id="overduePaymentPeriod" label="체불기간"
                   type="number"
                   variant="outlined"
                   value={values.overduePaymentPeriod}
                   onChange={handleChange('overduePaymentPeriod')}
                   InputProps={{
                     endAdornment: <InputAdornment position="end">개월</InputAdornment>,
                   }}
        />
        <TextField id="monthlyPay" label="월급여" variant="outlined"
                   value={values.monthlyPay}
                   onChange={handleChange('monthlyPay')}
        />
        <TextField id="severancePay" label="퇴직금" variant="outlined"
                   value={values.severancePay}
                   onChange={handleChange('severancePay')}/>
        <TextField id="expectationPay" label="예상대지급금" variant="outlined"
                   value={values.expectationPay}
                   InputProps={{
                     disabled: true,
                   }}
                   helperText="※ 예상대지급금은 실제 금액과 다를 수 있습니다."
                   onChange={handleChange('expectationPay')}
        />

        <Button variant="contained" color="success">계산하기</Button>
        <Button variant="outlined" color="warning">다시계산</Button>
      </Box>
    </Container>
  );
}

export default App;
