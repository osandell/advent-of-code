const getLiteral = (packageContent) => {
  //   content = packageContent.replace(/\b0+/g, "");
  content = packageContent;
  index = 0;
  let foundLastPart = false;
  let literalLength = 0;
  debugger;
  let nrOfParts = 0;
  while (!foundLastPart) {
    if (index === 0) {
      if (content.substring(5 * nrOfParts, 5 * nrOfParts + 1) === "0") {
        foundLastPart = true;
        literalLength += 5;
        nrOfParts++;
      }
    }

    index++;
    if (index === 5) {
      literalLength += 5;
      nrOfParts++;
      index = 0;
    }
  }

  content = content.substring(0, literalLength);

  let value = "";
  for (let i = 0; i < nrOfParts; i++) {
    let part = content.substring(i * 5, 5 + i * 5);
    part = part.substring(1);
    value += part;
  }
  value = parseInt(value, 2);

  return { literal: value, length: literalLength };
};

let input = `4057231006FF2D2E1AD8025275E4EB45A9ED518E5F1AB4363C60084953FB09E008725772E8ECAC312F0C18025400D34F732333DCC8FCEDF7CFE504802B4B00426E1A129B86846441840193007E3041483E4008541F8490D4C01A89B0DE17280472FE937C8E6ECD2F0D63B0379AC72FF8CBC9CC01F4CCBE49777098D4169DE4BF2869DE6DACC015F005C401989D0423F0002111723AC289DED3E64401004B084F074BBECE829803D3A0D3AD51BD001D586B2BEAFFE0F1CC80267F005E54D254C272950F00119264DA7E9A3E9FE6BB2C564F5376A49625534C01B0004222B41D8A80008446A8990880010A83518A12B01A48C0639A0178060059801C404F990128AE007801002803AB1801A0030A280184026AA8014C01C9B005CE0011AB00304800694BE2612E00A45C97CC3C7C4020A600433253F696A7E74B54DE46F395EC5E2009C9FF91689D6F3005AC0119AF4698E4E2713B2609C7E92F57D2CB1CE0600063925CFE736DE04625CC6A2B71050055793B4679F08CA725CDCA1F4792CCB566494D8F4C69808010494499E469C289BA7B9E2720152EC0130004320FC1D8420008647E8230726FDFED6E6A401564EBA6002FD3417350D7C28400C8C8600A5003EB22413BED673AB8EC95ED0CE5D480285C00372755E11CCFB164920070B40118DB1AE5901C0199DCD8D616CFA89009BF600880021304E0EC52100623A4648AB33EB51BCC017C0040E490A490A532F86016CA064E2B4939CEABC99F9009632FDE3AE00660200D4398CD120401F8C70DE2DB004A9296C662750663EC89C1006AF34B9A00BCFDBB4BBFCB5FBFF98980273B5BD37FCC4DF00354100762EC258C6000854158750A2072001F9338AC05A1E800535230DDE318597E61567D88C013A00C2A63D5843D80A958FBBBF5F46F2947F952D7003E5E1AC4A854400404A069802B25618E008667B7BAFEF24A9DD024F72DBAAFCB312002A9336C20CE84`;
input = `9C0141080250320F1802104A08`;

input = input.split("");
let binary = "";
input.forEach((val) => {
  let num = parseInt(val, 16);
  let binVal = (num >>> 0).toString(2);
  let zeros = "";
  for (let i = 0; i < 4 - binVal.length; i++) {
    zeros += "0";
  }
  binVal = zeros + binVal;
  binary += binVal;
});

