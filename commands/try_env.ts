import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class TryEnv extends BaseCommand {
  static commandName = 'try:env'

  static description = 'Boots the application to ensure the environment is setup correctly'

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    this.logger.info('Env is correctly setup')
  }
}
