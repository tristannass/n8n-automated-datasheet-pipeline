const maxChars = 12000;
let text = $json.text;

// Coupe le bloc disclaimer légal s'il est détecté
const noiseMarkers = ["Legal Disclaimer Notice", "ALL RIGHTS RESERVED"];
for (const marker of noiseMarkers) {
  const idx = text.indexOf(marker);
  if (idx !== -1) {
    text = text.slice(0, idx);
    break;
  }
}

// Troncature de sécurité par nombre de caractères
if (text.length > maxChars) {
  text = text.slice(0, maxChars);
  // Coupe à la dernière ligne complète plutôt qu'en plein milieu d'une ligne
  const lastNewline = text.lastIndexOf("\n");
  if (lastNewline > maxChars * 0.8) {
    text = text.slice(0, lastNewline);
  }
}

return {
  json: {
    ...$json,
    text_tronque: text,
    longueur_originale: $json.text.length,
    longueur_tronquee: text.length
  }
};
