export const getImagePath = (imagePath: string) => {
  // In produzione (GitHub Pages), il percorso base include il nome del repository
  const basePath = import.meta.env.PROD ? '/clever-builder-hub' : '';
  return `${basePath}${imagePath}`;
}; 