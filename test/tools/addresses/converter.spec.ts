import ethAddress2waves from '../../../src/tools/adresses/ethAddress2waves';

test('eth 2 waves address', async () => {
    const ethAddress = '0x11242d6ec6B50713026a3757cAeb027294C2242a';
    const wavesAddress = '3EzjTrzQB57shiN4RwUi9ikC44FBGRzZ81G';
    const chainId = 67; // C

    const convertedAddress = ethAddress2waves(ethAddress, chainId);

    expect(convertedAddress).toBe(wavesAddress);
});
