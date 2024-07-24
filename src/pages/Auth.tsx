import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

interface AuthProps {
    register?: boolean;
}

interface FormValues {
    userName?: string;
    email: string;
    password: string;
}

const Auth: React.FC<AuthProps> = ({ register }) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        userName: register
            ? Yup.string()
                .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed')
                .required('User Name is required')
            : Yup.string(),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
        .min(3, 'Password must be at least 3 characters long')
        .max(15, 'Password must be at most 15 characters long')
        .matches(/^(?=.{3,15}$)[0-9a-zA-Z@]*$/, 'Password must be between 3 and 8 characters long and can include letters, numbers, and @')
        .required('Password is required')
    });

    const initialValues: FormValues = {
        userName: '',
        email: '',
        password: '',
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const { userName, email, password } = values;

        try {
            if (register) {
                const result = await registerApi({ userName, email, password });

                if (result.status === 200) {
                    toast.success(`${userName}, your account is created successfully.`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                    });
                    navigate('/login');
                } else {
                    if ('response' in result) {
                        const errors = (result.response?.data as { errors: Array<{ msg: string }> }).errors;
                        if (errors && errors.length > 0) {
                            toast.info(errors[0].msg, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }
                    }
                }
            } else {
                const result = await loginApi({ email, password });

                if (result.status === 200) {
                    toast.success('Login successful!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                    });
                    if ('data' in result) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
                        localStorage.setItem('currentId', result.data.user._id);
                    }
                    navigate("/");
                } else {
                    if ('response' in result) {
                        const err: string | any = result.response?.data;
                        toast.error(err, {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'light',
                        });
                    }
                }
            }
        } catch (error) {
            console.error("API call error:", error);
            toast.error('Something went wrong, please try again later.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className='w-75 container mb-5 mt-5 p-5'>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: '50%', verticalAlign: 'top' }}>
                                <Link to={'/'} className='p-3 fs-5' style={{ textDecoration: 'none' }}>
                                    <i className="fa-solid fa-backward text-warning fa-beat-fade"></i> Home
                                </Link>
                                <img
                                    className='w-100 mt-5'
                                    src={register ? "https://i.postimg.cc/NjJ9ddRz/remote-work.gif" : "https://i.postimg.cc/s2QkhLT9/cashier.gif"}
                                    alt=""
                                />
                            </td>
                            <td className='p-3' style={{ width: '50%', verticalAlign: 'top' }}>
                                <h1 className='text-center text-warning mt-5'>
                                    {register ? 'Sign Up' : 'Sign In'}
                                </h1>
                                <div className='mt-5'>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                {register && (
                                                    <div className="mb-3">
                                                        <Field
                                                            name='userName'
                                                            type="text"
                                                            placeholder="User Name"
                                                            className='form-control form-control-lg'
                                                        />
                                                        <ErrorMessage name="userName" component="div" className='text-danger' />
                                                    </div>
                                                )}
                                                <div className="mb-3">
                                                    <Field
                                                        name='email'
                                                        type="email"
                                                        placeholder="Email address"
                                                        className='form-control form-control-lg'
                                                    />
                                                    <ErrorMessage name="email" component="div" className='text-danger' />
                                                </div>
                                                <div className="mb-3">
                                                    <Field
                                                        name='password'
                                                        type="password"
                                                        placeholder="Password"
                                                        className='form-control form-control-lg'
                                                    />
                                                    <ErrorMessage name="password" component="div" className='text-danger' />
                                                </div>
                                                <div className='text-center mt-3'>
                                                    <button type="submit" className='btn btn-primary rounded-pill px-4 py-2' disabled={isSubmitting}>
                                                        {register ? 'Register' : 'Login'}
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <div className='mt-3 text-center'>
                                        {register ?
                                            <p>Already Have An Account? <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link></p> :
                                            <p>New User? <Link to={'/register'} style={{ textDecoration: 'none' }}>Register Here</Link></p>
                                        }
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Auth;
