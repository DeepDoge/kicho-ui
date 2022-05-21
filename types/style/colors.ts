import type { LiteralUnion } from "../util"

/* export enum Colors {
    Master = 'master',
    MasterContrast = 'master-contrast',

    Slave = 'slave',
    SlaveContrast = 'slave-contrast',

    Error = 'error',
    ErrorContrast = 'error-contrast',

    Mode = 'mode',
    ModeContrast = 'mode-contrast',

    Gradient = 'gradient',
    GradientContrast = 'gradient-contrast',

    Dark = 'dark',
    DarkContrast = 'dark-contrast',

    Light = 'light',
    LightContrast = 'light-contrast',
} */
export type Colors =
    LiteralUnion<
        'master' |
        'master-contrast' |

        'slave' |
        'slave-contrast' |

        'error' |
        'error-contrast' |

        'mode' |
        'mode-contrast' |

        'gradient' |
        'gradient-contrast' |

        'dark' |
        'dark-contrast' |

        'light' |
        'light-contrast'
    >