import {google} from 'googleapis';

export const fetchPerformanceData = async (url: string, apiKey: string) => {
    const pagespeed = google.pagespeedonline('v5').pagespeedapi;
    try {
        const res = await pagespeed.runpagespeed({
            url: url,
            key: apiKey
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
