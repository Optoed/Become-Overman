import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	// Handle registration logic
	const handleRegister = async () => {
		try {
			const response = await axios.post('http://localhost:8000/user/', {
				username,
				password,
			})
			console.log(response.data) // Log the response for debugging
			// Assuming your backend returns a success message upon successful registration
			if (response.data) {
				alert('Your account is created successfully!')
				navigate('/login') // Redirect to login page after successful registration
			} else {
				// Display an alert if registration is unsuccessful
				alert('Registration failed. This username is already used. Please, try again with another username')
			}
		} catch (error) {
			console.error('Registration error:', error)
			alert('An error occurred during registration. There is a problem with connection. Please try again.')
		}
	}

	return (
		<div>
			<div className='flex justify-center flex-col text-center w-1/3 mx-auto max-w-3xl min-w-72'>
				<div className='mb-4'>
					<p>USERNAME</p>
					<div className='mb-4 rounded-2xl border-pink-600 hover:border-pink-500 border-2 px-5 py-3 w-full max-w-full mt-3 ease-in-out duration-300'>
						<input type='text' value={username} onChange={e => setUsername(e.target.value)} className='bg-transparent w-full max-w-full border-none outline-none' placeholder='Write your username' />
					</div>
				</div>

				<div className='mb-4'>
					<p>PASSWORD</p>
					<div className='mb-4 rounded-2xl border-pink-600 hover:border-pink-500 border-2 px-5 py-3 w-full max-w-full mt-3 ease-in-out duration-300'>
						<input type='password' value={password} onChange={e => setPassword(e.target.value)} className='bg-transparent w-full max-w-full border-none outline-none' placeholder='Write your password' />
					</div>

					<div className='mt-10'>
						<button onClick={handleRegister} className='border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
