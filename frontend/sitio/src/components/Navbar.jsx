"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-[#121f3d] text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">Logo</span>
          <button className="hidden md:flex items-center space-x-1">
            Explorar
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="hidden md:block flex-1 max-w-xl px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="¿Qué quieres aprender?"
              className="w-full pl-8 py-2 bg-[#1c2c52] border border-[#1c2c52] rounded text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/courses"
            className="hover:bg-[#1c2c52] px-3 py-2 rounded block text-center"
          >
            Cursos
          </Link>
          <Link
            href="/comunity"
            className="hover:bg-[#1c2c52] px-3 py-2 rounded block text-center"
          >
            Comunidad
          </Link>
          <button className="bg-[#98ca3f] text-[#121f3d] px-4 py-2 rounded hover:bg-[#7da32f]">
            INGRESAR AHORA
          </button>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <input
            type="text"
            placeholder="¿Qué quieres aprender?"
            className="w-full mb-2 pl-8 py-2 bg-[#1c2c52] border border-[#1c2c52] rounded text-white placeholder-gray-400"
          />
          <button className="w-full text-left hover:bg-[#1c2c52] px-3 py-2 rounded mb-2">
            Explorar
          </button>
          <button className="w-full text-left hover:bg-[#1c2c52] px-3 py-2 rounded mb-2">
            Cursos
          </button>
          <button className="w-full text-left hover:bg-[#1c2c52] px-3 py-2 rounded mb-2">
            Comunidad
          </button>
          <button className="w-full bg-[#98ca3f] text-[#121f3d] px-4 py-2 rounded hover:bg-[#7da32f]">
            INGRESAR AHORA
          </button>
        </div>
      )}
    </nav>
  );
}
