import { Client } from "@notionhq/client";
import { Project } from "../types";
import {
  extractTitle,
  extractRichText,
  extractCheckbox,
  extractFileUrl,
  extractSelect,
  extractMultiSelect,
  extractUrl,
  mapCategory,
  parseHighlights,
  isValidUrl,
} from "./notion-validator";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getNotionData() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATASOURCE_ID!,
    });

    console.log(`✓ Notion: ${response.results.length} projetos recuperados`);
    return response.results;
  } catch (error) {
    console.error("✗ Erro ao buscar dados do Notion:", error);
    throw error;
  }
}

export async function getProjects(): Promise<Project[]> {
  const results = await getNotionData();

  const projects: Project[] = [];

  for (const result of results) {
    // Verifica se é uma página completa ou data source
    if (
      !("object" in result) ||
      (result.object !== "page" && result.object !== "data_source")
    ) {
      console.warn("⚠ Item ignorado: tipo inválido");
      continue;
    }

    // Type guard para garantir que temos properties
    if (!("properties" in result)) {
      console.warn("⚠ Item ignorado: sem properties");
      continue;
    }

    const props = result.properties;

    // Validação de propriedades obrigatórias
    if (!props.Name) {
      console.warn("⚠ Item ignorado: sem propriedade 'Name'");
      continue;
    }

    // Extração de dados com validação
    const name = extractTitle(props.Name);
    const description = props["Descrição"]
      ? extractRichText(props["Descrição"])
      : "";
    const highlight = props.Destaque ? extractCheckbox(props.Destaque) : false;
    const image = props.Thumbnail ? extractFileUrl(props.Thumbnail) : undefined;
    const categoryRaw = props.Categoria
      ? extractSelect(props.Categoria)
      : null;
    const technologies = props.Tecnologias
      ? extractMultiSelect(props.Tecnologias)
      : [];
    const detailsText = props.Detalhes
      ? extractRichText(props.Detalhes)
      : "";
    const highlights = parseHighlights(detailsText);
    const githubUrl = props.GitHub ? extractUrl(props.GitHub) : undefined;
    const demoUrl = props.Demo ? extractUrl(props.Demo) : undefined;

    // Validação de categoria
    const category = categoryRaw
      ? mapCategory(categoryRaw) || "fullstack"
      : "fullstack";

    if (categoryRaw && !mapCategory(categoryRaw)) {
      console.warn(
        `⚠ Categoria inválida "${categoryRaw}" para projeto "${name}". Usando "fullstack" como padrão.`,
      );
    }

    // Validação de URLs
    if (githubUrl && !isValidUrl(githubUrl)) {
      console.warn(
        `⚠ URL do GitHub inválida para projeto "${name}":`,
        githubUrl,
      );
    }

    if (demoUrl && !isValidUrl(demoUrl)) {
      console.warn(`⚠ URL de demo inválida para projeto "${name}":`, demoUrl);
    }

    // Construir projeto
    const project: Project = {
      id: result.id,
      name,
      description,
      highlight,
      image,
      category,
      technologies,
      highlights,
      githubUrl: githubUrl && isValidUrl(githubUrl) ? githubUrl : undefined,
      demoUrl: demoUrl && isValidUrl(demoUrl) ? demoUrl : undefined,
    };

    projects.push(project);
    console.log(`  ✓ Projeto processado: ${name} (${category})`);
  }

  console.log(`✓ Total: ${projects.length} projetos válidos processados`);
  return projects;
}
