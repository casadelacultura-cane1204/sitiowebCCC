"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircleIcon, BookOpenIcon, ClockIcon, ChevronRightIcon, XMarkIcon, AcademicCapIcon, BoltIcon, MusicalNoteIcon, FireIcon } from '@heroicons/react/24/solid'

const courses = [
  {
    id: 1,
    title: "Fundamentos de Guitarra Acústica",
    icon: <AcademicCapIcon className="w-8 h-8 text-yellow-400" />,
    duration: "4 horas de contenido, 10 horas de práctica",
    level: "Principiante",
  },
  {
    id: 2,
    title: "Técnicas Avanzadas de Fingerpicking",
    icon: <BoltIcon className="w-8 h-8 text-blue-400" />,
    duration: "5 horas de contenido, 15 horas de práctica",
    level: "Intermedio",
  },
  {
    id: 3,
    title: "Teoría Musical para Guitarristas",
    icon: <MusicalNoteIcon className="w-8 h-8 text-green-400" />,
    duration: "6 horas de contenido, 12 horas de práctica",
    level: "Todos los niveles",
  },
  {
    id: 4,
    title: "Improvisación y Solos de Guitarra",
    icon: <FireIcon className="w-8 h-8 text-red-400" />,
    duration: "7 horas de contenido, 20 horas de práctica",
    level: "Avanzado",
  },
]

const instructors = [
  { id: 1, name: "Francisco Izaguirre", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Jose Rodrigez", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Oscar aleman", avatar: "/placeholder.svg?height=50&width=50" },
]

export default function GuitarCoursePlatform() {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Domina la Guitarra
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Desde los acordes básicos hasta solos épicos, nuestros cursos te llevarán a nuevas alturas musicales.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:shadow-lg"
              >
                EMPIEZA TU VIAJE MUSICAL
              </motion.button>
            </motion.div>

            <div className="mb-8">
              <div className="flex space-x-4 mb-4">
                {['courses', 'about'].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`py-2 px-4 rounded-full ${
                      activeTab === tab ? 'bg-indigo-600' : 'bg-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab === 'courses' ? 'CURSOS DE GUITARRA' : 'ACERCA DE'}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'courses' && (
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold mb-4 text-purple-300">Explora Nuestros Cursos</h2>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <motion.div
                          key={course.id}
                          className="bg-gray-800 bg-opacity-50 p-4 rounded-lg cursor-pointer hover:bg-opacity-70 transition duration-300 ease-in-out backdrop-filter backdrop-blur-lg"
                          onClick={() => setSelectedCourse(course)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <div className="mr-4">{course.icon}</div>
                            <div>
                              <h3 className="font-semibold text-lg">{course.title}</h3>
                              <p className="text-sm text-gray-400">{course.duration}</p>
                              <span className="inline-block bg-indigo-600 text-xs px-2 py-1 rounded-full mt-2">
                                {course.level}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-filter backdrop-blur-lg"
                  >
                    <h2 className="text-3xl font-bold mb-4 text-purple-300">Sobre Nuestra Plataforma</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Nuestra plataforma de aprendizaje de guitarra está diseñada para músicos de todos los niveles. 
                      Con instructores de clase mundial y un plan de estudios cuidadosamente estructurado, te ayudaremos 
                      a desarrollar tu técnica, entender la teoría musical y expresar tu creatividad a través de la guitarra. 
                      Ya sea que estés comenzando tu viaje musical o buscando perfeccionar tus habilidades, tenemos el 
                      curso perfecto para ti.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Guitar+Mastery"
                  alt="Course Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <PlayCircleIcon className="w-16 h-16 text-white opacity-75 hover:opacity-100 cursor-pointer transition duration-300 ease-in-out" />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">Curso de Guitarra Avanzada</h2>
                <p className="text-gray-400 mb-4">Lleva tu técnica al siguiente nivel</p>
                <div className="flex items-center text-gray-400 mb-2">
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  <span>12 lecciones</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>24 horas de contenido</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-purple-300">NUESTROS INSTRUCTORES</h3>
                <button className="text-indigo-400 hover:text-indigo-300 flex items-center transition duration-300">
                  Ver más <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {instructors.map((instructor) => (
                  <motion.div 
                    key={instructor.id} 
                    className="flex items-center bg-gray-800 bg-opacity-50 p-3 rounded-lg backdrop-filter backdrop-blur-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500"
                    />
                    <span className="font-medium">{instructor.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-filter backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                <button onClick={() => setSelectedCourse(null)}>
                  <XMarkIcon className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
                </button>
              </div>
              <p className="text-gray-300 mb-2">{selectedCourse.duration}</p>
              <p className="text-indigo-400 mb-4">Nivel: {selectedCourse.level}</p>
              <p className="text-gray-400 mb-6">
                Este curso te llevará a través de las técnicas esenciales y avanzadas de la guitarra, 
                ayudándote a desarrollar tu propio estilo y sonido único.
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => setSelectedCourse(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cerrar
                </motion.button>
                <motion.button 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inscribirse
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}