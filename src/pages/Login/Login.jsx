import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaPinterest, FaApple } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const Login = () => {
	const {
		logInUserWithEmail,
		setUser,
		setLoggedIn,
		setLoading,
		successNotification,
		errorNotification,
	} = useContext(AuthContext);
	const navigate = useNavigate();

	// Get location
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	// Handle user login with email and password
	const handleLoginWithEmail = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		logInUserWithEmail(email, password)
			.then((data) => {
				successNotification('Logged in successfully!');
				setUser(data.user);
				setLoggedIn(true);
				setLoading(false);
				fetch('https://brainiac-toys-server.vercel.app/jwt', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({ email }),
				})
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem('access-token', data.token);
						navigate(from);
					});
			})
			.catch((err) => {
				setLoading(false);
				errorNotification(err.code);
			});
		form.reset();
	};

	const handleLoginWithGoogle = () => {
		console.log('clicked');
	};
	return (
		<div className='w-1/3 mx-auto my-20 px-10 py-5 bg-primary/60 font-bubblegum rounded'>
			<h2 className='text-4xl text-center'>Login</h2>
			<form
				className='w-fit mx-auto px-5'
				onSubmit={handleLoginWithEmail}>
				{/* Email */}
				<>
					<label
						htmlFor='email'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Enter your email.'
						className='w-96 px-3 py-1 outline-primary rounded'
						required
					/>
				</>
				{/* Password */}
				<>
					<label
						htmlFor='password'
						className='text-xl block mb-1 mt-5 tracking-wide'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						placeholder='Enter your password.'
						className='w-96 px-3 py-1 outline-primary rounded'
						required
					/>
				</>
				<p className='mt-2'>
					New to Brainiac Toys?{' '}
					<Link
						to='/sign-up'
						className='text-[#c86a0654] hover:text-slate-950'>
						Sign Up
					</Link>{' '}
					now.
				</p>
				<button
					className='btn btn-primary block mx-auto mt-7 cursor-pointer'
					type='submit'>
					Login
				</button>
				<div className='w-full'>
					<p className='text-xl text-center mt-10 mb-2'>Or</p>
					<div className='text-4xl flex justify-center gap-x-5'>
						<FcGoogle
							className='cursor-pointer'
							onClick={handleLoginWithGoogle}
						/>
						<FaFacebook className='cursor-pointer text-blue-600' />
						<FaPinterest className='cursor-pointer text-red-600' />
						<FaApple className='cursor-pointer' />
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
