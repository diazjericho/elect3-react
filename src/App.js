import React, { useState } from 'react';
import Navigation from './components/Navigation';
import TaskScheduler from './examples/TaskScheduler/TaskScheduler';
import WeatherApplication from './examples/WeatherApplication/WeatherApplication';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('taskScheduler');

    const renderPage = () => {
        switch (currentPage) {
            case 'taskScheduler':
                return <TaskScheduler />;
            case 'weatherApplication':
                return <WeatherApplication />;
            default:
                return <TaskScheduler />;
        }
    };

    return (
        <div className="app">
            <Navigation onNavigate={setCurrentPage} />
            {renderPage()}
        </div>
    );
}

export default App;
