import dotenv from 'dotenv';
import {SpeedInsights} from "../src";
import {pagespeedonline_v5} from "googleapis";
import Schema$PagespeedApiPagespeedResponseV5 = pagespeedonline_v5.Schema$PagespeedApiPagespeedResponseV5;
import Schema$Categories = pagespeedonline_v5.Schema$Categories;

dotenv.config();

/*let apiKey: string = '';

if (process.env.SPEED_INSIGHTS_API_KEY) {
    apiKey = process.env.SPEED_INSIGHTS_API_KEY
} else {
    throw new Error('API key is missing');
}*/

const main = async (url: string, apiKey?: string): Promise<Schema$PagespeedApiPagespeedResponseV5> => {

    const googleSpeedInsights = new SpeedInsights(apiKey);

    try {
        const data = await googleSpeedInsights.fetchPerformanceData(url);
        console.log('Data fetched:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

main('https://mochajs.org/');
