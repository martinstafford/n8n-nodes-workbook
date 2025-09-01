import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType
} from 'n8n-workflow';

export class Workbook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Workbook',
		name: 'workbook',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		icon: 'file:Workbook.png',
		group: ['transform'],
		version: 1,
		description: 'Deltek Workbook Node',
		defaults: {
			name: 'Workbook',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'workbookApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.domain}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Databoard',
						value: 'databoard',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Job',
						value: 'job',
					},
				],
				default: 'databoard',
			},
			{
				displayName: 'Databoard Operations',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'databoard',
						]
					}
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Retrieve Databoard',
						description: 'Retrieve a specified Databoard',
						routing: {
							request: {
								method: 'GET',
								url: 'report/api/json/reply/DataboardDataRequest'
							}
						}
					}
				],
				default: 'get'
			},
			{
				displayName: 'Customer Operations',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'customer',
						]
					}
				},
				options: [
					{
						name: 'List Customers',
						value: 'list',
						action: 'List Customers',
						description: 'Retrieve a summarised list of customers',
						routing: {
							request: {
								method: 'GET',
								url: 'report/api/json/reply/DataboardDataRequest',
								qs: {
									DataboardId: '10027',
									parameters: '{}',
								}
							}
						}
					},
				],
				default: 'list'
			},
			{
				displayName: 'Project Operations',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'project',
						]
					}
				},
				options: [
					{
						name: 'List Customer Projects',
						action: 'List Customer Projects',
						value: 'list',
						description: 'Retrieve a summarised list of projects for a customer',
						routing: {
							request: {
								method: 'GET',
								url: 'api/json/reply/CustomerProjectsRequest',
							}
						}
					},
				],
				default: 'list'
			},
			{
				displayName: 'Job Operations',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'job',
						]
					}
				},
				options: [
					{
						name: 'List Project Jobs',
						value: 'list',
						action: 'List Project Jobs',
						description: 'Retrieve a summarised list of jobs for a project',
						routing: {
							request: {
								method: 'GET',
								url: 'api/json/reply/JobsRequest',
							}
						}
					},
				],
				default: 'list'
			},
			{
				displayName: 'Databoard ID',
				name: 'databoardId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'databoard',
						]
					}
				},
				routing: {
					request: {
						qs: {
							DataboardId: '={{$value}}',
							parameters: '{}',
						}
					}
				},
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'project',
						]
					}
				},
				routing: {
					request: {
						qs: {
							CustomerId: '={{$value}}',
							parameters: '{}',
						}
					}
				},
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'job',
						]
					}
				},
				routing: {
					request: {
						qs: {
							ProjectId: '={{$value}}',
							parameters: '{}',
						}
					}
				},
			},
		]
	};
}
