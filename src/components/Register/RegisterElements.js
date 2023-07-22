import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const RegisterBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: linear-gradient(195deg, #A20066, #F9C3D4);
`;

export const RegisterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const RegisterFormContentLeft = styled.div`
  background: linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%);
  border-radius: 10px 0 0 10px;
  position: relative;
`;

export const RegisterImage = styled.img`
  width: 85%;
  height: 85%;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RegisterFormContentRight = styled.div`
  border-radius: 0 10px 10px 0;
  position: relative;
  background: #fff;
`;

export const RegisterForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RegisterLogo = styled.img`
  width: 150px;
  height: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const RegisterHr = styled.hr`
  border: 0;
  width: 80%;               
  background-color:rgba(0, 0, 0, 0.1);
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const RegisterH1 = styled.h1`
  font-size: 1rem;
  text-align: start;
  width: 80%;
  margin-bottom: 1rem;
  color: #A20066;
`;

export const RegisterFormInputs = styled.div`
  margin-bottom: 0.5rem;
  width: 80%;
`;

export const RegisterLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: #A20066;
  font-weight: 600;
`;

export const RegisterError = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: #f00e0e;
`;

export const RegisterFormButton = styled.button`
  width: 80%;
  height: 50px;
  margin-top: 20px;
  border-radius: 2px;
  background: linear-gradient(195deg, #A20066, #F9C3D4);
  outline: none;
  border: none;
  color: #fff;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: linear-gradient(90deg, rgb(160, 160, 160) 0%, rgb(17, 17, 17) 100%);
    transition: all 0.4s ease-out;
    }
`;

export const RegisterFormLogin = styled.span`
  font-size: 0.8rem;
  margin-top: 10px;
  color: linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%);
  width: 80%;
  text-align: center;
`;

export const LoginLink = styled(LinkRouter)`
  text-decoration: none;
  color: #27cdff;
  font-weight: 600;
`;