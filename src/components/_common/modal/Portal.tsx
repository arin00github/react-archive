"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = { children: React.ReactNode; targetId?: string };

export default function Portal({ children, targetId = "portal-root" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById(targetId) ?? document.body);
  }, [targetId]);

  if (!mounted || !container) return null; // SSR 안전 가드
  return createPortal(children, container);
}
