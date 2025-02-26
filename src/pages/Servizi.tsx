
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Star, User, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import CatalogoCtaSection from "@/components/CatalogoCtaSection";

const vehicles = [
  {
    id: 1,
    name: "Escavatore Cingolato",
    description: "Escavatore 20q ideale per scavi e movimento terra",
    price: "200€/giorno",
    withDriverPrice: "350€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Peso operativo: 20q",
      "Profondità di scavo: 4m",
      "Cabina climatizzata",
      "GPS integrato",
    ],
    category: "Movimento terra",
    rating: 4.9,
    reviews: 128,
    withDriver: true,
  },
  {
    id: 2,
    name: "Gru a Torre",
    description: "Gru altezza 30m con portata massima 2500kg",
    price: "350€/giorno",
    withDriverPrice: "550€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Altezza: 30m",
      "Portata max: 2500kg",
      "Radiocomando incluso",
      "Assistenza 24/7",
    ],
    category: "Sollevamento",
    rating: 4.8,
    reviews: 94,
    withDriver: true,
  },
  {
    id: 3,
    name: "Autocarro con Gru",
    description: "Autocarro 4 assi con gru integrata per trasporto materiali",
    price: "280€/giorno",
    withDriverPrice: "450€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Capacità di carico: 15t",
      "Gru: portata 5t",
      "Lunghezza pianale: 9m",
      "Patente C richiesta",
    ],
    category: "Trasporto",
    rating: 4.7,
    reviews: 86,
    withDriver: true,
  },
  {
    id: 4,
    name: "Bulldozer Caterpillar",
    description: "Bulldozer potente per livellamento terreno e scavi di massa",
    price: "320€/giorno",
    withDriverPrice: "500€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Potenza: 150HP",
      "Lama 3.8m",
      "Cingoli da 700mm",
      "Sistema di telecamere 360°",
    ],
    category: "Movimento terra",
    rating: 4.8,
    reviews: 112,
    withDriver: true,
  },
  {
    id: 5,
    name: "Autobetoniera",
    description: "Betoniera per trasporto calcestruzzo fresco",
    price: "230€/giorno",
    withDriverPrice: "400€/giorno",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    features: [
      "Capacità: 8mc",
      "