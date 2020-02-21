import stringify from "../../src/tools/stringify";

it("check stringify", () => {
  const result = stringify({
    type: 4,
    version: 3,
    senderPublicKey: "EZdYn2ScK4sdHiiQ58A21PjiPHwEvXz4TnUqj4z8czKJ",
    assetId: "ELTrBUCbkwXXAZjypHitRwohFVHfMNa5jmYrznnU3YBa",
    recipient: "3FcPVZXCKWDryHFiCh3ExrHeebBDk18oKwv",
    amount: "500",
    attachment: "3MyAGEBuZGDKZDzYn6sbh2noqk9uYHy4kjw",
    fee: "100000",
    feeAssetId: null,
    timestamp: 1576573294279,
    proofs: [
      "5HmSbFKsmdtJtuXKHxAeRGMcKM7htNgH943k9pqQngLiB1hR4o1yTVtbH2ihCuP46yP9PbbWx5mZdcEbgnvCS6V8"
    ],
    chainId: 68,
    id: "Az2jMukkyE1dEe3UW9ubVk53Ch15hoEXQ9VmSPJ3RdLv"
  });
  expect(result).toBe(
    JSON.stringify({
      type: 4,
      version: 3,
      senderPublicKey: "EZdYn2ScK4sdHiiQ58A21PjiPHwEvXz4TnUqj4z8czKJ",
      assetId: "ELTrBUCbkwXXAZjypHitRwohFVHfMNa5jmYrznnU3YBa",
      recipient: "3FcPVZXCKWDryHFiCh3ExrHeebBDk18oKwv",
      amount: 500,
      attachment: "3MyAGEBuZGDKZDzYn6sbh2noqk9uYHy4kjw",
      fee: 100000,
      feeAssetId: null,
      timestamp: 1576573294279,
      proofs: [
        "5HmSbFKsmdtJtuXKHxAeRGMcKM7htNgH943k9pqQngLiB1hR4o1yTVtbH2ihCuP46yP9PbbWx5mZdcEbgnvCS6V8"
      ],
      chainId: 68,
      id: "Az2jMukkyE1dEe3UW9ubVk53Ch15hoEXQ9VmSPJ3RdLv"
    })
  );
});

it("Check stringify with data entry object", () => {
  expect(
    stringify([
      { type: "string", value: "123" },
      { type: "number", value: "123" }
    ])
  ).toBe(
    JSON.stringify([
      { type: "string", value: "123" },
      { type: "number", value: 123 }
    ])
  );
});
