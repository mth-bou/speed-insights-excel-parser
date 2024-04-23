import {google, pagespeedonline_v5} from 'googleapis';
import {ApiAuth} from './auth';
import Schema$PagespeedApiPagespeedResponseV5 = pagespeedonline_v5.Schema$PagespeedApiPagespeedResponseV5;
import Schema$Categories = pagespeedonline_v5.Schema$Categories;

export class SpeedInsights {
    private auth: ApiAuth;

    constructor(apiKey?: string) {
        this.auth = new ApiAuth(apiKey);
    }

    fetchPerformanceData = async (url: string): Promise<Schema$PagespeedApiPagespeedResponseV5> => {
        const pagespeed = google.pagespeedonline('v5').pagespeedapi;
        try {
            const res = await pagespeed.runpagespeed({
                url: url,
                key: this.auth.getApiKey()
            });
            return res.data;
        } catch (error) {
            console.error('Failed to fetch performance metrics: ', error);
            throw error;
        }
    }

    fetchPerformanceCategories = async (url: string): Promise<Schema$Categories> => {
        const pagespeed = google.pagespeedonline('v5').pagespeedapi;
        try {
            const res = await pagespeed.runpagespeed({
                url: url,
                key: this.auth.getApiKey()
            });
            // @ts-ignore
            return res.data;
        } catch (error) {
            console.error('Failed to fetch performance categories: ', error);
            throw error;
        }
    }
}
