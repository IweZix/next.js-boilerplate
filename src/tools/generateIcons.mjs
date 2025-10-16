import { readdir, readFile, writeFile } from 'fs';
import { extname, join, parse } from 'path';

// Convert a string to PascalCase
function toPascalCase(string) {
  return `${string}`
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, (_, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(/\w/, (s) => s.toUpperCase());
}

const sourceFolderPath = './svgIcons';
const destinationFolderPath = './src/components/icons';

// Read all SVG files
readdir(sourceFolderPath, (readFolderError, files) => {
  if (readFolderError) {
    console.error('❌ Erreur lecture dossier source:', readFolderError);
    return;
  }

  files.forEach((file) => {
    if (extname(file).toLowerCase() === '.svg') {
      readFile(join(sourceFolderPath, file), 'utf8', (readError, data) => {
        if (readError) {
          console.error('❌ Erreur lecture fichier SVG:', readError);
          return;
        }

        const fileName = parse(file).name;
        const componentName = toPascalCase(fileName) + 'Icon';

        // Nettoyage de l’intérieur du SVG
        const cleanedSvg = data
          .replace(/<\?xml.*?\?>/g, '') // Supprime la déclaration XML
          .replace(/<!DOCTYPE.*?>/g, '') // Supprime le DOCTYPE
          .replace(/fill=".*?"/g, '') // Supprime les fills statiques
          .replace(/stroke=".*?"/g, ''); // Supprime les strokes statiques

        const componentCode = `import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ${componentName}: React.FC<IconProps> = ({ size = 24, color = 'currentColor', ...props }) => (
  ${cleanedSvg
    .replace('<svg', `<svg {...props} width={size} height={size} fill={color}`)
    .replace(/\n+/g, '\n  ')
    .trim()}
);

export default ${componentName};
`;

        const destinationFilePath = join(destinationFolderPath, `${componentName}.tsx`);
        writeFile(destinationFilePath, componentCode, (writeError) => {
          if (writeError) {
            console.error('❌ Erreur écriture composant:', writeError);
          } else {
            console.log(`✅  Généré: ${destinationFilePath}`);
          }
        });
      });
    }
  });
});

console.log(
  '\n🎉 Tous les SVG du dossier ./svgIcons ont été convertis en composants React dans ./src/components/icons !'
);
