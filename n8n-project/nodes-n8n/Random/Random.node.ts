import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
	description: INodeTypeDescription = {
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

	// O método que executa a lógica do nó
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Pega os valores dos inputs definidos em 'properties'
		const min = this.getNodeParameter('min', 0) as number;
		const max = this.getNodeParameter('max', 0) as number;

		// Monta a URL da API com os valores dinâmicos
		const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

		let randomNumber: number;

		try {
    		const response = await axios.get(apiUrl);
    		randomNumber = parseInt(response.data.toString().trim(), 10);
		} catch (error) {
    		// Verificamos se o erro capturado é uma instância de Error do Javascript.
    		// Isso nos dá acesso seguro às propriedades .message e .stack.
    		if (error instanceof Error) {
        		// Criamos um novo objeto contendo a mensagem do erro,
        		// que satisfaz a exigência de ser um JsonObject.
        		throw new NodeApiError(this.getNode(), { message: error.message });
    		}
    		// Se o 'error' não for um objeto de Error, nós o convertemos para string.
    		throw new NodeApiError(this.getNode(), { message: JSON.stringify(error) });
		}

		// Prepara os dados de saída no formato que o n8n espera
		const returnData = this.helpers.returnJsonArray({ randomNumber: randomNumber });

		return this.prepareOutputData(returnData);
	}
}