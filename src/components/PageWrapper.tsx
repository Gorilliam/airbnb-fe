"use client";

import { PropsWithChildren, ReactNode } from "react";

interface PageWrapperProps extends PropsWithChildren {
  title?: string;
  actions?: ReactNode; // for buttons, links, etc.
}

export default function PageWrapper({ title, actions, children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        {(title || actions) && (
          <div className="flex items-center justify-between mb-6">
            {title && <h1 className="text-3xl font-bold text-gray-800">{title}</h1>}
            {actions && <div>{actions}</div>}
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow-sm">{children}</div>
      </div>
    </div>
  );
}
