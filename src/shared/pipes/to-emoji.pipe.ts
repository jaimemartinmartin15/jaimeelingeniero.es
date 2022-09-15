import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toEmoji',
})
export class ToEmojiPipe implements PipeTransform {
  private readonly emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

  /**
   * Converts a number to emoji string. It does not convert the sign
   *
   * Examples:
   *  # 12 -> 1️⃣2️⃣
   *  # -36 -> 3️⃣6️⃣
   *
   * @param value to convert to emoji
   * @returns the emoji number
   */
  public transform(value: number): unknown {
    return [`${Math.abs(value)}`].map((c) => this.emojis[+c]).join('');
  }
}
