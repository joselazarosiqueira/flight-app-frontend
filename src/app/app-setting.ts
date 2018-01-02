import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
  public static LANG = 'pt-br';

  public static setSelectedLanguage(lang: string) {
    AppSettings.LANG = lang;
  }

  public static getSelectedLanguage(): string {
    return AppSettings.LANG;
  }
}
