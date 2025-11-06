import fs from 'fs';
import path from 'path';

const inputDir = path.join(process.cwd(), 'svgIcons');
const outputDir = path.join(process.cwd(), '/src/components/icons');

// Crée le dossier de sortie si nécessaire
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Parcours tous les fichiers SVG du dossier
const files = fs.readdirSync(inputDir).filter((file) => file.endsWith('.svg'));

files.forEach((file) => {
  const filePath = path.join(inputDir, file);
  const svgContent = fs.readFileSync(filePath, 'utf8');

  // Nettoyage du SVG : supprime width/height/fill/stroke
  let cleanedSvg = svgContent
    .replace(/width="[^"]*"/g, '')
    .replace(/height="[^"]*"/g, '')
    .replace(/fill="[^"]*"/g, 'fill={color}')
    .replace(/stroke="[^"]*"/g, 'stroke={color}')
    .replace(/<svg/, '<svg {...props} width={size} height={size}');

  // Nom du composant React
  const componentName = path.basename(file, '.svg').replace(/[^a-zA-Z0-9]/g, '');
  const reactComponent = `
import React from "react";

const ${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Icon = ({ size = 24, color = "currentColor", ...props }) => (
  ${cleanedSvg}
);

export default ${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Icon;
  `;

  // Écriture du fichier JSX
  const outputPath = path.join(
    outputDir,
    `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Icon.tsx`
  );
  fs.writeFileSync(outputPath, reactComponent.trim());
  console.log(`✅  Generated: ${outputPath}`);
});

console.log(
  `\n🎉 Tous les SVG du dossier ./svgIcons ont été convertis en composants React dans ./icons !`
);
