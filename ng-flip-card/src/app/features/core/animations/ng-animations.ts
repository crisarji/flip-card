import { trigger, transition, animate, style, state } from '@angular/animations';

export const fadeInOutAnimation = [
  trigger('fadeInOut', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate(2000, style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate(2000, style({ opacity: 0 }))
    ])
  ])
];

export const flipStateAnimation = [
  trigger('flipState', [
    state('active', style({
      transform: 'rotateY(179deg)'
    })),
    state('inactive', style({
      transform: 'rotateY(0)'
    })),
    transition('active => inactive', animate('500ms ease-out')),
    transition('inactive => active', animate('500ms ease-in'))
  ])
];