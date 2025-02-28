import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/actions/authAction";
import { Formik, Form, Field } from 'formik';
import { LoginSchema, RegisterSchema } from "../validation/userSchema";
import { clearError, clearMessage } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Loader } from "../utils/Loader";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({ name, placeholder, errors, touched }) => {
  const [showPassword, setShowPassword] = useState(false);

  
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
    <Field
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      className="appearance-none rounded-lg relative block w-full px-3 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
    />
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // Prevent button from taking focus
      onClick={togglePasswordVisibility}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
      tabIndex={-1} // Remove from tab order
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
    {errors[name] && touched[name] && (
      <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
    )}
  </div>
  );
};

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const { loading, error, user, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isLogin) {
        await dispatch(loginUser(values)).unwrap();
      } else {
        await dispatch(registerUser(values)).unwrap();
      }
      resetForm();
    } catch (err) {
      // Error is handled by Redux
    } finally {
      setSubmitting(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
  };

  useEffect(() => {
    if (error && !loading) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message && !loading) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, loading]);

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard/users');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div><Loader /></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={toggleForm}
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Formik
          initialValues={
            isLogin
              ? { identifier: '', password: '' }
              : {
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                }
          }
          validationSchema={isLogin ? LoginSchema : RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {!isLogin && (
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div>
                  <Field
                    name="phone"
                    type="text"
                    placeholder="Phone number"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div>
                  <Field
                    name="identifier"
                    type="text"
                    placeholder="Email or Phone"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  {errors.identifier && touched.identifier && (
                    <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
                  )}
                </div>
              )}

              <PasswordField
                name="password"
                placeholder="Password"
                errors={errors}
                touched={touched}
              />

              {!isLogin && (
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  errors={errors}
                  touched={touched}
                />
              )}

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthPages;