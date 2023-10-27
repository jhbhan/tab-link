export interface LinkModel {
    id: string | undefined,
    title: string,
    urls: string[],
    groupOnly: boolean
}

export interface LinkGroupModel {
    id: string | undefined,
    links: string[]
}

export interface SettingModel {
    user: string
}