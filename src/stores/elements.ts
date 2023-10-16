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
    currentPage: {
      name: 'Page 1',
      elements: null
    } as Page | null,
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
      this.setCurrentPage(name)
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
      if (this.currentPage) {
        console.log('Current Page before:', 'dasdas', this.currentPage.elements, this.currentPage)
        this.currentPage.elements = [...this.canvasElements]
        console.log('Current Page after:', this.currentPage)
      } else {
        console.log('Current Page is null')
      }
    },
    selectElement(element: Element | null) {
      this.selectedElement = element
      console.log('Store selectedElement:', this.selectedElement)
    },
    reorderElements({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
      // create a copy of the original array
      const reorderedElements = [...this.canvasElements]
      // perform the swap
      const temp = reorderedElements[oldIndex]
      reorderedElements[oldIndex] = reorderedElements[newIndex]
      reorderedElements[newIndex] = temp
      // replace the data
      this.canvasElements = reorderedElements

      // do the same for current page elements
      if (this.currentPage && this.currentPage.elements) {
        const reorderedPageElements = [...this.currentPage.elements]
        const temp = reorderedPageElements[oldIndex]
        reorderedPageElements[oldIndex] = reorderedPageElements[newIndex]
        reorderedPageElements[newIndex] = temp
        this.currentPage.elements = reorderedPageElements
      }
    }
  }
})
export type { Element, Page }
