import React, { useEffect, useState } from 'react';
import { FaRocket, FaBolt, FaClock, FaFire } from 'react-icons/fa';

interface BoostTask {
  id: string;
  task: string;
  icon: React.ReactNode;
  reward: number;
  completed: boolean;
  url?: string; // URL es opcional en el tipo BoostTask
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
      url: 'https://appcreator24herramientas.blogspot.com/',
    },
    {
      id: '4',
      task: 'Tarea de cohete',
      icon: <FaRocket />,
      reward: 300,
      completed: false,
      url: 'https://www.youtube.com/watch?v=PRHrVgZq6H0',
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<BoostTask | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(20);
  const [multiplicationTask, setMultiplicationTask] = useState<{ num1: number, num2: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | ''>('');

  useEffect(() => {
    let timer: number;

    if (secondsRemaining > 0 && showModal) {
      timer = window.setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && showModal) {
      setShowModal(false);
      setCurrentTask(null);
      setSecondsRemaining(20);
    }

    return () => window.clearInterval(timer);
  }, [secondsRemaining, showModal]);

  useEffect(() => {
    if (currentTask && currentTask.task === 'Tarea de tiempo') {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setMultiplicationTask({ num1, num2 });
      setUserAnswer('');
    }
  }, [currentTask]);

  const handleBoostTaskCompletion = (taskId: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
      setBoostTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    }
  };

  const handleAnswerSubmit = () => {
    if (multiplicationTask && userAnswer === multiplicationTask.num1 * multiplicationTask.num2) {
      setBoostTasks(prevTasks =>
        prevTasks.map(task =>
          task.task === 'Tarea de tiempo' ? { ...task, completed: true } : task
        )
      );
      setShowModal(false);
      setMultiplicationTask(null);
      setUserAnswer('');
    }
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
                    onClick={() => {
                      setCurrentTask(task);
                      setShowModal(true);
                    }}
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

      {/* Modal para 'Tarea de velocidad' */}
      {currentTask && currentTask.task === 'Tarea de velocidad' && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <div className="relative">
              <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/yADHAZcBqJo?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-4 right-4 text-black text-lg font-bold">
                {secondsRemaining > 0 ? `0${secondsRemaining} segundos restantes` : 'Tiempo agotado'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para 'Tarea de tiempo' */}
      {currentTask && currentTask.task === 'Tarea de tiempo' && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <div className="text-black text-lg">
              <div className="mb-4">
                Resuelve la multiplicación: {multiplicationTask?.num1} x {multiplicationTask?.num2}
              </div>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(Number(e.target.value))}
                className="border p-2 rounded w-full mb-4"
                placeholder="Tu respuesta"
              />
              <button
                onClick={handleAnswerSubmit}
                className="bg-yellow-500 text-black px-4 py-2 rounded"
              >
                Enviar respuesta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para 'Tarea de intensidad' */}
      {currentTask && currentTask.task === 'Tarea de intensidad' && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <div className="relative">
              <iframe
                className="w-full h-64"
                src={currentTask.url}
                title="Sitio web"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-4 right-4 text-black text-lg font-bold">
                {secondsRemaining > 0 ? `0${secondsRemaining} segundos restantes` : 'Tiempo agotado'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para 'Tarea de cohete' */}
      {currentTask && currentTask.task === 'Tarea de cohete' && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <div className="relative">
              <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/PRHrVgZq6H0?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-4 right-4 text-black text-lg font-bold">
                {secondsRemaining > 0 ? `0${secondsRemaining} segundos restantes` : 'Tiempo agotado'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Impulsar;
