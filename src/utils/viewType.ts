export default function viewType(view: string) {
  switch (view) {
    case 'mobile':
      return 'Mobile'
    case 'desktop':
      return 'Desktop'
    case 'responsive':
      return 'Desktop & Mobile'
    default:
      return 'Desktop & Mobile'
  }
}
