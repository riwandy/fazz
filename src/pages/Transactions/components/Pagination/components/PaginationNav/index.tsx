import React from 'react'
import { generatePaginationNavArray } from '../../utils'
import './style.css'

type PageNavButtonProps = {
  pageNumber: number | null
  title?: string
}

const PageNavButtonRenderer = (
  selectedPage: number, 
  setSelectedPage: (page: number) => void
) => ({
  pageNumber,
  title,
}: PageNavButtonProps) => {
  if (pageNumber === null) {
    return (<div className='page-button'>...</div>)
  }
  
  return (
    <div
      key={pageNumber}
      className={'page-button'}
      id={selectedPage === pageNumber && !title ? 'page-button-active' : ''}
      onClick={() => setSelectedPage(pageNumber)}
    >
      {title ? title : pageNumber}
    </div>
  )
}


type PaginationNavProps = {
  numberOfPage: number
  selectedPage: number
  setSelectedPage: (pageNumber: number) => void
}

const PaginationNav: React.FC<PaginationNavProps> = ({
  numberOfPage,
  selectedPage,
  setSelectedPage
}) => {
  const PageNavButton = PageNavButtonRenderer(selectedPage, setSelectedPage);

  const renderPrefixButtons = () => {
    return numberOfPage > 5 && (
      <>
        <PageNavButton pageNumber={1} title={'<<'} />
        <PageNavButton pageNumber={Math.max(selectedPage - 1, 1)} title={'<'} />
      </>
    )
  }

  const renderSuffixButtons = () => {
    return numberOfPage > 5 && (
      <>
        <PageNavButton pageNumber={Math.min(selectedPage + 1, numberOfPage)} title={'>'} />
        <PageNavButton pageNumber={numberOfPage} title={'>>'} />
      </>
    )
  }

  const renderNumberedButtons = () => {
    return generatePaginationNavArray(selectedPage, numberOfPage, 2).map((pageNumber) => (
      <PageNavButton pageNumber={pageNumber} />
    ))
  }

  return (
    <div id='pagination-nav'>
      {renderPrefixButtons()}
      {renderNumberedButtons()}
      {renderSuffixButtons()}
    </div>
  )
}

export default PaginationNav