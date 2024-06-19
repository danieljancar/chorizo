export type Legal = {
  title: string;
  description: string;
  documents: LegalDocument[];
};

export type LegalDocument = {
  id: string;
  title: string;
  description: string;
  markdown?: string;
  url?: string;
  displayType: 'markdown' | 'url';
};
