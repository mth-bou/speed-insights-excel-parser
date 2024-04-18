const { fetchPerformanceData } = require('../../src');
const { google } = require('googleapis');

jest.mock('googleapis', () => {
    const actualGoogleapis = jest.requireActual('googleapis');
    return {
        ...actualGoogleapis,
        google: {
            ...actualGoogleapis.google,
            pagespeedonline: jest.fn(() => ({
                pagespeedapi: {
                    runpagespeed: jest.fn().mockResolvedValue({
                        data: { lighthouseResult: { audits: {} } }
                    })
                }
            }))
        }
    };
});

test('fetchPerformanceData retrieves data correctly', async () => {
    const url = "https://example.com";
    const apiKey = "fake_api_key";
    const data = await fetchPerformanceData(url, apiKey);
    expect(data).toHaveProperty('lighthouseResult.audits');
});
