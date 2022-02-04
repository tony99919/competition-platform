import { useState, useEffect, useMemo } from 'react'
import TableRankingGeneral from "./Table/TableClassement";

/**
 * componant for general ranking
 * @returns html code for clasement
 */
export default function getRanking() {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  const [data, setData] = useState([])
  // data hook

  /**
 * useEffect method for loading data ranking
 */
  useEffect(() => {
    getDataRanking()
  }, [])


  /**
   * get all data ranking
   */
  async function getDataRanking() {
    try {
      let { data, error } = await mylib.getDataRanking()
      console.log(data);
      data.sort((a, b) => (a.pointGeneral < b.pointGeneral) ? 1 : -1)
      setData(data)
      if (error) {
        throw error
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }

  /**
   * show number for classemnt
   * @param {*} values 
   * @returns place number
   */
  const Number = ({ values }) => {
    return (
      <>{values.index + 1}</>
    );
  };

  /**
   * show username or unknown
   * @param {*} values 
   * @returns username or unknown
   */
  const Username = ({ values }) => {
    return (
      <>{values.original.username != null ? values.original.username : "Unknown"}</>
    );
  };

  /**
   * 
   * Save columns of the tabel.
   * 
   * useMemo Returns a memoized value (storing the results of expensive 
  * function calls and returning the cached result)
   */
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number",
        Cell: ({ cell: { row } }) => <Number values={row} />
      },
      {
        Header: "Login",
        accessor: 'username',
        Cell: ({ cell: { row } }) => <Username values={row} />
      },
      {
        Header: "Point",
        accessor: "pointGeneral"
      }
    ],
    []
  );

  return (

    <div className="row flex flex-center">
      <h1 className="header mb-2">General ranking </h1>
      <p>Calculation method:</p>
      <p>A first place in a competition earns 15 points, a second 10 and a third 5 points. 
        All other places do not earn any points. This general ranking groups all the points earned in total.</p>
      {data.length != 0 && <TableRankingGeneral columns={columns} data={data} />}

      {data.length == 0 && <p>No submission by participants yet </p>}
    </div>
  )
}
