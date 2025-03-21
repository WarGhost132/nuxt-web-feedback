export interface FeedbackPreview {
  id: number,
  date: string,
  address: string,
  platform: string,
  rate: number,
  name: string,
  images: string[] | undefined,
  text: string,
  answers_quantity: number | null,
  tags: string[] | null 
}
