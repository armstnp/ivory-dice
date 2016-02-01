export { ContractError };

function ContractError(message) {
  this.name = 'ContractError';
  this.message = message || 'Contract violated';
  this.stack = (new Error()).stack;
};
ContractError.prototype = Object.create(Error.prototype);
ContractError.prototype.constructor = ContractError;
