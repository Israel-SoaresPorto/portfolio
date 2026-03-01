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
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-0 p-0 shadow-sm dark:bg-zinc-900",
        className,
      )}
    >
      {/* Preview Image Area */}
      <div className="relative h-60 bg-muted/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Preview do projeto ${project.name}`}
            fill={true}
            sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
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

      <CardContent className="pt-4 space-y-6 flex-1 flex flex-col">
        {/* Highlights */}
        {project.highlights.length > 0 && (
          <ul className="list-disc marker:text-primary marker:text-sm pl-4 flex-1">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-muted text-xs rounded-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="gap-3 pt-2 pb-6">
        {project.githubUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              Ver no Github
            </Link>
          </Button>
        )}
        {project.demoUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mostrar ao vivo
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
