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
  // data hook
  const [filterInput, setFilterInput] = useState("");//to filtrer with title

  // description of the table contents
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );


  /**
 * Update the state when input changes
 */
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("title", value); // Update the show.title filter. Now the  table will filter and show only the rows which  matching value
    setFilterInput(value);
  };

  return (
    <>
      {/* input  */}
      <div className="mt-5">{data.length != 0 && <input className="input-title"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search by title"}
      />}</div>

      <table  {...getTableProps()} className="table text-center">
        <thead>
          {/* header */}
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* contents  */}
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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