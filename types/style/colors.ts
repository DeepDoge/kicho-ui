import type { LiteralUnion } from "../util"

export type Colors =
    LiteralUnion<
        'master' |
        'master-contrast' |

        'slave' |
        'slave-contrast' |

        'gradient' |
        'gradient-contrast' |

        'error' |
        'error-contrast' |

        'mode' |
        'mode-contrast' |

        'mode-pop' |
        'mode-pop-contrast' |

        'dark' |
        'dark-contrast' |

        'dark-pop' |
        'dark-pop-contrast' |

        'light' |
        'light-contrast' |

        'light-pop' |
        'light-pop-contrast'
    >