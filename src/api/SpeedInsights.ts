import {google, pagespeedonline_v5} from 'googleapis';
import {ApiAuth} from './auth';
import {Category, Strategy} from "../constants/Enums";
import Schema$PagespeedApiPagespeedResponseV5 = pagespeedonline_v5.Schema$PagespeedApiPagespeedResponseV5;

type PerformanceOptions = {
    category: Category[];
    strategy: Strategy;
};

export type ParsedData = {
    cumulativeLayoutShift: number | null | undefined;
    experimentalTimeToFirstByte: number | null | undefined;
    firstContentfulPaint: number | null | undefined;
    largestContentfulPaint: number | null | undefined;
    firstInputDelayMs: number | null | undefined;
    interactionToNextPaint: number | null | undefined;
};

export class SpeedInsights {

    private auth: ApiAuth;

    constructor(apiKey?: string) {
        this.auth = new ApiAuth(apiKey);
    }

    fetchPerformanceData = async (url: string, options?: PerformanceOptions): Promise<Schema$PagespeedApiPagespeedResponseV5> => {
        const pagespeed = google.pagespeedonline('v5').pagespeedapi;
        try {
            const res = await pagespeed.runpagespeed({
                url: url,
                key: this.auth.getApiKey(),
                category: options?.category,
                strategy: options?.strategy,
            });
            return res.data;
        } catch (error) {
            console.error('Failed to fetch performance metrics: ', error);
            throw error;
        }
    }

    parsePerformanceData = (data: Schema$PagespeedApiPagespeedResponseV5): ParsedData | undefined => {
        const loadingExperience = data.loadingExperience;

        if (!loadingExperience?.metrics) {
            console.error('No loading experience data available.');
            return;
        }

        return {
            cumulativeLayoutShift: loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile,
            experimentalTimeToFirstByte: loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile,
            firstContentfulPaint: loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile,
            largestContentfulPaint: loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile,
            firstInputDelayMs: loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile,
            interactionToNextPaint: loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile,
        };

    }

}
