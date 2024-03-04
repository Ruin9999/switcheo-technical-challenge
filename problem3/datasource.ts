class Datasource { //Seperated DataSource class from index.ts to maintain single responsibility
    constructor(private url: string) {
        this.url = url;
    }

    async getPrices() {
        const response = await fetch(this.url);
        const json = await response.json();
        return json;
    }
}

export default Datasource;