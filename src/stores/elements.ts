import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface Element {
  id: string
  type: string
  icon: string
  defaultProperties: Record<string, any>
}
interface Page {
  name: string
  elements: Element[] | null
}
export const useElementsStore = defineStore('elements', {
  state: () => ({
    pages: [
      {
        name: 'Page 1',
        elements: null
      }
    ] as Page[],
    currentPage: null as Page | null,
    sidebarElements: [
      {
        type: 'Text',
        icon: 'text',
        defaultProperties: { text: '', placeholder: 'Text Here', fontSize: '14px' }
      },
      {
        type: 'Button',
        icon: 'button',
        defaultProperties: {
          text: 'Button',
          fontSize: '16px',
          backgroundColor: '#008AFF',
          color: '#fff'
        }
      },
      {
        type: 'Input',
        icon: 'input',
        defaultProperties: { text: 'Input', fontSize: '16px' }
      },
      {
        type: 'Block',
        icon: 'block',
        defaultProperties: { text: 'Default Block', fontSize: '16px' }
      }
    ],
    canvasElements: [] as Element[],
    selectedElement: null as Element | null
    // currentPageImgData: null as string | null
  }),
  actions: {
    addPage(name: string) {
      const newPage = { name, elements: [] }
      this.pages.push(newPage)
      this.currentPage = newPage
    },
    removePage(name: string) {
      this.pages = this.pages.filter((page) => page.name !== name)
      this.currentPage = this.pages[0] || null
    },
    setCurrentPage(name: string) {
      this.currentPage = this.pages.find((page) => page.name === name) || null
    },
    addElementToCanvas(element: Element) {
      const newElement = { ...element, id: uuidv4() }
      this.canvasElements.push(newElement)
    },
    selectElement(element: Element | null) {
      this.selectedElement = element
      console.log('Store selectedElement:', this.selectedElement)
    }
  }
})
export type { Element, Page }
