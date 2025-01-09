import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, AlertCircle, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    carrera: '',
    semestre: '',
    boleta: '',
  });
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://127.0.0.1:5000';

  const initialFormState = {
    nombre: '',
    carrera: '',
    semestre: '',
    boleta: '',
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedAlumno(null);
  };

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/alumnos`);
      const sortedAlumnos = response.data.sort((a, b) => a.idAlumno - b.idAlumno);
      setAlumnos(sortedAlumnos);
      setError(null);
    } catch (error) {
      setError('Error al obtener los alumnos');
      console.error('Error al obtener los alumnos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/alumnos`, formData);
      await fetchAlumnos();
      resetForm();
    } catch (error) {
      setError('Error al agregar el alumno');
      console.error('Error adding alumno:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      try {
        await axios.delete(`${API_BASE_URL}/alumnos/${id}`);
        await fetchAlumnos();
        setError(null);
      } catch (error) {
        setError('Error al eliminar el alumno');
        console.error('Error deleting alumno:', error);
      }
    }
  };

  const handleEditClick = (alumno) => {
    setSelectedAlumno(alumno);
    setFormData({
      nombre: alumno.nombre,
      carrera: alumno.carrera,
      semestre: alumno.semestre,
      boleta: alumno.boleta,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/alumnos/${selectedAlumno.idAlumno}`, formData);
      await fetchAlumnos();
      resetForm();
    } catch (error) {
      setError('Error al actualizar el alumno');
      console.error('Error updating alumno:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r py-10 from-[#D1EEFC] via-[#D1EEFC] to-[#F3FAFD]">
        <h1 className='flex items-center justify-center text-[2.7rem] text-[#183C4B]'>Gestión Alumnos</h1>
      <Link
        to="/"
        className="rounded-md bg-[#4197BA] px-[1em] py-[.5em] ml-[10em] text-[1.5rem] font-semibold text-white shadow-sm hover:bg-[#A6CBDD]"
      >
        Menú
      </Link>

      {error && (
        <div className="max-w-lg mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Formulario para agregar un nuevo alumno */}
      <form
        onSubmit={selectedAlumno ? handleUpdate : handleSubmit}
        className="bg-[#dfe1e681] p-6 rounded-lg shadow-xl mb-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-[#1B3C4C] mb-4">{selectedAlumno ? 'Editar Alumno' : 'Agregar Alumno'}</h2>
        <div className="mb-4">
          <label className="block text-[#1E2024] text-md font-normal mb-2">Nombre:</label>
          <input
    type="text"
    name="nombre"
    value={formData.nombre}
    onChange={handleInputChange}
    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    required
  />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Carrera:</label>
          <input
            type="text"
            value={formData.carrera}
            onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Semestre:</label>
          <input
            type="number"
            value={formData.semestre}
            onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E2024] font-normal mb-2">Boleta:</label>
          <input
            type="number"
            value={formData.boleta}
            onChange={(e) => setFormData({ ...formData, boleta: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#49A4CA] text-white py-2 px-4 rounded-lg hover:bg-[#0C789C] transition-colors duration-200"
        >
          {selectedAlumno ? 'Actualizar' : 'Agregar'}
        </button>
        <button
      type="button"
      onClick={() => setSelectedAlumno(null)}
      className="ml-2 text-gray-500 hover:text-red-500"
    >
      Cancelar
    </button>
      </form>

      {/* Lista de alumnos */}
      <div className="bg-[#dfe1e681] p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl text-[#183C4B] font-semibold mb-4">Lista de Alumnos</h2>
        {loading ? (
          <p className="text-[#183C4B] text-center">Cargando alumnos...</p>
        ) : alumnos.length === 0 ? (
          <p className="text-[#183C4B] text-center">No hay alumnos registrados.</p>
        ) : (
          <div className="space-y-4">
            {alumnos.map((alumno, index) => (
  <div
    key={alumno.idAlumno}
    className="p-4 bg-[#f8f9fba5] rounded-lg flex justify-between items-start hover:bg-gray-100 transition-colors duration-200"
  >
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <span className="bg-[#49A4CA] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
          {index + 1}
        </span>
        <h3 className="text-lg text-[#183C4B] font-bold">{alumno.nombre}</h3>
      </div>
      <div className="mt-2 flex gap-4">
        <p>
          <span className="font-medium text-gray-700">Carrera:</span>{' '}
          <span className="text-gray-600">{alumno.carrera}</span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Semestre:</span>{' '}
          <span className="text-gray-600">{alumno.semestre}</span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Boleta:</span>{' '}
          <span className="text-gray-600">{alumno.boleta}</span>
        </p>
      </div>
    </div>
    <button
      onClick={() => handleEditClick(alumno)}
      className="ml-4 p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors duration-200"
      title="Editar alumno"
    >
     <Edit2 className="h-5 w-5" />
    </button>
    <button
      onClick={() => handleDelete(alumno.idAlumno)}
      className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
      title="Eliminar alumno"
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

export default Alumnos;
