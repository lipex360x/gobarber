import IMailTemplates from '../interfaces/IMailTemplates'

export default class FakeMailTemplate implements IMailTemplates {
  async parser (): Promise<string> {
    return 'Mail Content'
  }
}
