import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (buffer: Buffer) => {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
};