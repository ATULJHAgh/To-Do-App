import React from 'react';
import tick from '../assets/tick.png';
import nottick from '../assets/not_tick.png';
import deleteicon from '../assets/delete.png';

import tickSound from '../assets/ticksound.mp3';
import untickSound from '../assets/unticksound.mp3';

const Items = ({ text, id, isComplete, deleteTodo, toggle }) => {
    // Create audio instances
    const tickAudio = new Audio(tickSound);
    const untickAudio = new Audio(untickSound);

    const handleToggle = () => {
        if (isComplete) {
            // play un-tick sound when unchecking
            untickAudio.play();
        } else {
            // play tick sound when checking
            tickAudio.play();
        }

        toggle(id);
    };

    return (
        <div className='flex items-center justify-between bg-[#2A2A40] hover:bg-[#333355] transition p-3 rounded-lg group'>
            {/* Left: tick + task */}
            <div onClick={handleToggle} className='flex items-center gap-3 cursor-pointer flex-1'>
                <img
                    className='w-5 h-5'
                    src={isComplete ? tick : nottick}
                    alt="tick-icon"
                />
                <p
                    className={`text-sm md:text-base transition-all duration-200 ${
                        isComplete
                            ? 'line-through text-gray-500 italic'
                            : 'text-yellow-200 font-medium'
                    }`}
                >
                    {text}
                </p>
            </div>

            {/* Delete icon */}
            <img
                onClick={() => deleteTodo(id)}
                className='w-4 h-4 opacity-70 hover:opacity-100 transition cursor-pointer'
                src={deleteicon}
                alt="delete-icon"
            />
        </div>
    );
};

export default Items;
