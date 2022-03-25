import * as React from 'react';
import './App.css';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  ButtonGroup,
  DialogTitle,
  Dialog, DialogContent, DialogActions, DialogContentText
} from "@mui/material";

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

  const calculate = () => {
    // 도산 대 지급금 계산 방법

    // 빈값 체크
    let opPeriod = 0;
    let amountLimit = 0;

    // 체불 기간 체크 (체납 개월) (MAX 3)
    if (values.overduePaymentPeriod >= 3) {
      opPeriod = 3;
    } else {
      opPeriod = values.overduePaymentPeriod;
    }

    let opPeriodYear = 0;
    // 퇴직금 기간 체크 (퇴직금 가능은 3년치) (MAX 3)
    if ((values.workPeriod / 12) >= 3) {
      opPeriodYear = 3;
    } else if ((values.workPeriod / 12) < 1) {
      opPeriodYear = 0; // 퇴직금 없음
    } else {
      opPeriodYear = Math.round((values.workPeriod / 12) * 10000) / 10000;
      console.log('재직 기간 : ' + opPeriodYear);
    }

    // 연령에 따른 도산대지급금 상한액 계산
    //도산대지급금 상한액 계산
    if (age >= 60) {
      amountLimit = 2300000;
    } else if (age >= 50) {
      amountLimit = 3300000;
    } else if (age >= 40) {
      amountLimit = 3500000;
    } else if (age >= 30) {
      amountLimit = 3100000;
    } else {
      amountLimit = 2200000;
    }

    // 체불 임금
    let overduePay1 = 0;
    // 체불 퇴직금
    let overduePay2 = 0;
    // 체당 임금 계산
    if (values.monthlyPay > amountLimit) {
      overduePay1 = amountLimit * opPeriod;
    } else {
      overduePay1 = values.monthlyPay * opPeriod;
    }

    // 체당 퇴직금 계산
    if (((values.severancePay / values.workPeriod) * 12) > amountLimit) {
      overduePay2 = amountLimit * opPeriodYear;
    } else {
      // overduePay2 = parseInt(((parseInt(retirepay) / parseInt(values.workPeriod)) * 12) * opPeriodYear);
    }

    // 체불 임금 + 체불 퇴직금
    console.log("예상 대지급금1 : " + overduePay1);
    console.log("예상 대지급금2 : " + overduePay2);
    console.log("예상 대지급금3 : " + (overduePay1 + overduePay2));
    let expectationPay = overduePay1 + overduePay2;

    console.log("예상 대지급금 : " + expectationPay);

    // 다이얼로그 오픈
    handleClickOpen();
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
        mt={4}
        mb={6}
        noValidate
        autoComplete="off"
      >
        <Box>광고</Box>
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
        <TextField id="monthlyPay" label="월급여" variant="outlined"
                   value={values.monthlyPay}
                   onChange={handleChange('monthlyPay')}
        />

        <TextField id="severancePay" label="퇴직금" variant="outlined"
                   value={values.severancePay}
                   onChange={handleChange('severancePay')}/>

        <TextField id="overduePaymentPeriod" label="체불기간"
                   type="number"
                   variant="outlined"
                   value={values.overduePaymentPeriod}
                   onChange={handleChange('overduePaymentPeriod')}
                   InputProps={{
                     endAdornment: <InputAdornment position="end">개월</InputAdornment>,
                   }}
        />

        <TextField id="expectationPay" label="예상대지급금" variant="outlined"
                   value={values.expectationPay}
                   InputProps={{
                     disabled: true,
                   }}
                   helperText="※ 예상대지급금은 실제 금액과 다를 수 있습니다."
                   onChange={handleChange('expectationPay')}
        />

        <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth={true}>
          <Button variant="contained" color="success" onClick={calculate}>계산하기</Button>
          <Button variant="outlined" color="warning">다시계산</Button>
        </ButtonGroup>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"예상대지급금 확인"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            예상하는 대지급금은 #,###,###원 입니다.
            예상하는 대지급금은 #,###,###원 입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>확인</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default App;
