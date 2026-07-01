// 1. Extraction du texte Markdown généré par Gemini
const markdown = $json.candidates[0].content.parts[0].text;

// 2. Extraction du nom du composant pour nommer le fichier
// On cherche la première ligne qui commence par "# " (le titre défini dans ton prompt)
let nom_fichier = "composant_inconnu";
const matchTitre = markdown.match(/^#\s*(.+)$/m);

if (matchTitre && matchTitre[1]) {
  // On nettoie le nom pour éviter les caractères interdits dans les noms de fichiers
  nom_fichier = matchTitre[1].replace(/[^a-zA-Z0-9_-]/g, "_");
}

// Ajout de l'extension Markdown
nom_fichier = nom_fichier + ".md";

// 3. On renvoie le tout proprement pour le prochain nœud
return {
  json: {
    nom_fichier: nom_fichier,
    contenu_markdown: markdown
  }
};
