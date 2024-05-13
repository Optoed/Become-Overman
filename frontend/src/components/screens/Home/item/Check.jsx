import React from 'react';

import { BsCheck } from 'react-icons/bs';

const Check = ({ isCompleted }) => {
	return (
		<div
			className={`border-2 rounded-lg border-pink-600 hover:border-pink-500 ${
				isCompleted ? 'bg-pink-600 hover:bg-pink-500' : ''
			} w-6 h-6 mr-3 flex items-center justify-center transition-colors ease-in-out duration-300`}>
			{isCompleted && <BsCheck size={24} className='text-gray-900' />}
		</div>
	);
};

export default Check;
