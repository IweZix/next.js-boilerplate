'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/core/rich-text-editor';

export default function About() {
  const [html, setHtml] = useState('<p>Edit here...</p>');
  return (
    <div>
      <h1 className="text-3xl font-bold underline">about</h1>
      <RichTextEditor
        value={html}
        onChange={setHtml}
        placeholder="Écris quelque chose..."
      />
    </div>
  );
}
