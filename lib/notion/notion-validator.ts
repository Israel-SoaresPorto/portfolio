import type {
  PageObjectResponse,
  DataSourceObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ProjectCategory } from "../types";

type NotionProperties =
  | PageObjectResponse["properties"]
  | DataSourceObjectResponse["properties"];
type PropertyValue = NotionProperties[string];

/**
 * Extrai texto de uma propriedade title do Notion
 */
export function extractTitle(property: PropertyValue): string {
  if (property.type !== "title") {
    console.warn("Expected title property, got:", property.type);
    return "Untitled";
  }

  if (!Array.isArray(property.title) || property.title.length === 0) {
    return "Untitled";
  }

  const firstTitle = property.title[0];
  if (!firstTitle || !("plain_text" in firstTitle) || !firstTitle.plain_text) {
    return "Untitled";
  }

  return firstTitle.plain_text.trim();
}

/**
 * Extrai texto de uma propriedade rich_text do Notion
 */
export function extractRichText(property: PropertyValue): string {
  if (property.type !== "rich_text") {
    console.warn("Expected rich_text property, got:", property.type);
    return "";
  }

  if (!Array.isArray(property.rich_text) || property.rich_text.length === 0) {
    return "";
  }

  const firstText = property.rich_text[0];
  if (!firstText || !("plain_text" in firstText) || !firstText.plain_text) {
    return "";
  }

  return firstText.plain_text.trim();
}

/**
 * Extrai valor booleano de uma propriedade checkbox do Notion
 */
export function extractCheckbox(property: PropertyValue): boolean {
  if (property.type !== "checkbox") {
    console.warn("Expected checkbox property, got:", property.type);
    return false;
  }

  return typeof property.checkbox === "boolean" ? property.checkbox : false;
}

/**
 * Extrai URL de uma propriedade files do Notion (primeira imagem)
 */
export function extractFileUrl(property: PropertyValue): string | undefined {
  if (property.type !== "files") {
    console.warn("Expected files property, got:", property.type);
    return undefined;
  }

  if (!Array.isArray(property.files) || property.files.length === 0) {
    return undefined;
  }

  const firstFile = property.files[0];
  if (!firstFile) {
    return undefined;
  }

  if (firstFile.type === "external") {
    return firstFile.external.url;
  }

  if (firstFile.type === "file") {
    return firstFile.file.url;
  }

  return undefined;
}

/**
 * Extrai nome de uma propriedade select do Notion
 */
export function extractSelect(property: PropertyValue): string | null {
  if (property.type !== "select") {
    console.warn("Expected select property, got:", property.type);
    return null;
  }

  if (
    !property.select ||
    typeof property.select !== "object" ||
    !("name" in property.select)
  ) {
    return null;
  }

  return property.select.name;
}

/**
 * Extrai array de nomes de uma propriedade multi_select do Notion
 */
export function extractMultiSelect(property: PropertyValue): string[] {
  if (property.type !== "multi_select") {
    console.warn("Expected multi_select property, got:", property.type);
    return [];
  }

  if (!Array.isArray(property.multi_select)) {
    return [];
  }

  return property.multi_select.map((item: any) => item.name);
}

/**
 * Extrai URL de uma propriedade url do Notion
 */
export function extractUrl(property: PropertyValue): string | undefined {
  if (property.type !== "url") {
    console.warn("Expected url property, got:", property.type);
    return undefined;
  }

  if (typeof property.url === "string") {
    return property.url;
  }

  return undefined;
}

/**
 * Valida se uma URL tem formato válido
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida se uma categoria é válida
 */
export function isValidCategory(category: string): category is ProjectCategory {
  return ["fullstack", "infra", "automation"].includes(category);
}

/**
 * Mapeia categorias em português para códigos internos
 */
export function mapCategory(categoryLabel: string): ProjectCategory | null {
  const categoryMap: Record<string, ProjectCategory> = {
    fullstack: "fullstack",
    "Full Stack": "fullstack",
    "full stack": "fullstack",
    infra: "infra",
    Infraestrutura: "infra",
    infraestrutura: "infra",
    automation: "automation",
    Automação: "automation",
    automação: "automation",
  };

  return categoryMap[categoryLabel] || null;
}

/**
 * Processa campo de detalhes em listagem de destaques, assumindo que itens são separados por "•"
 */
export function parseHighlights(detailsText: string): string[] {
  if (!detailsText || detailsText.trim() === "") {
    return [];
  }

  return detailsText
    .split(/•/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
