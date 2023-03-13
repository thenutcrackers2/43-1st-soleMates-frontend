import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import Input from './Input';
import './SignUp.scss';

const SignUp = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    pw: '',
    pwCorrect: '',
  });

  const { name, email, pw, pwCorrect } = inputValues;

  const location = useLocation();
  const CURRENT_DATA =
    location.pathname === '/login' ? LOGIN_DATA : SIGNUP_DATA;

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  console.log(inputValues.name);

  const checkEmail = email.match('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-z]{2,3}$');
  const pwCheck = pw.match(
    '^.*(?=^.{8,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$'
  );

  const conditions = {
    name: name.length === 0 || name.length >= 2,
    email: email.length === 0 || checkEmail,
    pw: pw.length === 0 || pwCheck,
    pwCorrect: pw === pwCorrect,
  };
  const navigate = useNavigate();

  const signUp = event => {
    if (name.length >= 2 && pwCheck && pwCorrect === pw && checkEmail) {
      event.preventDefault();
      fetch('http://10.58.52.150:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name,
          email,
          password: pw,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
          } else {
            alert('중복된 이메일입니다.');
          }
        });
    } else {
      alert('다시 확인해주세요');

      // navigate('/login');
    }
    navigate('/login');
  };

  const logIn = event => {
    if (pwCheck && checkEmail) {
      event.preventDefault();
      fetch('http://10.58.52.150:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          email,
          password: pw,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
          } else {
            alert('잘못된 이메일입니다.');
            event.preventDefault();
          }
        });
    } else {
      alert('다시 확인해주세요');
    }
  };

  const submit = location.pathname === '/login' ? logIn : signUp;

  return (
    <form className="sign_up">
      <strong className="title">
        {location.pathname === '/login' ? '로그인' : '회원가입'}
      </strong>
      {CURRENT_DATA.map(({ id, title, type, name, placeholder }) => {
        return (
          <div className="input_box" key={id}>
            <label className={`input_${conditions[name] ? 'title' : 'warn'}`}>
              {title}
            </label>
            <input
              name={name}
              className="input"
              type={type}
              autoComplete={name.includes('pw') ? 'off' : undefined}
              onChange={handleInput}
              value={inputValues[name]}
              placeholder={placeholder}
            />
          </div>
        );
      })}

      <button onClick={submit} type="submit" className="create_id">
        {location.pathname === '/login' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
};

export default SignUp;

const SIGNUP_DATA = [
  { id: 1, title: '이름', type: 'text', name: 'name', placeholder: '이름' },
  {
    id: 2,
    title: '이메일',
    type: 'email',
    name: 'email',
    placeholder: '이메일',
  },
  {
    id: 3,
    title: '비밀번호',
    type: 'password',
    name: 'pw',
    placeholder: '특수문자 / 문자 / 숫자 포함 형태의 8~15자리',
  },
  {
    id: 4,
    title: '비밀번호 확인',
    type: 'password',
    name: 'pwCorrect',
    placeholder: '비밀번호 확인',
  },
];

const LOGIN_DATA = [
  { id: 1, title: '이메일', type: 'email', name: 'email' },
  { id: 2, title: '비밀번호', type: 'password', name: 'pw' },
];
