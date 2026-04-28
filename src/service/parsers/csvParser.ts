import { createParticipantList, type Participant } from "../../domain/participant";

export const csvParticipantParser = {
  parse(content: string): Participant[] {
    const lines = content.trim().split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length === 0) return [];

    const firstLine = lines[0].toLowerCase();
    const hasHeader = firstLine.includes("名前") || firstLine.includes("name") || 
                      firstLine.includes("タイトル") || firstLine.includes("title");
    
    const dataLines = hasHeader ? lines.slice(1) : lines;

    const items = dataLines.map(line => {
      const parts = line.split(/[,\t]/).map(s => s.trim());
      return {
        name: parts[0] || "",
        title: parts[1] || ""
      };
    });

    return createParticipantList(items);
  }
};
