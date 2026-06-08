import { ArrowUpRight } from "lucide-react";
import { Article } from "@/data/articles";

export function ArticleEntry({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col flex-1">
        <h3 className="font-serif text-md mb-3">
          <a
            href={article.url}
            className="group inline-flex items-center gap-2 hover:text-zinc-600 transition-colors duration-300"
          >
            {article.title}
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>
        </h3>

        {article.tags && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-zinc-600 px-2 py-1 bg-zinc-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          <a
            href={article.url}
            className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
          >
            <ArrowUpRight
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
            <span className="tracking-wider uppercase">Article</span>
          </a>
        </div>
        <p className="text-sm text-zinc-600 mb-4 mt-4 italic">
          {article.description}
        </p>
      </div>
    </div>
  );
}
