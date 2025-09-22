"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const axios_1 = __importDefault(require("axios"));
class Random {
    constructor() {
        this.description = {
            displayName: 'True Random Number Generator',
            name: 'randomOrgApi',
            icon: 'file:icons/random-icon.svg',
            group: ['transform'],
            version: 1,
            description: 'Gera um número aleatório utilizando a API do Random.org',
            defaults: {
                name: 'True Random Number',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                // Input para o valor mínimo
                {
                    displayName: 'Valor Mínimo',
                    name: 'min',
                    type: 'number',
                    default: 1,
                    required: true,
                    description: 'O menor valor a ser gerado (inclusivo)',
                },
                // Input para o valor máximo
                {
                    displayName: 'Valor Máximo',
                    name: 'max',
                    type: 'number',
                    default: 60,
                    required: true,
                    description: 'O maior valor a ser gerado (inclusivo)',
                },
            ],
        };
    }
    // O método que executa a lógica do nó
    async execute() {
        // Pega os valores dos inputs definidos em 'properties'
        const min = this.getNodeParameter('min', 0);
        const max = this.getNodeParameter('max', 0);
        // Monta a URL da API com os valores dinâmicos
        const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
        let randomNumber;
        try {
            const response = await axios_1.default.get(apiUrl);
            randomNumber = parseInt(response.data.toString().trim(), 10);
        }
        catch (error) {
            // Verificamos se o erro capturado é uma instância de Error do Javascript.
            // Isso nos dá acesso seguro às propriedades .message e .stack.
            if (error instanceof Error) {
                // Criamos um novo objeto contendo a mensagem do erro,
                // que satisfaz a exigência de ser um JsonObject.
                throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: error.message });
            }
            // Se o 'error' não for um objeto de Error, nós o convertemos para string.
            throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: JSON.stringify(error) });
        }
        // Prepara os dados de saída no formato que o n8n espera
        const returnData = this.helpers.returnJsonArray({ randomNumber: randomNumber });
        return this.prepareOutputData(returnData);
    }
}
exports.Random = Random;
