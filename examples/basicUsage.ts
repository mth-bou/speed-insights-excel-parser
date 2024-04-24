import dotenv from 'dotenv';
import {SpeedInsights, ParsedData, Xlsx} from "../src";

dotenv.config();

/*let apiKey: string = '';

if (process.env.SPEED_INSIGHTS_API_KEY) {
    apiKey = process.env.SPEED_INSIGHTS_API_KEY
} else {
    throw new Error('API key is missing');
}*/

const insights = new SpeedInsights();

const fetchData = async (url: string): Promise<ParsedData | undefined> => {
    try {
        const rawData = await insights.fetchPerformanceData(url);
        return insights.parsePerformanceData(rawData);
    } catch (error) {
        console.error('Error processing data:', error);
        throw error;
    }
};

const data = fetchData("https://example.com")

const xlsx = new Xlsx();
xlsx.generate(data, 'output.xlsx');
