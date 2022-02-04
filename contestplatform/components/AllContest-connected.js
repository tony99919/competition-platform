import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react'

import Table from "./Table/Table";

/**
 * show all info for all contest for user connected.
 * @param {object} session
 * @returns html code for all contest
 */
export default function loadContest({ session }) {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [data, setDataContest] = useState([])
  const [isAdmHook, setIsAdmHook] = useState(false)
  const isAdmin = false
  const isInContest = []
  const nbPlayer = []
  const firstTime = 0


  /**
   * useEffect method for loading profile, retrive other user's info too and save session.
   */
  useEffect(() => {
    if (firstTime == 0) {
      getProfile()
      isAdmin = isAdmHook
      isIn()
      firstTime = 1;
    }
  }, [session])

  /**
   * retrieves the profile.
   */
  async function getProfile() {
    try {
      if (session.user.id == null) {
        isAdmin = false
        return
      }
      let { data, error } = await mylib.isAdmin(session.user.id)
      if (error) {
        throw error
      }
      if (data.length != 0) {
        isAdmin = data.isAdmin
        setIsAdmHook(data.isAdmin)
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * retriveves number of player in contest
   * @param {int} id contest 
   */
  async function count(id) {
    try {
      const { count } = await mylib.getNbPlayer(id)
      if (count == null) {
        throw error
      }
      nbPlayer.push({ id: id, nb: count });
    } catch (error) {
      console.log("count==null")
    } finally {
    }
  }

  /**
 * retriveves number of player in contest
 * @param {int} id contest 
 */
  async function isIn() {
    if (firstTime == 0) {
      getProfile()
      try {
        let { data: contest, error1 } = await mylib.getIdContest()
        if (error1) {
          throw error1
        }
        contest.map((user) => (
          count(user.id)

        ));
        let { data: profiles_contest, error } =
          await mylib.getProfileContestByUserID(session.user.id)

        if (error) {
          throw error
        }
        isInContest = profiles_contest;
        getProfile()
        loadAllData()
      } catch (error) {
      } finally {

      }
    }
  }



  // Custom component to render category 
  const Category = ({ values }) => {
    return (
      <>
        {values.map((category, idx) => {
          return (
            <span key={idx}>
              {category.name}
            </span>
          );
        })}
      </>
    );
  };

  // Custom component to render status, if it is open or close 
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


  // Custom component to render number of participant 
  const Participant = ({ values }) => {
    const nb = 0;

    if (values.original.id != undefined) {
      nbPlayer.forEach(element => {
        if (element.id == values.original.id) {
          nb = element.nb
          return;
        }
      }
      );
      if (isInContest.some(cred => cred.fk_contest === values.original.id)) {

        return (
          <span className="InContest"> {nb} - IN
          </span>
        );
      }
      return (
        <span >
          {nb}
        </span>
      );
    }
    return (
      <span >
        -
      </span>
    );
  };


  // show title of the competition and add a link to target it
  const Title = ({ values }) => {
    if (isAdmin) {
      return (
        <Link href={{ pathname: "/contest-ADM", query: { id: values.original.id } }}>{values.values.title}</Link>
      );
    }
    return (
      <Link href={{ pathname: "/contest", query: { id: values.original.id } }}>{values.values.title}</Link>
    );
  };

  // descrition of the column, useMemo for memorize variable
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
      },
      {
        Header: "Participants",
        accessor: "participants",
        Cell: ({ cell: { row } }) => <Participant values={row} />
      }
    ],
    []
  );

  // change mode for admin to have standard method
  function changeMode() {
    console.log(isAdmHook);
    console.log(isAdmin);
    if (isAdmin) {
      isAdmin = false;
    } else {
      isAdmin = true;
    }
    loadAllData();
  }

  /**
   * load all dat for all contest
   */
  async function loadAllData() {
    try {

      let { data: contest, error } = await mylib.getInfoContest()
      setDataContest(contest)
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
  return (
    <div className="row flex flex-center">
      <div className="">
        <h1 className="header">Contest Page</h1>
        {
          isAdmHook && <div className="text-right">
            <Link href="/addContest">
              <button
              > Add contest
              </button>
            </Link>
          </div>
        }

        <div className="text-sm">
          {/* show table */}
          <Table columns={columns} data={data} />
          {data.length == 0 && <p>No competition yet... come back later. </p>}
        </div>
        {/* show switch if admin */}
        {
          isAdmHook && <div className=" mt-5 align-middle text-right text-sm">
            <span>Modification/delete mode </span>
            <label class="switch">
              <input type="checkbox"
                checked="true"
                onChange={changeMode} />
              <span class="slider round"></span>
            </label>
          </div>}

      </div>
    </div>
  )
}
