import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, AlertCircle } from 'lucide-react';
import Header from './components/Header';

const App = () => {
  const [carreras, setCarreras] = useState([]);
  const [formData, setFormData] = useState({
    carrera: '',
    descripcionCarrera: '',
    semestres: '',
    plan: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCarreras = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/carreras');
      // Ordenamos por idCarrera para mantener consistencia
      const sortedCarreras = response.data.sort((a, b) => a.idCarrera - b.idCarrera);
      setCarreras(sortedCarreras);
      setError(null);
    } catch (error) {
      setError('Error al obtener las carreras');
      console.error('Error al obtener las carreras:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarreras();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post('http://127.0.0.1:5000/carreras', formDataToSend);
      fetchCarreras();
      setFormData({ carrera: '', descripcionCarrera: '', semestres: '', plan: '' });
      setError(null);
    } catch (error) {
      setError('Error al agregar la carrera');
      console.error('Error adding carrera:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
      try {
        await axios.delete(`http://127.0.0.1:5000/carreras/${id}`);
        fetchCarreras();
        setError(null);
      } catch (error) {
        setError('Error al eliminar la carrera');
        console.error('Error deleting carrera:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1EEFC] via-[#D1EEFC] to-[#F3FAFD]">
      <Header />
      

      {error && (
        <div className="max-w-lg mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Formulario para agregar una nueva carrera */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#dfe1e681] p-6 rounded-lg mt-10 shadow-xl mb-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-[#1B3C4C] mb-4">Agregar Carrera</h2>
        <div className="mb-4">
          <label className="block text-[#1E2024] text-md font-normal mb-2">Carrera:</label>
          <input
            type="text"
            value={formData.carrera}
            onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Descripción:</label>
          <textarea
            value={formData.descripcionCarrera}
            onChange={(e) =>
              setFormData({ ...formData, descripcionCarrera: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Semestres:</label>
          <input
            type="number"
            value={formData.semestres}
            onChange={(e) => setFormData({ ...formData, semestres: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Plan:</label>
          <input
            type="number"
            value={formData.plan}
            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-[#49A4CA] text-white py-2 px-4 rounded-lg hover:bg-[#0C789C] transition-colors duration-200"
        >
          Agregar
        </button>
      </form>

      {/* Lista de carreras */}
      <div className="bg-[#dfe1e681] p-6 rounded-lg shadow-xl mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-[#183C4B] font-semibold mb-4">Lista de Carreras</h2>
        {loading ? (
          <p className="text-[#183C4B] text-center">Cargando carreras...</p>
        ) : carreras.length === 0 ? (
          <p className="text-[#183C4B] text-center">No hay carreras registradas.</p>
        ) : (
          <div className="space-y-4">
            {carreras.map((carrera, index) => (
              <div
                key={carrera.idCarrera}
                className="p-4 bg-[#f8f9fba5] rounded-lg flex justify-between items-start hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#49A4CA] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-lg text-[#183C4B] font-bold">{carrera.carrera}</h3>
                  </div>
                  <p className="mt-2 text-gray-600">{carrera.descripcionCarrera}</p>
                  <div className="mt-2 flex gap-4">
                    <p>
                      <span className="font-medium text-gray-700">Semestres:</span>{' '}
                      <span className="text-gray-600">{carrera.semestres}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Plan:</span>{' '}
                      <span className="text-gray-600">{carrera.plan}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(carrera.idCarrera)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
                  title="Eliminar carrera"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;