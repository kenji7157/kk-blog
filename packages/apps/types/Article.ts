/** 記事 */
export type Article = {
  /** 記事ID(フィールドとしては不要かも) */
  id: number
  /** タイトル */
  title: string
  /** 概要 */
  abstract: string
  /** 本文 */
  body: string
  /** カテゴリー */
  category: string[]
  /** 作成日(ISO) */
  createdDate: string
  /** 作成日のタイムスタンプ */
  createdTimestamp: {
    unix: number
    year: number
    // 0~11 表示する場合は+1する
    month: number
    day: number
  }
}
