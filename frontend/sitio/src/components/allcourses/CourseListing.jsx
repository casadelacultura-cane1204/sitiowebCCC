"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const categories = [
  { name: "Todas las categorías", icon: AcademicCapIcon },
  { name: "Musica", icon: AcademicCapIcon },
  { name: "Arte", icon: AcademicCapIcon },
  { name: "Entretenimiento", icon: AcademicCapIcon },
  { name: "Cine", icon: AcademicCapIcon },
];

const sampleCourses = [
  {
    id: 1,
    title: "Escuela de Musica",
    instructor: "Francisco Izagurre",
    rating: 4.8,
    students: 100,
    category: "Musica",
  },
  {
    id: 2,
    title: "Escuela de Arte y Pintura",
    instructor: "Jose Resino",
    rating: 4.7,
    students: 100,
    category: "Arte",
  },
  {
    id: 3,
    title: "Grupo de lectura",
    instructor: "Jose Rodrigez  ",
    rating: 4.9,
    students: 100,
    category: "Arte",
  },
  {
    id: 4,
    title: "Escuela de poesia ",
    instructor: "Fernando Raudales",
    rating: 4.6,
    students: 100,
    category: "Arte",
  },
  {
    id: 5,
    title: "Cine Club",
    instructor: "Francisco Izagurre , Jose Rodriguez",
    rating: 4.8,
    students: 100,
    category: "Entretenimiento",
  },
  {
    id: 5,
    title: "Escuela de Danza",
    instructor: "Conrrado Chavarria",
    rating: 4.8,
    students: 100,
    category: "Cine",
  },
  
];

const CourseCard = ({ course }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {course.title}
      </h3>
      <p className="text-gray-600 mb-4">{course.instructor}</p>
      <div className="flex items-center mb-4">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <span className="ml-1 text-gray-700">{course.rating.toFixed(1)}</span>
        <span className="ml-2 text-gray-500">
          ({course.students.toLocaleString()} estudiantes)
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-indigo-600">
          ${course.price}
        </span>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
          Inscribirse
        </button>
      </div>
    </div>
  </motion.div>
);

const AdvancedCourseListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  useEffect(() => {
    const filtered = sampleCourses.filter(
      (course) =>
        (selectedCategory === "Todas las categorías" ||
          course.category === selectedCategory) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen text-white p-8">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Escuelas Casa de la Cultura
      </h1>
      <p className="text-xl mb-8 text-center text-gray-300"></p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full p-4 rounded-lg bg-white text-gray-800 pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full md:w-64 bg-white text-gray-800 p-4 rounded-lg flex items-center justify-between"
          >
            <span>{selectedCategory}</span>
            <ChevronDownIcon className="w-5 h-5" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl"
              >
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setIsOpen(false);
                    }}
                    className="w-full p-4 text-left text-gray-800 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  >
                    {React.createElement(category.icon, {
                      className: "w-5 h-5 mr-2",
                    })}
                    {category.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedCourseListing;
