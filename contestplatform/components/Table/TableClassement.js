import React from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { useState } from 'react'


/**
 * show classement.
 * @param {string} column 
 * @param {string} data 
 * @returns html code for classement 
 */
export default function Table({ columns, data }) {
  //source : https://react-table.tanstack.com/docs/quick-start
  // data hook
  const [filterInput, setFilterInput] = useState("");//to filtrer with title

  // description of the table contents
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,// for filtering
    canPreviousPage,// for pagination
    canNextPage,// for pagination
    pageOptions,
    gotoPage,// for pagination
    nextPage,// for pagination
    previousPage,// for pagination
    setPageSize,// for pagination
    state: { pageIndex, pageSize },// for pagination
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },// for pagination
    },
    useFilters,// for filtering
    useSortBy,
    usePagination // for pagination
  );


  /**
 * Update the state when input changes
 */
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("username", value); // Update the login filter. 
    setFilterInput(value);
  };

  return (
    <>
      <div className="mt-5"></div>

      {/* input  */}
      {data.length != 0 && <input className="input-title"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search by login"}
      />}
      {/* header */}
      <table  {// apply the table props
        ...getTableProps()} className="table text-center">
        <thead>
          {// Loop over the header rows
            headerGroups.map(headerGroup => (
              <tr {// Apply the header row props
                ...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    <th
                      {// Apply the header cell props
                      ...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "sort-desc"
                            : "sort-asc"
                          : ""
                      }
                    >
                      {// Render the header
                        column.render("Header")}
                    </th>
                  ))}
              </tr>
            ))}
        </thead>

        {/* contents  */}
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>

          {data.length != 0 && page.map((row, i) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                  row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{
                      // Render the cell contents
                      cell.render("Cell")}</td>;
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* pagination  */}
      {data.length != 0 && <div className="pagination">
        <div>
          {' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          {' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span></div>
        <div>        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
          <select className="option-nbPage"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[3, 5, 10, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select></div>

      </div>}

    </>
  );
}