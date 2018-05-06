const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
	'absent purity purchase average chimney hunt rebel pulse visa grocery column inhale',
	'https://rinkeby.infura.io/nSg9ftka2L8eJLAJqois')

const web3 = new Web3(provider)

const deploy = async () => {        
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account ', accounts[0]) 

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contact deployed to ', result.options.address)  
  //Contact deployed to   0x4e79db85dcFBfD0d2f88049Ded547209518BbF47
}
deploy()