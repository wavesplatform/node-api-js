import eth2waves from '../../../src/tools/adresses/eth2waves';

test('eth 2 waves address', async () => {
    const ethAddress = '11242d6ec6B50713026a3757cAeb027294C2242a';
    const wavesAddress = '3EzjTrzQB57shiN4RwUi9ikC44FBGRzZ81G';
    const chainId = 67; // C

    const convertedAddress = eth2waves(ethAddress, chainId);

    expect(convertedAddress).toBe(wavesAddress);
});
