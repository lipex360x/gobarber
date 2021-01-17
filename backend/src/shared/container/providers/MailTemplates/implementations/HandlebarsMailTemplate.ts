import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplates, { ParserProps } from '../interfaces/IMailTemplates'

export default class HandlebarsMailTemplate implements IMailTemplates {
  async parser ({ file, variables }:ParserProps): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFile)

    return parseTemplate(variables)
  }
}
