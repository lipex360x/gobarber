interface VariablesProps {
  [key: string]: string | number
}

export interface ParserProps {
  file: string;
  variables: VariablesProps
}

export default interface IMailTemplates {
  parser(data: ParserProps): Promise<string>
}
