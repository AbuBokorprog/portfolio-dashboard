import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/Slice/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import PForm from '../../component/form/PForm';
import PInput from '../../component/form/PInput';
import { useUserLoginMutation } from '../../redux/features/services/AuthApi';

const Login = () => {
  const token = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  });

  const [userLogin] = useUserLoginMutation();

  const onSubmit = async (data) => {
    try {
      const result = await userLogin(data).unwrap();

      if (result?.access_token) {
        dispatch(login({ token: result?.access_token }));
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <PForm onSubmit={onSubmit} resolver={zodResolver(schema)}>
          <div className="space-y-6">
            <PInput
              type="email"
              placeholder="Enter your email"
              label="Email Address"
              name="email"
              required={true}
            />
            <PInput
              type="password"
              placeholder="Enter your password"
              label="Password"
              name="password"
              required={true}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </div>
        </PForm>
        {/* <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
