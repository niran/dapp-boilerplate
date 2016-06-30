/**
 * Export Truffle-generated contract data that can be used without Pudding.
 */
import t from 'tcomb';
// TODO: Load from the production
import PledgesLoader from '../environments/development/contracts/Pledges.sol.js';


const Contract = t.struct({
  abi: t.list(t.Object),
  binary: t.String,
  unlinked_binary: t.String,
  address: t.String,
  generated_with: t.String,
  contract_name: t.String,
}, 'Contract');

// Mock the Pudding interface with a whisk method that collects contract data.
const collector = {
  contracts: {},
  whisk(contractData) {
    const contractName = contractData.contract_name;
    collector.contracts[contractName] = Contract(contractData);
  },
};

PledgesLoader.load(collector);

export const Pledges = collector.contracts.Pledges;
