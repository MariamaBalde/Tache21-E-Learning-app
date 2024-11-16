import emailjs from 'emailjs-com';

const sendEmailToStudent = (
  studentEmail,
  studentName,
  coachName,
  domain,
  duration,
  startDate,
  password
) => {
  const templateParams = {
    to_email: studentEmail,
    student_name: studentName,
    coach_name: coachName,
    domain: domain,
    duration: duration,
    start_date: startDate,
    password: password,
  };

  emailjs
    .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then((response) => {
      console.log('Email sent successfully', response);
    })
    .catch((err) => {
      console.error('Failed to send email', err);
    });
};

const sendEmailToCoach = (
  coachEmail,
  studentName,
  domain,
  duration,
  startDate
) => {
  const templateParams = {
    to_email: coachEmail,
    coach_name: coachEmail, // If you have the coach's name, pass it here
    student_name: studentName,
    domain: domain,
    duration: duration,
    start_date: startDate,
  };

  emailjs
    .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then((response) => {
      console.log('Email sent to coach successfully', response);
    })
    .catch((err) => {
      console.error('Failed to send email to coach', err);
    });
};

export { sendEmailToStudent, sendEmailToCoach };
