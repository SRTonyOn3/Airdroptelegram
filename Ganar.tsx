import React, { useState } from 'react';
import { FaYoutube, FaFacebook, FaTelegram, FaTiktok } from 'react-icons/fa';

// Interfaz para definir una tarea con su id, plataforma, icono, recompensa, estado de completado, y URL
interface Task {
  id: string;
  platform: string;
  icon: React.ReactNode;
  reward: number;
  completed: boolean;
  url: string;
}

// Propiedades del componente Ganar
interface GanarProps {
  onBack: () => void;
}

const Ganar: React.FC<GanarProps> = ({ onBack }) => {
  // Estado inicial de las tareas
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      platform: 'YouTube',
      icon: <FaYoutube />,
      reward: 100,
      completed: false,
      url: 'https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ', // URL de YouTube
    },
    {
      id: '2',
      platform: 'Facebook',
      icon: <FaFacebook />,
      reward: 150,
      completed: false,
      url: 'https://www.facebook.com/react', // URL de Facebook
    },
    {
      id: '3',
      platform: 'Telegram',
      icon: <FaTelegram />,
      reward: 200,
      completed: false,
      url: 'https://t.me/reactjs', // URL de Telegram
    },
    {
      id: '4',
      platform: 'TikTok',
      icon: <FaTiktok />,
      reward: 250,
      completed: false,
      url: 'https://www.tiktok.com/@reactjs', // URL de TikTok
    },
  ]);

  // Función para manejar la finalización de la tarea y redireccionar a la URL
  const handleTaskCompletion = (taskId: string, url: string) => {
    // Abre la URL en una nueva pestaña
    window.open(url, '_blank');
    
    // Marca la tarea como completada
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="w-full max-w-md">
        {/* Botón para volver a la pantalla anterior */}
        <button onClick={onBack} className="mt-8 mb-4 text-xl">&larr; Volver</button>
        <h1 className="text-3xl font-bold mb-6">Ganar Monedas</h1>
        <div className="space-y-4">
          {/* Mapeo de tareas para renderizar cada una */}
          {tasks.map(task => (
            <div key={task.id} className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{task.icon}</span>
                <span>{task.platform}</span>
              </div>
              <div>
                {task.completed ? (
                  <span className="text-green-400">Completado</span>
                ) : (
                  <button
                    onClick={() => handleTaskCompletion(task.id, task.url)}
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

export default Ganar;
