const block=require('./block.js');
class Blockchain{
	constructor(){
		this.chain=[block.genesis()];
	}

	addBlock(data){
		const Block=block.mineBlock(this.chain[this.chain.length-1],data);
		this.chain.push(Block);
		return Block;
	}

	isValidChain(chain){
		if(JSON.stringify(chain[0])!==JSON.stringify(block.genesis()))return false;
		for(let i=1;i<chain.length;i++){
			let Block=chain[i];
			let lastBlock=chain[i-1];
			if(Block.lastHash!==lastBlock.hash||Block.hash!==block.blockHash(Block))
				return false;
		}
		return true;	
	}

	replaceChain(newChain){
		if(this.chain.length>newChain.length){
			console.log("Current chain is larger than new chain");
			return;
		}
		else if(!this.isValidChain(newChain)){
			console.log("newChain is  not valid");
			return;
		}

		console.log("Replacing blockchain with the new chain");
		this.chain=newChain;
	}
}
module.exports=Blockchain;