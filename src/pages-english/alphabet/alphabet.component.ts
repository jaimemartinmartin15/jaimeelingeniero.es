import { Component } from '@angular/core';
import { Letter } from './letter';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent {
  public readonly letters: Letter[] = [
    { display: 'A', pronunciation: 'ei', radiophonic: 'Alfa' },
    { display: 'B', pronunciation: 'bii', radiophonic: 'Bravo' },
    { display: 'C', pronunciation: 'cii', radiophonic: 'Charlie' },
    { display: 'D', pronunciation: 'dii', radiophonic: 'Delta' },
    { display: 'E', pronunciation: 'ii', radiophonic: 'Echo' },
    { display: 'F', pronunciation: 'ef', radiophonic: 'Foxtrot' },
    { display: 'G', pronunciation: 'llii', radiophonic: 'Golf' },
    { display: 'H', pronunciation: 'eich', radiophonic: 'Hotel' },
    { display: 'I', pronunciation: 'ai', radiophonic: 'India' },
    { display: 'J', pronunciation: 'llei', radiophonic: 'Juliett' },
    { display: 'K', pronunciation: 'kei', radiophonic: 'Kilo' },
    { display: 'L', pronunciation: 'el', radiophonic: 'Lima' },
    { display: 'M', pronunciation: 'em', radiophonic: 'Mike' },
    { display: 'N', pronunciation: 'en', radiophonic: 'November' },
    { display: 'O', pronunciation: 'ou', radiophonic: 'Oscar' },
    { display: 'P', pronunciation: 'pii', radiophonic: 'Papa' },
    { display: 'Q', pronunciation: 'kiu', radiophonic: 'Quebec' },
    { display: 'R', pronunciation: 'arr', radiophonic: 'Romeo' },
    { display: 'S', pronunciation: 'ess', radiophonic: 'Sierra' },
    { display: 'T', pronunciation: 'tii', radiophonic: 'Tango' },
    { display: 'U', pronunciation: 'iu', radiophonic: 'Uniform' },
    { display: 'V', pronunciation: 'vii', radiophonic: 'Victor' },
    { display: 'W', pronunciation: 'dobl iu', radiophonic: 'Whiskey' },
    { display: 'X', pronunciation: 'ex', radiophonic: 'X-Ray' },
    { display: 'Y', pronunciation: 'guai', radiophonic: 'Yankee' },
    { display: 'Z', pronunciation: 'zzii', radiophonic: 'Zulu' },
  ];
}
