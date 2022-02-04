import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react'

import Table from "./Table/Table";

/**
 * show all info for all contest for visitor.
 * @returns html code for all contest
 */
export default function LoadContest() {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [data, setDataContest] = useState([])

  /**
 * useEffect method for loading all for all contest.
 */
  useEffect(() => {
    loadAllData()
  }, [])


  // Custom component to render categories 
  const Category = ({ values }) => {
    return (
      <>
        {values.map((category, idx) => {
          return (
            <span key={idx} className="badge">
              {category.name}
            </span>
          );
        })}
      </>
    );
  };

  // Custom component to render status 
  const Status = ({ values }) => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let today = `${year}${"-"}${month < 10 ? `0${month}` :
      `${month}`}${"-"}${date < 10 ? `0${date}` : `${date}`}`;
    if (values.values.startDate < today && values.values.endDate > today) {
      return (
        <span className="badge-open-contest">
          Active
        </span>

      );
    }
    return (
      <span className="badge-close-contest">
        Non-Active
      </span>
    );
  };



  // Custom component to render title and add link to it 
  const Title = ({ values }) => {
    return (
      <Link href={{ pathname: "/contest", query: { id: values.original.id } }}>{values.values.title}</Link>
    );
  };

  // column of the contest tab, useMemo for performance--> not calcule every render
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell: { row } }) => <Title values={row} />
      },
      {
        Header: "Status",
        accessor: 'status',
        Cell: ({ cell: { row } }) => <Status values={row} />
      },
      {
        Header: "Starting date",
        accessor: "startDate"
      },
      {
        Header: "Closing date",
        accessor: "endDate"
      },

      {
        Header: "Category",
        accessor: "category",
        Cell: ({ cell: { value } }) => <Category values={value} />
      },
      {
        Header: "Cryptocurrency",
        accessor: "cryptoMonnaie.name"
      }
    ],
    []
  );

  /**
   * load all data for all contest
   */
  async function loadAllData() {
    try {
      let { data: contest, error } = await mylib.getInfoContest()

      if (error) {
        throw error
      }
      setDataContest(contest)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
    }

  }
  return (

    <div className="row flex flex-center">
      <div className="">
        <h1 className="header">Contest Page</h1>

        <div className="text-sm">
        </div>
        <div>
          {/* show table */}
          <Table columns={columns} data={data} />
          {data.length == 0 && <p>No competition yet... come back later. </p>}
        </div>
      </div>
    </div>
  )
}
