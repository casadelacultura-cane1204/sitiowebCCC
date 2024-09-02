"use client";
import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  PlusIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns";

const EventCard = ({ event, onAddToCalendar }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-2 text-purple-100">
        <CalendarIcon className="h-5 w-5" />
        <span className="text-sm font-medium">
          {format(parseISO(event.date), "MMM dd, yyyy")}
        </span>
      </div>
      <button
        onClick={() => onAddToCalendar(event)}
        className="bg-purple-500 hover:bg-purple-400 text-white rounded-full p-2 transition-colors duration-200"
        title="Añadir al calendario"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
    <p className="text-purple-200 mb-4 font-medium">{event.presenter}</p>
    <div className="flex justify-between items-center">
      <span className="bg-purple-800 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full">
        {event.type}
      </span>
      <div className="flex items-center space-x-1 text-purple-200">
        <UserGroupIcon className="h-5 w-5" />
        <span className="text-sm font-medium">+{event.attendees}</span>
      </div>
    </div>
  </motion.div>
);

const Comment = ({ comment }) => (
  <div className="bg-gray-700 rounded-lg p-4 mt-2">
    <div className="flex items-center space-x-2 mb-2">
      <img
        src={comment.avatar}
        alt={comment.name}
        className="w-8 h-8 rounded-full"
      />
      <span className="font-semibold text-white">{comment.name}</span>
    </div>
    <p className="text-gray-300">{comment.content}</p>
  </div>
);

const ForumPost = ({ post, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch comments
    const fetchedComments = [
      {
        id: 1,
        name: "Elena García",
        content: "¡Totalmente de acuerdo! Fue una experiencia inolvidable.",
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 2,
        name: "Miguel Sánchez",
        content: "Me encantaría asistir al próximo evento. ¿Cuándo será?",
        avatar: "/api/placeholder/32/32",
      },
    ];
    setComments(fetchedComments);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={post.avatar}
          alt={post.name}
          className="w-12 h-12 rounded-full border-2 border-purple-500"
        />
        <div>
          <h4 className="font-bold text-white text-lg">{post.name}</h4>
          <p className="text-sm text-gray-400">
            {post.type} • {post.time}
          </p>
        </div>
      </div>
      <p className="text-gray-300 mb-4 text-lg">{post.content}</p>
      <div className="flex items-center space-x-6 text-gray-400">
        <button
          className="flex items-center space-x-2 hover:text-pink-500 transition-colors duration-200"
          onClick={() => onLike(post.id)}
        >
          <HeartIcon
            className={`h-5 w-5 ${
              post.liked ? "text-pink-500 fill-current" : ""
            }`}
          />
          <span>{post.likes}</span>
        </button>
        <button
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          <span>{post.comments}</span>
          {isExpanded ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Calendar = ({ events, onAddToCalendar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="text-center text-gray-500 font-medium">
            {day}
          </div>
        ))}
        {monthDays.map((day) => {
          const dayEvents = events.filter(
            (event) =>
              format(parseISO(event.date), "yyyy-MM-dd") ===
              format(day, "yyyy-MM-dd")
          );
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-full text-sm ${
                !isSameMonth(day, currentDate)
                  ? "text-gray-500"
                  : isToday(day)
                  ? "bg-purple-600 text-white"
                  : "text-white hover:bg-gray-700"
              } ${dayEvents.length > 0 ? "border-2 border-purple-500" : ""}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Eventos el {format(selectedDate, "d MMMM, yyyy")}
          </h3>
          {events
            .filter(
              (event) =>
                format(parseISO(event.date), "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
            )
            .map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-lg p-3 mb-2 flex justify-between items-center"
              >
                <span className="text-white">{event.title}</span>
                <button
                  onClick={() => onAddToCalendar(event)}
                  className="bg-purple-500 hover:bg-purple-400 text-white rounded-full p-1 transition-colors duration-200"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CasaCulturaComponent = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [events, setEvents] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    // Simulando llamadas a API
    setEvents([
      {
        id: 1,
        title: "Lectura de Poesía: Versos del Alma",
        presenter: "María González",
        date: "2024-09-07T19:00:00",
        type: "Poesía",
        attendees: 50,
      },
      {
        id: 2,
        title: "Encuentro con el Poeta Gabriel Rojas",
        presenter: "Gabriel Rojas",
        date: "2024-09-15T18:00:00",
        type: "Charla",
        attendees: 75,
      },
      {
        id: 3,
        title: "Clase Magistral de Piano",
        presenter: "Maestro Juan Pérez",
        date: "2024-09-22T10:00:00",
        type: "Música",
        attendees: 30,
      },
    ]);

    setForumPosts([
      {
        id: 1,
        name: "Ana López",
        type: "Estudiante",
        time: "2 horas atrás",
        content:
          "¡La lectura de poesía de anoche fue inspiradora! No puedo esperar para el próximo evento.",
        likes: 15,
        comments: 3,
        avatar: "/api/placeholder/48/48",
        liked: false,
      },
      {
        id: 2,
        name: "Carlos Ruiz",
        type: "Instructor de Música",
        time: "1 día atrás",
        content:
          "Emocionado de anunciar un nuevo taller de composición musical para el próximo mes.",
        likes: 42,
        comments: 7,
        avatar: "/api/placeholder/48/48",
        liked: false,
      },
    ]);
  }, []);

  const handleAddToCalendar = (event) => {
    alert(
      `Añadido "${event.title}" a tu calendario el ${format(
        parseISO(event.date),
        "d MMMM yyyy"
      )}`
    );
  };

  const handleLike = (postId) => {
    setForumPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-purple-400 text-sm font-semibold uppercase tracking-wide mb-2">
          Comunidad
        </h2>
        <h1 className="text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Casa de la Cultura Sebastián Martínez
        </h1>
        <p className="text-xl text-gray-400 mb-6">
          Un espacio para conectar con el arte, la poesía y la música.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-300">
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onAddToCalendar={handleAddToCalendar}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <Calendar events={events} onAddToCalendar={handleAddToCalendar} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-300">
            Foro de la Comunidad
          </h2>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center"
          >
            Ver Foro
            <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-1" />
          </a>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            className={`pb-2 transition-colors duration-300 ${
              activeTab === "new"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("new")}
          >
            NUEVO
          </button>
          <button
            className={`pb-2 transition-colors duration-300 ${
              activeTab === "popular"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            POPULAR
          </button>
        </div>
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {forumPosts.map((post) => (
              <ForumPost key={post.id} post={post} onLike={handleLike} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CasaCulturaComponent;
