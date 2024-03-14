export type Legal = {
  name: string;
  description: string;
  files: LegalDocument[];
};

export type LegalDocument = {
  name: string;
  description: string;
  file: string;
};
