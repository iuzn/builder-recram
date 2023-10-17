export const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
export const textTypes = [
  'Paragraph',
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6'
]
export default function tagToTextType(tag: string) {
  return textTypes[tags.indexOf(tag)]
}