debugger;
let parsedEveryhing = false;
let totalVersions = 0;
const packets = [];
let packetTypeId;
while (!parsedEveryhing) {
  let packetVer = binary.substring(0, 3);
  packetVer = parseInt(packetVer, 2);
  packetTypeId = binary.substring(3, 6);
  packetTypeId = parseInt(packetTypeId, 2);

  totalVersions += packetVer;

  if (packetTypeId === 4) {
    console.log("literal packet");
    let result = getLiteral(binary.substring(6));

    let value = packets[packets.length - 1].value;
    let type = packets[packets.length - 1].packetTypeId;
    switch (type) {
      case 0:
        console.log("case 0");
        packets[packets.length - 1].value += result.literal;
        break;
      case 1:
        console.log("case 1");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          packets[packets.length - 1].value *= result.literal;
        }
        break;
      case 2:
        console.log("case 2");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          if (result.literal < value) {
            packets[packets.length - 1].value = result.literal;
          }
        }
        break;
      case 3:
        console.log("case 3");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          if (result.literal > value) {
            packets[packets.length - 1].value = result.literal;
          }
        }
        break;
      case 5:
        console.log("case 5");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          if (result.literal < value) {
            packets[packets.length - 1].value = 1;
          } else {
            packets[packets.length - 1].value = 0;
          }
        }
        break;
      case 6:
        console.log("case 6");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          if (result.literal > value) {
            packets[packets.length - 1].value = 1;
          } else {
            packets[packets.length - 1].value = 0;
          }
        }
        break;
      case 7:
        console.log("case 7");
        if (value === 0) {
          packets[packets.length - 1].value = result.literal;
        } else {
          if (result.literal === value) {
            packets[packets.length - 1].value = 1;
          } else {
            packets[packets.length - 1].value = 0;
          }
        }
        break;
      default:
        console.log("other");
        break;
    }
    binary = binary.substring(6 + result.length);

    // Adjust the counter if it's larger than 0
    if (packets[packets.length - 1].counter > 0) {
      if (packets[packets.length - 1].type === "nr") {
        packets[packets.length - 1].counter =
          packets[packets.length - 1].counter - 1;
      }

      packets.forEach((p, index) => {
        if (p.type === "length") {
          packets[index].counter = packets[index].counter - (6 + result.length);
        }
      });
    }

    let foundFinishedSubpack = true;
    while (foundFinishedSubpack && packets.length > 0) {
      foundFinishedSubpack = false;

      if (packets[packets.length - 1].counter === 0) {
        foundFinishedSubpack = true;
        childResultValue = packets[packets.length - 1].value;
        let childCounterType = packets[packets.length - 1].type;
        packets.pop();

        if (packets.length > 0) {
          // Adjust the counter if it's larger than 0
          if (packets[packets.length - 1].counter > 0) {
            if (packets[packets.length - 1].type === "nr") {
              packets[packets.length - 1].counter =
                packets[packets.length - 1].counter - 1;
            }
          }

          packets.forEach((p, index) => {
            if (p.type === "length") {
              if (childCounterType === "length") {
                packets[index].counter = packets[index].counter - 22;
              } else if (childCounterType === "nr") {
                packets[index].counter = packets[index].counter - 18;
              }
            }
          });

          let value = packets[packets.length - 1].value;
          let type = packets[packets.length - 1].packetTypeId;
          switch (type) {
            case 0:
              console.log("case 0");
              packets[packets.length - 1].value += childResultValue;
              break;
            case 1:
              console.log("case 1");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                packets[packets.length - 1].value *= childResultValue;
              }
              break;
            case 2:
              console.log("case 2");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                if (childResultValue < value) {
                  packets[packets.length - 1].value = childResultValue;
                }
              }
              break;
            case 3:
              console.log("case 3");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                if (childResultValue > value) {
                  packets[packets.length - 1].value = childResultValue;
                }
              }
              break;
            case 5:
              console.log("case 5");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                if (childResultValue < value) {
                  packets[packets.length - 1].value = 1;
                } else {
                  packets[packets.length - 1].value = 0;
                }
              }
              break;
            case 6:
              console.log("case 6");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                if (childResultValue > value) {
                  packets[packets.length - 1].value = 1;
                } else {
                  packets[packets.length - 1].value = 0;
                }
              }
              break;
            case 7:
              console.log("case 7");
              if (value === 0) {
                packets[packets.length - 1].value = childResultValue;
              } else {
                if (childResultValue === value) {
                  packets[packets.length - 1].value = 1;
                } else {
                  packets[packets.length - 1].value = 0;
                }
              }
              break;
            default:
              console.log("other");
              break;
          }
        } else {
          parsedEveryhing = true;
          console.log(`childResultValue`, childResultValue);
        }
      }
    }

    // if (!binary.includes("1")) {
    //   parsedEveryhing = true;
    //   console.log(
    //     `packets[packets.length-1].value`,
    //     packets[packets.length - 1].value
    //   );
    //   console.log(`packets`, packets);
    // }
  } else {
    console.log("operation packet");

    let lengthType = binary.substring(6, 7);
    if (lengthType === "0") {
      console.log("type 0");
      packets.push({
        type: "length",
        counter: parseInt(binary.substring(7, 22), 2),
        packetTypeId: packetTypeId,
        value: 0,
      });

      binary = binary.substring(22);
    } else if (lengthType === "1") {
      console.log("type 1");
      packets.push({
        type: "nr",
        counter: parseInt(binary.substring(7, 18), 2),
        packetTypeId: packetTypeId,
        value: 0,
      });
      binary = binary.substring(18);
    }
  }
}
