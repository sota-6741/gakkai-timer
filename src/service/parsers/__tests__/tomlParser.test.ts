import { describe, it, expect } from "vitest";
import { tomlParticipantParser } from "../tomlParser";

describe("tomlParticipantParser", () => {
  it("正しいTOML形式から参加者リストをパースできること", () => {
    const toml = `
[[participants]]
name = "hogehoge"
title = "fugafuga"

[[participants]]
name = "piyopiyo"
title = "bazbaz"
    `;

    const result = tomlParticipantParser.parse(toml);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("hogehoge");
    expect(result[1].name).toBe("piyopiyo");
  });

  it("TOML構文が壊れている場合はエラーを投げること", () => {
    const toml = `
[[participants]]
name = "閉じられていない
    `;

    expect(() => tomlParticipantParser.parse(toml)).toThrow(
      "TOMLの解析に失敗しました",
    );
  });
});
