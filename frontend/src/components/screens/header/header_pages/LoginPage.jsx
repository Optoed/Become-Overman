import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [userId, setUserId] = useState(null) // State to store user ID
	const navigate = useNavigate() // Changed from history to navigate

	// Handle sign in logic
	const handleSignIn = async () => {
		try {
			const response = await axios.post('http://localhost:8000/user/loginuser/', {
				username,
				password,
			})
			console.log(response.data) // Log the response for debugging
			// Assuming your backend returns a success message upon successful login
			if (response.data) {
				console.log(response.data)
				setUserId(response.data.logined_user_id)
				console.log(response.data.logined_user_id)

				// Сохраняем id_user в локальное хранилище
				localStorage.setItem('userId', response.data.logined_user_id)

				alert('You login successfully!')
				console.log('UserID: ' + userId)
				navigate('/') // Redirect to home page after successful login
			} else {
				// Display an alert if login is unsuccessful
				alert('Incorrect username or password')
			}
		} catch (error) {
			console.error('Login error:', error)
			alert('An error occurred during login. Please try again.')
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
						<button onClick={handleSignIn} className='border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
