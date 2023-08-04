export interface Note {
  id: string;
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface RawNote {
  id: string;
  title: string;
  markdown: string;
  tagsIds: string[];
}

export interface RawNoteData {
  title: string;
  markdown: string;
  tagsIds: string[];
}

export interface Tag {
  id: string;
  label: string;
}
