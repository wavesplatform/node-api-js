import ethAsset2Waves from '../../../src/tools/assets/ethAsset2Waves';
import wavesAsset2Eth from '../../../src/tools/assets/wavesAsset2Eth';

describe('Asset-ID conversion between Ethereum (EVM) and Waves', () => {
  // ► Asset ID EVM (20 bytes, 0x…)
  const ethAssetId   = '0x31f2bc7a100e9d8c4a200644c8bb7c7c277f56f8';
  // ► Asset ID Waves (32 bytes -> Base58)
  const wavesAssetId = '4MyexEQAxYdApQX2fAN2dc3VwPfKopRHs1EGyLHCCSVD';

  test('ethAsset2Waves converte Asset ID EVM para Waves', () => {
    const converted = ethAsset2Waves(ethAssetId);
    expect(converted).toBe(wavesAssetId);
  });

  test('wavesAsset2Eth converte Asset ID Waves de volta para EVM', () => {
    const converted = wavesAsset2Eth(wavesAssetId);
    // ignorar diferenças de maiúsculas/minúsculas
    expect(converted.toLowerCase()).toBe(ethAssetId.toLowerCase());
  });
});
