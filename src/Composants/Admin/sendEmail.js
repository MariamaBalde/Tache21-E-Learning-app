import emailjs from 'emailjs-com';

const sendEmailToStudent = (
  studentEmail,
  studentName,
  coachFirstName,
  coachLastName,
  domain,
  duration,
  startDate,
  password
) => {
  if (!studentEmail || !studentEmail.includes('@')) {
    console.error('Adresse email étudiant invalide:', studentEmail);
    return;
  }

  const templateParams = {
    to_email: studentEmail,
    student_name: studentName,
    coach_name: `${coachFirstName} ${coachLastName}`,
    domain: domain,
    duration: duration,
    start_date: startDate,
    password: password,
  };

  console.log('Paramètres de l’email étudiant:', templateParams);

  emailjs
    .send(
      'service_s7qzbrw',
      'template_h9wnvqj',
      templateParams,
      'Os0EEtWm1EJNRQ8sj'
    )
    .then((response) => {
      console.log('Email envoyé à l’étudiant avec succès', response);
    })
    .catch((err) => {
      console.error('Échec de l’envoi de l’email à l’étudiant', err);
    });
};

const sendEmailToCoach = (
  coachEmail,
  studentName,
  domain,
  duration,
  startDate
) => {
  if (!coachEmail || !coachEmail.includes('@')) {
    console.error('Adresse email coach invalide:', coachEmail);
    return;
  }

  const templateParams = {
    to_email: coachEmail,
    student_name: studentName,
    domain: domain,
    duration: duration,
    start_date: startDate,
  };

  console.log('Paramètres de l’email coach:', templateParams);

  emailjs
    .send(
      'service_s7qzbrw',
      'template_5ymhe1c',
      templateParams,
      'Os0EEtWm1EJNRQ8sj'
    )
    .then((response) => {
      console.log('Email envoyé au coach avec succès', response);
    })
    .catch((err) => {
      console.error('Échec de l’envoi de l’email au coach', err);
    });
};

export { sendEmailToStudent, sendEmailToCoach };
