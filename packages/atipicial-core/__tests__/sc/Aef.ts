import { AEF } from "../../src/sc/AEF";
import { CallFlags } from "../../src/sc";
import { Buffer } from "buffer";

import { readFileSync } from "fs";
import { join as joinPath } from "path";

describe("constructor", () => {
  test("ok", () => {
    const result = new AEF({
      compiler: "test-compiler",
      tokens: [],
      script: "00",
    });

    expect(result instanceof AEF).toBeTruthy();
  });
});

describe("fromJson", () => {
  test("incorrect magic", () => {
    expect(() =>
      AEF.fromJson({
        magic: 0,
        compiler: "test-compiler",
        source: "",
        tokens: [],
        script: "00",
        checksum: 0,
      }),
    ).toThrow("Incorrect magic");
  });

  test("invalid checksum", () => {
    expect(() =>
      AEF.fromJson({
        magic: AEF.MAGIC,
        compiler: "test-compiler",
        source: "github",
        tokens: [],
        script: "00",
        checksum: 0,
      }),
    ).toThrow("Invalid checksum");
  });

  test("ok", () => {
    const result = AEF.fromJson({
      magic: AEF.MAGIC,
      compiler: "test-compiler",
      source: "github",
      tokens: [],
      script: "00",
      checksum: 3977318361,
    });
    expect(result instanceof AEF).toBeTruthy();
  });
});

describe("fromBuffer", () => {
  test("ok", () => {
    /* Capture from C#
      var aef = new AefFile
      {
          Compiler = "test-compiler 0.1",
          Source = "github",
          Script = new byte[] {(byte) OpCode.RET},
          Tokens = new MethodToken[]
          {
              new MethodToken()
              {
                  Hash = UInt160.Zero,
                  Method = "test_method",
                  ParametersCount = 0,
                  HasReturnValue = true,
                  CallFlags = CallFlags.None
              }
          }
      };
      aef.CheckSum = AefFile.ComputeChecksum(aef);
      Console.WriteLine(aef.ToArray().ToHexString());
     */
    const data = Buffer.from(
      "4e454633746573742d636f6d70696c657220302e31000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006676974687562000100000000000000000000000000000000000000000b746573745f6d6574686f6400000100000001403374b4fd",
      "hex",
    );
    const aef = AEF.fromBuffer(data);
    expect(aef.compiler).toBe("test-compiler 0.1");
    expect(aef.source).toBe("github");
    expect(aef.tokens.length).toBe(1);
    expect(aef.tokens[0].hash).toBe("0000000000000000000000000000000000000000");
    expect(aef.tokens[0].method).toBe("test_method");
    expect(aef.tokens[0].parametersCount).toBe(0);
    expect(aef.tokens[0].hasReturnValue).toBe(true);
    expect(aef.tokens[0].callFlags).toBe(CallFlags.None);
    expect(aef.script).toBe("40");
    expect(aef.checksum).toBe(4256461875);
  });

  test("local file: djnicholson.AtipicialPetShopContract", () => {
    const aefFile = readFileSync(
      joinPath(__dirname, "./djnicholson.AtipicialPetShopContract.aef"),
    );

    const aef = AEF.fromBuffer(aefFile);

    expect(aef.checksum).toBeDefined();
  });

  test("incorrect magic", () => {
    const data = Buffer.from("00010203", "hex");
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - incorrect magic",
    );
  });

  test("invalid source length", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "fd0101"; // var size of 257 (limit is 256)
    const data = Buffer.from(magic + compiler + source, "hex");
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - source field size exceeds maximum length of 256",
    );
  });

  test("invalid reserved 1", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const data = Buffer.from(magic + compiler + source + "01", "hex");
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - reserved bytes must be 0",
    );
  });

  test("invalid token length", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved + "ffff",
      "hex",
    );
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - token array exceeds maximum length of 128",
    );
  });

  test("invalid reserved 2", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved = "00";
    const methodLength = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved + methodLength + "0001",
      "hex",
    );
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - reserved bytes must be 0",
    );
  });

  test("script length cannot be 0", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved1 = "00";
    const reserved2 = "0000";
    const methodLength = "00";
    const data = Buffer.from(
      magic + compiler + source + reserved1 + methodLength + reserved2 + "00",
      "hex",
    );
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - script length can't be 0",
    );
  });

  test("script length exceeds max value", () => {
    const magic = "4e454633";
    const compiler = Buffer.alloc(64, 0).toString("hex");
    const source = "00";
    const reserved1 = "00";
    const reserved2 = "0000";
    const methodLength = "00";
    const data = Buffer.from(
      magic +
        compiler +
        source +
        reserved1 +
        methodLength +
        reserved2 +
        "ffffffffffffffff",
      "hex",
    );
    expect(() => AEF.fromBuffer(data)).toThrow(
      "AEF deserialization failure - max script length exceeded",
    );
  });
});

describe("serialize", () => {
  test("ok", () => {
    // hexstring captured from C#, see fromBuffer test for the capture code
    const hexstring =
      "4e454633746573742d636f6d70696c657220302e31000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006676974687562000100000000000000000000000000000000000000000b746573745f6d6574686f6400000100000001403374b4fd";
    const data = Buffer.from(hexstring, "hex");
    const aef = AEF.fromBuffer(data);
    expect(aef.serialize()).toEqual(hexstring);
  });
});
