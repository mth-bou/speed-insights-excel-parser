import * as xlsx from 'xlsx';
import {pagespeedonline_v5} from "googleapis";
import Schema$PagespeedApiPagespeedResponseV5 = pagespeedonline_v5.Schema$PagespeedApiPagespeedResponseV5;

// Définition du type pour les données que nous attendons de recevoir
type PerformanceData = {
    lighthouseResult: {
        audits: Record<string, { score: number; displayValue: string; description: string; }>;
    };
};

// Fonction pour exporter les données en fichier Excel
export const exportToExcel = (data: Schema$PagespeedApiPagespeedResponseV5, filePath: string): void => {

    // Vérifier que les données nécessaires sont présentes
    if (!data.lighthouseResult || !data.lighthouseResult.audits) {
        throw new Error('The data required to generate the Excel report is incomplete or missing.');
    }

    // Créer un nouveau classeur
    const workbook = xlsx.utils.book_new();

    // Convertir les données JSON en feuille de calcul
    const audits = Object.entries(data.lighthouseResult.audits).map(([key, value]) => ({
        Audit: key,
        Score: value.score,
        DisplayValue: value.displayValue,
        Description: value.description
    }));
    const worksheet = xlsx.utils.json_to_sheet(audits);

    // Ajouter la feuille de calcul au classeur
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Results');

    // Écrire le fichier Excel sur le disque
    xlsx.writeFile(workbook, filePath);
}
