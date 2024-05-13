import React from 'react';

import Home from './components/screens/Home/Home';
import LoginPage from './components/screens/header/header_pages/LoginPage';
import RegisterPage from './components/screens/header/header_pages/RegisterPage';
import Header from 'components/screens/header/Header';

import { Router, Route, Routes, Outlet } from 'react-router-dom';

function App() {
	return (
		<div className='App  text-white w-4/5 mx-auto max-w-full'>
			<Header />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
