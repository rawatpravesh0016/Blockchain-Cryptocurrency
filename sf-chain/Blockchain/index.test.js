const Blockchain=require('./index');
const Block=require('./block');

describe('Blockchain',()=>{
	let blockchain,data,bc;

	beforeEach(()=>{
		blockchain=new Blockchain();
		bc=new Blockchain();
		data="foo";
	});

	it('starting with genesis block',()=>{
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it('checking for last block added',()=>{
		blockchain.addBlock(data);
		expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
	});

	it('validates a valid chain',()=>{
		bc.addBlock('foo');
		expect(bc.isValidChain(bc.chain)).toBe(true);
	});

	it('invalidates a chain with a corrupt genesis block',()=>{
		bc.chain[0].data="bad data";
		expect(bc.isValidChain(bc.chain)).toBe(false);
	});

	it('invalidates a corrupt chain',()=>{
		bc.addBlock('foo');
		bc.chain[1].data="not foo";
		expect(bc.isValidChain(bc.chain)).toBe(false);
	});

	it('replaces the chain with a valid chain',()=>{
		bc.addBlock('foo');
		blockchain.replaceChain(bc.chain);
		expect(blockchain.chain).toEqual(bc.chain);
	});

	it('Does not replace the chain with invalid chain',()=>{
		blockchain.addBlock('foo');
		blockchain.replaceChain(bc.chain);
		expect(blockchain.chain).not.toEqual(bc.chain);
	});

});