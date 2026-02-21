"use client";

import { useReducer } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/project-card";
import { Project, ProjectCategory, ProjectFilter } from "@/lib/types";

const filterLabels: Record<ProjectFilter, string> = {
  highlight: "Destaques",
  fullstack: "Full Stack",
  infra: "Infraestrutura",
  automation: "Automação",
};

export interface ProjectsProps {
  projects: Project[];
}

export interface ProjectsState {
  projects: Project[];
  activeTab: ProjectFilter;
}

export interface ProjectsAction {
  type: ProjectFilter;
  payload?: ProjectCategory;
}

function createProjectsReducer(allProjects: Project[]) {
  return function projectsReducer(
    state: ProjectsState,
    action: ProjectsAction,
  ): ProjectsState {
    switch (action.type) {
      case "highlight":
        return {
          ...state,
          activeTab: "highlight",
          projects: allProjects.filter((project) => project.highlight),
        };
      case "fullstack":
      case "infra":
      case "automation":
        return {
          ...state,
          activeTab: action.type,
          projects: allProjects.filter(
            (project) => project.category === action.type,
          ),
        };
      default:
        return state;
    }
  };
}

const createInitialState = (allProjects: Project[]): ProjectsState => ({
  projects: allProjects.filter((project) => project.highlight),
  activeTab: "highlight",
});

export function Projects({ projects: allProjects }: ProjectsProps) {
  const [state, dispatch] = useReducer(
    createProjectsReducer(allProjects),
    allProjects,
    createInitialState,
  );

  return (
    <section
      className="bg-primary/5 w-full px-6 sm:px-12 lg:px-24 py-16"
      id="projetos"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary text-center">
              Projetos
            </h2>
            <p className="text-muted-foreground text-center">
              Uma seleção de soluções que desenvolvi unindo infraestrutura em
              nuvem, desenvolvimento de aplicações e automação inteligente.
            </p>
          </div>

          {/* Filter Tabs */}
          <Tabs
            value={state.activeTab}
            onValueChange={(value) =>
              dispatch({ type: value as ProjectFilter })
            }
            className="bg-background/50 rounded-md p-1"
          >
            <TabsList className="bg-transparent justify-center">
              {(Object.keys(filterLabels) as ProjectFilter[]).map((filter) => (
                <TabsTrigger
                  key={filter}
                  value={filter}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground rounded-sm px-4 py-2 text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                >
                  {filterLabels[filter]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {state.projects.length === 0 && (
          <div className="text-center py-12 h-80 flex items-center">
            <p className="text-muted-foreground flex-1">
              Nenhum projeto encontrado.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
