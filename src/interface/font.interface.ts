export interface GoogleFontsResponseI {
  kind: string;
  items: Item[];
}

interface Item {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Files;
  category: string;
  kind: string;
  menu: string;
}

interface Files {
  '100'?: string;
  '300'?: string;
  '500'?: string;
  '700'?: string;
  '900'?: string;
  '100italic'?: string;
  '300italic'?: string;
  regular?: string;
  italic?: string;
  '500italic'?: string;
  '700italic'?: string;
  '900italic'?: string;
  '600'?: string;
  '800'?: string;
  '600italic'?: string;
  '800italic'?: string;
  '200'?: string;
  '200italic'?: string;
}
