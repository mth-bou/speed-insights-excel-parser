export class ApiAuth {

    private readonly apiKey?: string;

    constructor(apiKey?: string) {
        this.apiKey = apiKey;
    }

    getApiKey(): string | undefined {
        return this.apiKey;
    }

}
