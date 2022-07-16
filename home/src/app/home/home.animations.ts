import { animate, animation, group, query, sequence, state, style, transition, trigger, useAnimation } from "@angular/animations";

const rotation3D = animation([
    group([
        query('.figure__picture', [
            sequence([
                animate('33ms', style({ boxShadow: '0 0 18px 18px #e2e2fb' })),
                animate('65ms', style({ boxShadow: '0 0 1px 1px #e2e2fb' })),
                animate('98ms', style({ boxShadow: '0 0 20px 20px #e2e2fb' })),
                animate('98ms', style({ boxShadow: '0 0 0px 0px #e2e2fb' })),
                animate('131ms', style({ boxShadow: '0 0 22px 22px #e2e2fb' })),
                animate('163ms', style({ boxShadow: '0 0 0px 0px #e2e2fb' })),
                animate('262ms', style({ boxShadow: '0 0 20px 20px #e2e2fb' })),
                animate('290ms', style({ boxShadow: '0 0 0px 0px #e2e2fb' }))
            ])
        ]),
        query('.figure__picture__img', [
            animate('1200ms 0ms cubic-bezier(.05,.53,.83,1.02)', style({ transform: '{{ transform }}' }))
        ])
    ])
]);

export const rotateProfilePicture = trigger('rotateProfilePicture', [
    state('showLogo', style({})),
    state('showPhoto', style({})),
    transition('showLogo => showPhoto', [
        useAnimation(rotation3D, { params: { transform: 'rotateY(720deg)' } })
    ]),
    transition('showPhoto => showLogo', [
        useAnimation(rotation3D, { params: { transform: 'rotateX(720deg)' } })
    ])
])
