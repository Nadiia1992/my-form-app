import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import LoginField from './LoginField';
import PasswordField from './PasswordField';
import FullNameField from './FullNameField';
import Gender from './Gender';
import Specialization from './Specialization';
import Position from './Position';
import { specialisationOptions, positionOptions } from './options';



export default function Form() {
  
  const loginRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const fullNameRef = useRef<any>(null);
  const genderRef = useRef<any>(null);
  const specializationRef = useRef<any>(null);
  const positionRef = useRef<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const login = loginRef.current?.getValue();
    const password = passwordRef.current?.getValue();
    const fullName = fullNameRef.current?.getValue();
    const gender = genderRef.current?.getValue();
    const specialization = specializationRef.current?.getValue();
    const position = positionRef.current?.getValue();

    const valid =
      loginRef.current?.getValidity() &&
      passwordRef.current?.getValidity() &&
      fullNameRef.current?.getValidity() &&
      genderRef.current?.getValidity() &&
      specializationRef.current?.getValidity() &&
      positionRef.current?.getValidity();


    if (!valid) {
      Swal.fire({
        icon: 'error',
        title: 'Помилка',
        text: 'Будь ласка, виправте помилки у формі',
      });
      return;
    }

    const specializationLabel =
    specialisationOptions.find((item) => item.value === specialization)?.label || specialization;

  const positionLabel =
    positionOptions.find((item) => item.value === position)?.label || position;

  const genderLabel = gender === 'male' ? 'Чоловіча' : 'Жіноча';

    Swal.fire({
      title: 'Дані:',
      html: `
        <div style="text-align: left; font-size: 16px;">
        <b>Повне ім'я:</b> ${fullName}<br/>
          <b>Логін:</b> ${login}<br/>
          <b>Стать:</b> ${genderLabel}<br/>
          <b>Спеціалізація:</b> ${specializationLabel}<br/>
          <b>Посада:</b> ${positionLabel}
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#4b9ce2'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginField ref={loginRef} value="" />
      <PasswordField ref={passwordRef} value="" />
      <FullNameField ref={fullNameRef} value="" />
      <Gender ref={genderRef} value="" />
      <Specialization ref={specializationRef} value="" options={specialisationOptions} />
      <Position ref={positionRef} value="" options={positionOptions} />

      <div style={{ marginTop: 16 }}>
        <button type="submit">Надіслати</button>
      </div>
    </form>
  );
}