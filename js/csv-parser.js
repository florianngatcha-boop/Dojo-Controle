// Parseur CSV pour l'import de données Excel/CSV

/**
 * Parse une chaîne CSV et retourne un tableau d'objets
 * @param {string} csv - Le contenu CSV brut
 * @param {Object} options - Options de parsing
 * @returns {Array} Tableau d'objets représentant les lignes
 */
function parseCSV(csv, options = {}) {
    const {
        delimiter = ',',
        hasHeader = true,
        trimValues = true
    } = options;

    const lines = csv.trim().split('\n');
    const result = [];

    if (lines.length === 0) {
        return result;
    }

    let headers = [];

    // Traiter la première ligne comme en-têtes si hasHeader est vrai
    if (hasHeader && lines.length > 0) {
        headers = parseCSVLine(lines[0], delimiter).map(h => 
            trimValues ? h.trim() : h
        );
    }

    // Traiter les autres lignes
    const startIndex = hasHeader ? 1 : 0;
    for (let i = startIndex; i < lines.length; i++) {
        const values = parseCSVLine(lines[i], delimiter).map(v => 
            trimValues ? v.trim() : v
        );

        if (hasHeader) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j] || '';
            }
            result.push(obj);
        } else {
            result.push(values);
        }
    }

    return result;
}

/**
 * Parse une seule ligne CSV en tenant compte des guillemets
 * @param {string} line - La ligne CSV
 * @param {string} delimiter - Le délimiteur (virgule par défaut)
 * @returns {Array} Tableau des valeurs
 */
function parseCSVLine(line, delimiter = ',') {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Échappement de guillemet: ""
                current += '"';
                i++; // Sauter le prochain guillemet
            } else {
                // Toggle de l'état de guillemets
                insideQuotes = !insideQuotes;
            }
        } else if (char === delimiter && !insideQuotes) {
            // Délimiteur trouvé en dehors des guillemets
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    // Ajouter le dernier champ
    result.push(current);

    return result;
}

/**
 * Valide les données CSV selon un schéma
 * @param {Array} data - Les données à valider
 * @param {Object} schema - Le schéma de validation
 * @returns {Object} Résultat de la validation
 */
function validateCSV(data, schema) {
    const errors = [];

    for (let i = 0; i < data.length; i++) {
        const row = data[i];

        for (const field in schema) {
            const rules = schema[field];

            // Vérifier si le champ est requis
            if (rules.required && (!row[field] || row[field].trim() === '')) {
                errors.push(`Ligne ${i + 1}: Le champ "${field}" est requis`);
            }

            // Vérifier le type
            if (rules.type && row[field]) {
                switch (rules.type) {
                    case 'number':
                        if (isNaN(parseFloat(row[field]))) {
                            errors.push(`Ligne ${i + 1}: Le champ "${field}" doit être un nombre`);
                        }
                        break;
                    case 'email':
                        if (!isValidEmail(row[field])) {
                            errors.push(`Ligne ${i + 1}: Le champ "${field}" n'est pas un email valide`);
                        }
                        break;
                    case 'date':
                        if (!isValidDate(row[field])) {
                            errors.push(`Ligne ${i + 1}: Le champ "${field}" n'est pas une date valide`);
                        }
                        break;
                }
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * Vérifie si une chaîne est un email valide
 * @param {string} email - L'email à vérifier
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Vérifie si une chaîne est une date valide
 * @param {string} dateString - La date à vérifier
 * @returns {boolean}
 */
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Convertit un tableau d'objets en CSV
 * @param {Array} data - Les données à convertir
 * @param {Array} headers - Les en-têtes (optionnel)
 * @returns {string} String CSV
 */
function convertToCSV(data, headers = null) {
    if (!data || data.length === 0) {
        return '';
    }

    const keys = headers || Object.keys(data[0]);
    const csvLines = [keys.join(',')];

    for (const row of data) {
        const values = keys.map(key => {
            const value = row[key] || '';
            // Échapper les valeurs contenant des virgules ou des guillemets
            if (value.toString().includes(',') || value.toString().includes('"')) {
                return `"${value.toString().replace(/"/g, '""')}"`;
            }
            return value;
        });
        csvLines.push(values.join(','));
    }

    return csvLines.join('\n');
}
