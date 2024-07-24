import React, { useState } from 'react';
import { FaRocket, FaBolt, FaClock, FaFire } from 'react-icons/fa';

interface BoostTask {
  id: string;
  task: string;
  icon: React.ReactNode;
  reward: number;
  completed: boolean;
  url: string;
}

interface ImpulsarProps {
  onBack: () => void;
}

const Impulsar: React.FC<ImpulsarProps> = ({ onBack }) => {
  const [boostTasks, setBoostTasks] = useState<BoostTask[]>([
    {
      id: '1',
      task: 'Tarea de velocidad',
      icon: <FaBolt />,
      reward: 150,
      completed: false,
      url: 'https://www.example.com/speed-task',
    },
    {
      id: '2',
      task: 'Tarea de tiempo',
      icon: <FaClock />,
      reward: 200,
      completed: false,
      url: 'https://www.example.com/time-task',
    },
    {
      id: '3',
      task: 'Tarea de intensidad',
      icon: <FaFire />,
      reward: 250,
      completed: false,
      url: 'https://www.example.com/intensity-task',
    },
    {
      id: '4',
      task: 'Tarea de cohete',
      icon: <FaRocket />,
      reward: 300,
      completed: false,
      url: 'https://www.example.com/rocket-task',
    },
  ]);

  const handleBoostTaskCompletion = (taskId: string, url: string) => {
    window.open(url, '_blank');

    setBoostTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="mt-8 mb-4 text-xl">&larr; Volver</button>
        <h1 className="text-3xl font-bold mb-6">Impulsar Tareas</h1>
        <div className="space-y-4">
          {boostTasks.map(task => (
            <div key={task.id} className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{task.icon}</span>
                <span>{task.task}</span>
              </div>
              <div>
                {task.completed ? (
                  <span className="text-green-400">Completado</span>
                ) : (
                  <button
                    onClick={() => handleBoostTaskCompletion(task.id, task.url)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Ganar {task.reward}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impulsar;
