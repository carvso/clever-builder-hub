export const getImagePath = (imagePath: string) => {
  // Rimuoviamo lo slash iniziale per usare un percorso relativo
  return imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
}; 