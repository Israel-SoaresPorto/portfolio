"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "bg-background backdrop-blur-lg hover:shadow-md transition-shadow duration-300 hover:shadow-primary/50 overflow-hidden p-0",
        className,
      )}
    >
      {/* Preview Image Area */}
      <div className="relative h-44 bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Preview do projeto ${project.name}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground"></div>
        )}

        {/* Category Badge */}
        {project.highlight && (
          <Badge className="absolute top-2 right-2">Destaque</Badge>
        )}
      </div>

      {/* Card Header */}
      <CardHeader className="">
        {/* Project Name */}
        <CardTitle className="text-lg font-semibold text-foreground">
          {project.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-6 flex-1">
        {/* Highlights */}
        {project.highlights.length > 0 && (
          <ul className="space-y-2 list-disc marker:text-primary marker:text-xl pl-4">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {highlight.text}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-muted/30 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="gap-3 pt-2 pb-6">
        {project.githubUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              Github
            </a>
          </Button>
        )}
        {project.demoUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Demo
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
