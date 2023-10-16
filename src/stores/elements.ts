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
    updatePage(page: Page) {
      const pageIndex = this.pages.findIndex((p) => p.name === page.name)
      if (pageIndex > -1) {
        this.pages[pageIndex] = page
      }
    },
    removePage(name: string) {
      this.pages = this.pages.filter((page) => page.name !== name)
      this.currentPage = this.pages[0] || null
    },
    setCurrentPage(name: string) {
      const pageIndex = this.pages.findIndex((page) => page.name === name)
      if (pageIndex > -1) {
        this.currentPage = this.pages[pageIndex]
        this.canvasElements = this.currentPage.elements || []
      } else {
        this.currentPage = null
      }
    },
    addElementToCanvas(element: Element) {
      const newElement = { ...element, id: uuidv4() }
      this.canvasElements.push(newElement)
      // Update currentPage's elements after adding new element
      if (this.currentPage) {
        this.currentPage.elements = [...this.canvasElements]
        this.updatePage(this.currentPage) // Add this line
      }
    },
    selectElement(element: Element | null) {
      this.selectedElement = element
      console.log('Store selectedElement:', this.selectedElement)
    },
    reorderElements({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
      // Check if there is a currentPage
      if (this.currentPage) {
        // Perform the swap in canvasElements
        const temp = this.canvasElements[oldIndex]
        this.canvasElements[oldIndex] = this.canvasElements[newIndex]
        this.canvasElements[newIndex] = temp
        // Now update the currentPage's elements to reflect canvasElements
        this.currentPage.elements = [...this.canvasElements]
      }
    }
  }
})
export type { Element, Page }
