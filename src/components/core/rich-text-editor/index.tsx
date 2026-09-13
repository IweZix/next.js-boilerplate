'use client';

import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';
import { LuFileCode2 } from 'react-icons/lu';
import {
  Control,
  createBooleanControl,
  RichTextEditor as RichTextEditorPrimitive,
} from '@/components/ui/rich-text-editor';

const CodeBlockControl = createBooleanControl({
  label: 'Code block',
  icon: LuFileCode2,
  command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  getVariant: (editor) => (editor.isActive('codeBlock') ? 'subtle' : 'ghost'),
});

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return null;

  return (
    <RichTextEditorPrimitive.Root editor={editor}>
      <RichTextEditorPrimitive.Toolbar>
        <RichTextEditorPrimitive.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditorPrimitive.ControlGroup>
        <RichTextEditorPrimitive.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditorPrimitive.ControlGroup>
        <RichTextEditorPrimitive.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditorPrimitive.ControlGroup>
        <RichTextEditorPrimitive.ControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignRight />
          <Control.AlignJustify />
        </RichTextEditorPrimitive.ControlGroup>
        <RichTextEditorPrimitive.ControlGroup>
          <Control.Link />
          <Control.Unlink />
        </RichTextEditorPrimitive.ControlGroup>
        <RichTextEditorPrimitive.ControlGroup>
          <CodeBlockControl />
        </RichTextEditorPrimitive.ControlGroup>
      </RichTextEditorPrimitive.Toolbar>
      <RichTextEditorPrimitive.Content />
    </RichTextEditorPrimitive.Root>
  );
}
