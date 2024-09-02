import React, { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BoltIcon,
  MusicalNoteIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

const courses = [
  {
    id: 1,
    title: "Fundamentos de Guitarra Acústica",
    icon: <AcademicCapIcon className="w-6 h-6 text-yellow-400" />,
    duration: "4 horas de contenido, 10 horas de práctica",
    level: "Principiante",
    lessons: [
      { id: 1, title: "Introducción a la guitarra acústica", duration: 1800 },
      { id: 2, title: "Técnicas básicas de rasgueo", duration: 2400 },
      { id: 3, title: "Acordes fundamentales", duration: 3000 },
    ],
  },
  {
    id: 2,
    title: "Técnicas Avanzadas de Fingerpicking",
    icon: <BoltIcon className="w-6 h-6 text-blue-400" />,
    duration: "5 horas de contenido, 15 horas de práctica",
    level: "Intermedio",
    lessons: [
      { id: 1, title: "Patrones de fingerpicking", duration: 2700 },
      { id: 2, title: "Ejercicios de independencia de dedos", duration: 3300 },
      { id: 3, title: "Aplicación en canciones populares", duration: 3900 },
    ],
  },
  {
    id: 3,
    title: "Teoría Musical para Guitarristas",
    icon: <MusicalNoteIcon className="w-6 h-6 text-green-400" />,
    duration: "6 horas de contenido, 12 horas de práctica",
    level: "Todos los niveles",
    lessons: [
      { id: 1, title: "Escalas mayores y menores", duration: 3600 },
      { id: 2, title: "Construcción de acordes", duration: 3900 },
      { id: 3, title: "Armonía aplicada a la guitarra", duration: 4200 },
    ],
  },
  {
    id: 4,
    title: "Improvisación y Solos de Guitarra",
    icon: <FireIcon className="w-6 h-6 text-red-400" />,
    duration: "7 horas de contenido, 20 horas de práctica",
    level: "Avanzado",
    lessons: [
      { id: 1, title: "Técnicas de improvisación", duration: 4500 },
      { id: 2, title: "Fraseo y expresión", duration: 4800 },
      { id: 3, title: "Creación de solos memorables", duration: 5100 },
    ],
  },
];

const comments = [
  {
    id: 1,
    author: "GuitarLover123",
    content: "¡Excelente curso! Aprendí mucho sobre los fundamentos de la guitarra acústica. Las explicaciones son claras y los ejercicios muy útiles.",
    timestamp: "Hace 2 semanas",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    likes: 42,
  },
  {
    id: 2,
    author: "RockStar2000",
    content: "El curso de improvisación es fantástico. Me ha ayudado a desarrollar mi creatividad y a sentirme más cómodo tocando solos.",
    timestamp: "Hace 1 mes",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    likes: 38,
  },
];

export default function GuitarCoursePlatform() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const currentCourse = courses[currentCourseIndex];
  const currentLesson = currentCourse.lessons[currentLessonIndex];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === " ") {
        handlePlayPause();
      } else if (e.key === "ArrowRight") {
        handleSkipForward();
      } else if (e.key === "ArrowLeft") {
        handleSkipBackward();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <div ref={containerRef} className="flex bg-purple-900 text-white h-screen">
      <style jsx>{`
        .sidebar {
          transition: all 0.3s ease-in-out;
          width: 320px;
        }
        .sidebar.closed {
          width: 0;
          overflow: hidden;
        }
        .video-controls {
          background: linear-gradient(to top, rgba(76, 29, 149, 0.8), transparent);
        }
        .progress-bar {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .progress {
          background-color: #8b5cf6;
          transition: width 0.1s linear;
        }
        .control-button {
          transition: all 0.2s ease-in-out;
        }
        .control-button:hover {
          transform: scale(1.1);
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className={`sidebar bg-purple-800 ${isSidebarOpen ? "" : "closed"}`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-300">Explora Nuestros Cursos</h2>
          {courses.map((course, courseIndex) => (
            <div
              key={course.id}
              className={`mb-4 p-4 rounded-lg cursor-pointer transition-colors ${
                courseIndex === currentCourseIndex ? "bg-purple-700" : "hover:bg-purple-700/50"
              }`}
              onClick={() => setCurrentCourseIndex(courseIndex)}
            >
              <div className="flex items-center mb-2">
                {course.icon}
                <h3 className="font-semibold ml-2">{course.title}</h3>
              </div>
              <p className="text-sm text-purple-300">{course.duration}</p>
              <span className="inline-block bg-purple-600 text-xs px-2 py-1 rounded mt-2">
                {course.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="relative flex-grow">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/placeholder.svg?height=400&width=600"
            onTimeUpdate={handleTimeUpdate}
          />
          <div className="absolute bottom-0 left-0 right-0 video-controls p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="control-button p-2 bg-white/20 rounded-full"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={handleSkipBackward}
                  className="control-button p-2 bg-white/20 rounded-full"
                >
                  <BackwardIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={handleSkipForward}
                  className="control-button p-2 bg-white/20 rounded-full"
                >
                  <ForwardIcon className="w-6 h-6" />
                </button>
                <span className="text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(currentLesson.duration)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SpeakerWaveIcon className="w-5 h-5" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-purple-500"
                  />
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="control-button p-2 bg-white/20 rounded-full"
                >
                  {isFullscreen ? (
                    <ArrowsPointingInIcon className="w-5 h-5" />
                  ) : (
                    <ArrowsPointingOutIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full progress-bar rounded-full h-1">
              <div
                className="progress h-1 rounded-full"
                style={{
                  width: `${(currentTime / currentLesson.duration) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <button
            className="absolute top-6 left-6 bg-purple-800/70 p-3 rounded-full transition-all hover:bg-purple-700/80"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="h-1/3 bg-purple-800 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-purple-300">{currentCourse.title}</h2>
            <p className="text-sm text-purple-400 mb-4">{currentCourse.duration}</p>
            <h3 className="text-xl font-semibold mb-6 text-purple-200">
              {currentLesson.title}
            </h3>
            <h4 className="font-semibold mb-4 text-lg text-purple-300">Comentarios</h4>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-purple-700 rounded-lg p-4 mb-4 hover:bg-purple-600 transition-colors">
                <div className="flex items-center mb-3">
                  <img
                    src={comment.avatarUrl}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-purple-300">{comment.author}</p>
                    <p className="text-xs text-purple-400">{comment.timestamp}</p>
                  </div>
                </div>
                <p className="text-sm mb-3">{comment.content}</p>
                <div className="flex items-center text-purple-400">
                  <FireIcon className="w-4 h-4 mr-2 text-orange-400" />
                  <span className="text-sm">{comment.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}