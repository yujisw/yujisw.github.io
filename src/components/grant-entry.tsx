import { ArrowUpRight } from "lucide-react";
import { Grant } from "@/data/grant";

export function GrantEntry({ grant }: { grant: Grant }) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col flex-1">
        <p className="text-xs text-zinc-500 mb-2">{grant.date}</p>
        <h3 className="font-serif text-md mb-3">
          {grant.link ? (
            <a
              href={grant.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 hover:text-zinc-600 transition-colors duration-300"
            >
              {grant.title}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </a>
          ) : (
            grant.title
          )}
        </h3>
        <p className="text-sm text-zinc-600">{grant.description}</p>
      </div>
    </div>
  );
}
