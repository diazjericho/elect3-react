import React from 'react';

function Navigation({ onNavigate }) {
    return (
        <div className="navigation">
            <button onClick={() => onNavigate('taskScheduler')}>Task Scheduler</button>
            <button onClick={() => onNavigate('weatherApplication')}>Weather Application</button>
        </div>
    );
}

export default Navigation;
