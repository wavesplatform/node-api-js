import ethAddress2waves from '../../../src/tools/adresses/ethAddress2waves';

test('eth 2 waves address', async () => {
    const ethAddress = '0x11242d6ec6B50713026a3757cAeb027294C2242a';
    const wavesAddress = '3EzjTrzQB57shiN4RwUi9ikC44FBGRzZ81G';

    // const ethAddress = '0x14405431B46bc57Da194216391CF0DC39616828d';
    // const wavesAddress = '3F11ucZTFLBGrY3TpSmWH3tH4iaYRgLVvZV';

    const chainId = 67; // C

    const convertedAddress = ethAddress2waves(ethAddress, chainId);

    expect(convertedAddress).toBe(wavesAddress);
});
