import { createFileRoute } from "@tanstack/react-router";

import { CompactHomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({ component: CompactHomePage });
