'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Music, Star, Sun, Moon, Guitar, Piano, Mic2, Mic2Icon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const courses = [
  {
    id: 1,
    title: "Guitarra para principiantes",
    description: "Aprende los fundamentos de la guitarra, desde la postura correcta hasta tus primeros acordes y melodías.",
    category: "Guitarra",
    coursesCount: 12,
    hoursCount: 40,
    icon: <Guitar className="w-8 h-8" />,
    difficulty: "Principiante",
    color: "#e74c3c",
  },
  {
    id: 2,
    title: "Violín clásico",
    description: "Domina el arte del violín con técnicas clásicas, lectura de partituras y práctica de piezas famosas.",
    category: "Violín",
    coursesCount: 15,
    hoursCount: 45,
    icon: <Mic2 className="w-8 h-8" />,
    difficulty: "Intermedio",
    color: "#3498db",
  },
  {
    id: 3,
    title: "Chelo: del básico al intermedio",
    description: "Explora las ricas sonoridades del chelo, aprendiendo técnicas de arco y digitación para interpretaciones expresivas.",
    category: "Chelo",
    coursesCount: 10,
    hoursCount: 35,
    icon: <Mic2 className="w-8 h-8" />,
    difficulty: "Principiante-Intermedio",
    color: "#e67e22",
  },
  {
    id: 4,
    title: "Piano: teoría y práctica",
    description: "Desarrolla tu habilidad en el piano, desde escalas básicas hasta la interpretación de piezas complejas.",
    category: "Piano",
    coursesCount: 18,
    hoursCount: 50,
    icon: <Piano className="w-8 h-8" />,
    difficulty: "Todos los niveles",
    color: "#9b59b6",
  },
  {
    id: 5,
    title: "Marimba: ritmos y melodías",
    description: "Descubre la versatilidad de la marimba, aprendiendo técnicas de percusión y creación de melodías vibrantes.",
    category: "Marimba",
    coursesCount: 8,
    hoursCount: 30,
    icon: <Music className="w-8 h-8" />,
    difficulty: "Intermedio",
    color: "#2ecc71",
  },
]

const categories = [
  { name: "Todos", icon: <Music className="w-6 h-6" /> },
  { name: "Guitarra", icon: <Guitar className="w-6 h-6" /> },
  { name: "Violín", icon: <Mic2 className="w-6 h-6" /> },
  { name: "Chelo", icon: <Mic2 className="w-6 h-6" /> },
  { name: "Piano", icon: <Piano className="w-6 h-6" /> },
  { name: "Marimba", icon: <Music className="w-6 h-6" /> },
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredCourses = selectedCategory === "Todos"
    ? courses
    : courses.filter(course => course.category === selectedCategory)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
          </defs>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-12">
            <h1 className={`text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Escuela de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Música</span>
            </h1>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={isDarkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          <p className={`text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl leading-relaxed`}>
            Descubre el maravilloso mundo de la música a través de nuestras clases especializadas en diversos instrumentos.
            Desde principiantes hasta niveles avanzados, tenemos el curso perfecto para ti.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            {categories.map(category => (
              <Button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className={`
                  ${isDarkMode ? 'text-white border-white' : 'text-gray-900 border-gray-900'}
                  hover:bg-opacity-20 transition-all duration-300
                  ${selectedCategory === category.name ? (isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white') : 'bg-transparent'}
                  rounded-full px-6 py-2 text-lg font-semibold flex items-center gap-2
                `}
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredCourses.map(course => (
                <motion.div
                  key={course.id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  layout
                >
                  <Card className={`overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                    <CardHeader className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <CardTitle className="flex items-center gap-3 text-2xl font-bold" style={{ color: course.color }}>
                        {course.icon}
                        {course.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-300">{course.title}</h3>
                      <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{course.description}</p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          {course.coursesCount} lecciones
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          {course.hoursCount} horas
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: course.color }}>
                        <Star className="w-5 h-5" fill={course.color} />
                        <span>{course.difficulty}</span>
                      </div>
                    </CardContent>
                    <CardFooter className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Button 
                        className="w-full transition-all duration-300 transform group-hover:scale-105 text-lg font-semibold py-6 rounded-full"
                        style={{ 
                          background: `linear-gradient(45deg, ${course.color}, ${course.color}aa)`,
                          color: isDarkMode ? '#ffffff' : '#000000'
                        }}
                      >
                        EXPLORAR CURSO
                        <Music className="ml-2 w-5 h-5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}