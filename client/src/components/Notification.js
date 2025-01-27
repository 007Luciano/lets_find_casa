import React from 'react';

function Notification({ message, type }) {
    if (!message) return null;

    const styles = {
        success: { color: 'green' },
        error: { color: 'red' },
    };

    return (
        <div style={{ ...styles[type], margin: '10px 0' }}>
            {message}
        </div>
    );
}

export default Notification;