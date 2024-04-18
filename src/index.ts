import { fetchPerformanceData } from './api/googleSpeedInsights';
import { exportToExcel } from './utils/excelGenerator';

// Type définissant la structure des options acceptées par votre module principal
interface Options {
    url: string;
    apiKey: string;
    outputFilePath: string;
}

// Fonction principale qui orchestre la récupération des données et la création du fichier Excel
export async function analyzeAndExport(options: Options): Promise<void> {
    try {
        // Récupération des données de performance
        const data = await fetchPerformanceData(options.url, options.apiKey);

        // Exportation des données vers un fichier Excel
        exportToExcel(data, options.outputFilePath);

        console.log(`Report generated successfully at ${options.outputFilePath}`);
    } catch (error) {
        console.error('Failed to generate report:', error);
        throw error; // Relancer l'erreur pour permettre une gestion externe
    }
}

// Exposer une fonction simplifiée si nécessaire
export function simpleAnalysis(url: string, apiKey: string): Promise<void> {
    const defaultPath = `./performance_report_${new Date().toISOString()}.xlsx`;
    return analyzeAndExport({ url, apiKey, outputFilePath: defaultPath });
}
