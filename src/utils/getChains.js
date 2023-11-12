const Web3 = require('web3')

const { ETH_RPC, BNB_RPC, MATIC_RPC, AVAX_RPC, FTM_RPC } = process.env

const web3ETH = new Web3(ETH_RPC)
const web3BNB = new Web3(BNB_RPC)
const web3MATIC = new Web3(MATIC_RPC)
const web3AVAX = new Web3(AVAX_RPC)
const web3FTM = new Web3(FTM_RPC)

exports.getChains = async address => {
  const isContract = {
    ETH: await web3ETH.eth.getCode(address) !== '0x',
    BNB: await web3BNB.eth.getCode(address) !== '0x',
    MATIC: await web3MATIC.eth.getCode(address) !== '0x',
    AVAX: await web3AVAX.eth.getCode(address) !== '0x',
    FTM: await web3FTM.eth.getCode(address) !== '0x'
  }

  const chains = [
    {
      id: 1,
      name: 'ETH',
      coin: 'ETH',
      scan: 'https://etherscan.io/token/',
      status: isContract.ETH
    },
    {
      id: 56,
      name: 'BSC',
      coin: 'BNB',
      scan: 'https://bscscan.com/token/',
      status: isContract.BNB
    },
    {
      id: 137,
      name: 'Polygon',
      coin: 'MATIC',
      scan: 'https://polygonscan.com/token/',
      status: isContract.MATIC
    },
    {
      id: 43114,
      name: 'Avalanche',
      coin: 'AVAX',
      scan: 'https://avascan.info/blockchain/c/token/',
      status: isContract.AVAX
    },
    {
      id: 250,
      name: 'Fantom',
      coin: 'FTM',
      scan: 'https://ftmscan.com/token/',
      status: isContract.FTM
    }
  ]

  return chains
}