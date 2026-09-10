export type Estado = "Disponible" | "Prestado";

export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  copias: number;
  estado: Estado;
  portada: string;
}

const libros: Libro[] = [
  {
    id: "1",
    titulo: "Lengua y Literatura",
    autor: "Edgar A.P.",
    editorial: "Santillana",
    genero: "Educativo",
    copias: 2,
    estado: "Disponible",
    portada: "https://placehold.co/200x280/2c3e50/ffffff?text=Lengua",
  },
  {
    id: "2",
    titulo: "Los Simpson y las matemáticas",
    autor: "Simon Singh",
    editorial: "Planeta",
    genero: "Divulgación",
    copias: 1,
    estado: "Disponible",
    portada: "https://placehold.co/200x280/f1c40f/222222?text=Simpson",
  },
  {
    id: "3",
    titulo: "I Learn English",
    autor: "Varios Autores",
    editorial: "Richmond",
    genero: "Idiomas",
    copias: 3,
    estado: "Disponible",
    portada: "https://placehold.co/200x280/3498db/ffffff?text=English",
  },
  {
    id: "4",
    titulo: "Biología para Dummies",
    autor: "Rene Fester Kratz",
    editorial: "Wiley",
    genero: "Ciencia",
    copias: 0,
    estado: "Prestado",
    portada: "https://placehold.co/200x280/27ae60/ffffff?text=Biología",
  },
];

export function getLibros(): Libro[] {
  return libros;
}

export function addLibro(nuevo: Omit<Libro, "id">): Libro {
  const libro: Libro = {
    ...nuevo,
    id: Date.now().toString(),
  };
  libros.push(libro);
  return libro;
}
