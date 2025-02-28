import * as Yup from 'yup';


export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('name is Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('email is Required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('phone number isRequired'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .when('$isEditing', {
      is: false,
      then: schema => schema.required('password is Required'),
      otherwise: schema => schema.optional()
    }),
});


export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const LoginSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Email or phone is required'),
  password: Yup.string()
    .required('Password is required'),
});
