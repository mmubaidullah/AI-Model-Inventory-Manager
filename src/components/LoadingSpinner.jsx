import React from 'react';
import { Oval  } from 'react-loader-spinner';

const LoadingSpinner = ({ fullScreen = false }) => {
    

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: fullScreen ? '100vh' : '70vh', 
        width: '100%',
    };

    return (
        <div style={spinnerContainerStyle}>
            <Oval
            height={80}
            width={80}
            color="#6A00FF"
            secondaryColor="#9D4EDD"
            strokeWidth={4}
            strokeWidthSecondary={4}
            />
        </div>
    );
};

export default LoadingSpinner;