const Web3 = require('web3');

async function getBlockByNumber(blockNumber) {
  const web3 = new Web3('https://api.wemix.com');

  try {
    const block = await web3.eth.getBlock(blockNumber, true);
    var fees = BigInt(parseInt(block.fees, 16));
    var burnt = BigInt(block.baseFeePerGas * block.gasUsed);
    //console.log(block);
    //console.log(block.fees);
    //if (fees > 0) {
      //console.log('blk#:', blockNumber, ', fees:', fees, ', burnt:', burnt);
    //}
    return [fees, burnt];
  } catch (error) {
    console.error(error);
    return [BigInt(0), BigInt(0)];
  }
}

var fees_sum = BigInt(0);
var burnt_sum = BigInt(0);
async function main() {
  var i;
  var fees = BigInt(0);
  var burnt = BigInt(0);
  for (i = 1; i <= 6264007; i++) {
    [fees, burnt] = await getBlockByNumber(i);  
    console.log('blk#:', i, ', fees:', fees, ', burnt:', burnt);
    if (i != 7) {
      fees_sum = fees + fees_sum;
    }
    burnt_sum = burnt + burnt_sum;
  }
  console.log('blk#:', i-1, ', total_fees:', fees_sum, ', total_burnt:', burnt_sum);
}

main();
