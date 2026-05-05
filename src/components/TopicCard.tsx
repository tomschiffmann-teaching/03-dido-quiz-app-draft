"use client";

import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Container,
  GitBranch,
  HelpCircle,
  LucideIcon,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Topic } from "@/types/quiz";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const topicIcons: Record<string, LucideIcon> = {
  git: GitBranch,
  "github-actions": Workflow,
  terraform: Boxes,
  docker: Container,
};

export default function TopicCard({ topic }: { topic: Topic }) {
  const { t } = useLanguage();

  const descriptionKey =
    `topic.${topic.id}.description` as TranslationKey;
  const description = (t[descriptionKey] as string) || topic.description;
  const Icon = topicIcons[topic.id] ?? Sparkles;

  return (
    <Link
      href={`/quiz/${topic.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-300"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mb-2 flex items-center justify-between text-xl font-semibold text-gray-900 group-hover:text-blue-600">
        {topic.name}
        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
      </h2>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
        <HelpCircle className="h-3.5 w-3.5" />
        {t.questionsCount(topic.questions.length)}
      </p>
    </Link>
  );
}
