const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
	// get list of all accounts
	accounts = await web3.eth.getAccounts();

	// create anew deployed instance of the contract
	// use one of the accounts to deploy code
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data: bytecode, arguments: ['Hi there!']})
		.send({from: accounts[0], gas: 1000000});

	inbox.setProvider(provider);
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address);
	});

	it('has default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there!');
	});

	it('can change message', async () => {
		await inbox.methods.setMessage('Bye!').send({from: accounts[0]});
		const message = await inbox.methods.message().call();
		assert.equal(mesage, 'bye');
	});
	
});