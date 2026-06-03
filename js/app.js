// Logique globale de l'application

document.addEventListener('DOMContentLoaded', function() {
    console.log('DojoControl app initialized');

    // Gestion du formulaire d'inscription
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
});

/**
 * Traite la soumission du formulaire d'inscription
 * @param {HTMLFormElement} form - Le formulaire à traiter
 */
function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log('Données du formulaire:', data);

    // TODO: Envoyer les données au serveur ou les stocker localement
    // Pour l'instant, on affiche une confirmation simple
    alert(`Inscription enregistrée pour ${data.firstName} ${data.lastName}`);
}

/**
 * Exporte les données en CSV
 * @param {Array} data - Les données à exporter
 * @param {string} filename - Le nom du fichier
 */
function exportToCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) {
        console.warn('Aucune donnée à exporter');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => 
                JSON.stringify(row[header] || '')
            ).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Charge un fichier CSV
 * @param {File} file - Le fichier CSV à charger
 * @param {Function} callback - Fonction de rappel avec les données
 */
function loadCSV(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csv = e.target.result;
            const data = parseCSV(csv);
            callback(data);
        } catch (error) {
            console.error('Erreur lors de la lecture du CSV:', error);
        }
    };
    reader.readAsText(file);
}
