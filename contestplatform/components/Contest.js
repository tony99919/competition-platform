import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import TableClassement from "../components/Table/TableClassement";

/**
 * componant for show one contest
 * @returns html code for one contest
 */
export default function GetSelectedContest() {
  const Swal = require('sweetalert2')
  const mylib = require('../Mylib')
  // data hook
  const [title, setTitle] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [description, setDescription] = useState(null)
  const [crypto, setCrypto] = useState(null)
  const [price, setPrice] = useState(null)
  const [category, setCategory] = useState(null)
  const router = useRouter()
  const [id, setId] = useState(0)
  const [session, setSession] = useState(null)
  const [inContest, setInContest] = useState(false)
  const [nbIn, setNbIn] = useState(0)
  const [status, setStatus] = useState(false)
  const [data, setDataContest] = useState([])
  const [position, setPosition] = useState(null)
  const [fileDownloadUrl, setfileDownloadUrl] = useState(null)


 /**
  * useEffect method, save current session.
  */
  useEffect(() => {
    setSession(mylib.getSession())
    isIn()
    loadData(router.query.id)
  }, [session])


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
        accessor: "place"
      },
      {
        Header: "Login",
        accessor: 'login'
      },
      {
        Header: "Submit",
        accessor: "submit"
      }
    ],
    []
  );

  /**
   * load all data for the contest.
   * @param {int} idContest id of the contest in suppabase
   */
  async function loadData(idContest) {
    try {
      let { data, error } = await mylib.getConstest(idContest)
      if (error) {
        throw error
      }
      data.map((comp) => (
        setTitle(comp.title),
        setStartDate(comp.startDate),
        setEndDate(comp.endDate),
        setDescription(comp.description),
        setPrice(comp.price),
        setId(comp.id),
        setCategory(comp.category.at(0).name),
        setCrypto(comp.cryptoMonnaie.name),
        IsActive(comp.startDate, comp.endDate),
        setfileDownloadUrl(URL.createObjectURL(new Blob([JSON.stringify({
          "id": comp.id,
          "cryptoMonnaie": comp.cryptoMonnaie.name,
          "startDate": comp.startDate,
          "endDate": comp.endDate,
          "category": comp.category.at(0).name
        }, null, 4)])))
      ));

      chargerData()
    } catch (error) {
      if (title == null) {
        router.push("/")
      }
      console.log(error.message)
    } finally {
    }
  }

  /**
   * Check that the current date is between the two dates given in parameter.
   * @param {date} start 
   * @param {date} end 
   */
  async function IsActive(start, end) {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let today = `${year}${"-"}${month < 10 ? `0${month}` :
      `${month}`}${"-"}${date < 10 ? `0${date}` : `${date}`}`;
    if (start < today && today < end) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }


  /**
   * Check that the current is in the current contest.
   */
  async function isIn() {
    try {
      const user = mylib.getUserConnected()
      let { profiles_contest, error } = await mylib.getPlayerInfoContest(router.query.id, user.id)
      if (error) {
        throw error
      }
      if (profiles_contest.length == 1) {
        setInContest(true)

      } else {
        setInContest(false)
      }
      loadData(router.query.id)


      count()
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
   * count number of participent for the current contest.
   */
  async function count() {
    try {
      const { count } = await mylib.getNbPlayer(router.query.id)
      setNbIn(count)
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
   * load data for ranking
   */
  async function chargerData() {
    try {
      const user = mylib.getUserConnected()
      let { data, error } = await mylib.getPlayer(router.query.id)

      if (error) {
        throw error
      }
      data.sort((a, b) => (a.capitalGain < b.capitalGain) ? 1 : -1)
      const dataToshow = []
      const counter = 1
      data.forEach(element => {
        const d = {
          "place": counter,
          "login": element.profiles.username,
          "submit": element.submitDate,
          "capitalGain": element.capitalGain
        }
        if (element.profiles.id == user.id) {
          position = counter
        }
        counter++
        dataToshow.push(d)

      });
      setPosition(position)
      setDataContest(dataToshow)
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
   * Method to take part in one competition. use router to get the current contest id.
   */
  async function takePart() {
    try {
      const user = mylib.getUserConnected()

      const { data, error2 } = await mylib.insertPlayerInContest(router.query.id, user.id)
      if (data == null) {
        Swal.fire("Please enter a first and last name in your account")
        router.push("/signin")
        return
      }

      if (error2) {
        throw error2
      }
      Swal.fire("Everything ok! you participate in the competition.")
      setInContest(true)
      count()
    } catch (error2) {
      Swal.fire("You cannot participate twice.")
      setInContest(false),
        console.log(error2.message)
    } finally {
    }
  }

// old version for loading resultat by user

  // async function fileUploaded(resultFile) {
  //   if (resultFile != []) {
  //     if (resultFile.id != router.query.id) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: "Attention, this is not a submission for the right competition.",
  //       })
  //       return;
  //     }

  //     if (resultFile.id == undefined || resultFile.winningPercentage == undefined ||
  //       resultFile.nbrTrade == undefined || resultFile.capitalGain == undefined) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: "The format is not the right one! Cheating is not an option.",
  //       })
  //       return;
  //     }
  //     const { value: formValues } = await Swal.fire({
  //       title: 'Customize your submission',
  //       html:
  //         '<input id="title" placeholder="Title" class="swal2-input">' +
  //         '<textarea id="description" placeholder="Description" class="swal2-textarea">',
  //       focusConfirm: false,
  //       showCancelButton: true,
  //       confirmButtonText: 'Confirm',
  //       preConfirm: () => {
  //         return [
  //           document.getElementById('title').value,
  //           document.getElementById('description').value
  //         ]
  //       }
  //     })

  //     if (formValues) {
  //       const user = supabase.auth.user()
  //       const updates = {
  //         fk_profiles: user.id,
  //         fk_contest: resultFile.id,
  //         title: formValues.at(0),
  //         comment: formValues.at(1),
  //         winningPercentage: resultFile.winningPercentage,
  //         nbrTrade: resultFile.nbrTrade,
  //         capitalGain: resultFile.capitalGain,
  //         submitDate: new Date()
  //       }
  //       let { data: profiles_contest, error1 } = await supabase
  //         .from('profiles_contest')
  //         .select("fk_contest, id_pro_con")
  //         .eq('fk_profiles', user.id)

  //       const id_pro_con = 0
  //       profiles_contest.forEach(element => {
  //         if (element.fk_contest == resultFile.id) {
  //           id_pro_con = element.id_pro_con
  //         }
  //       });

  //       const { data, error } = await supabase
  //         .from('profiles_contest')
  //         .update(updates)
  //         .eq("id_pro_con", id_pro_con)
  //       if (error == null) {
  //         Swal.fire("all ok")
  //         chargerData()
  //       } else {
  //         console.log(error);
  //       }

  //     }
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: "Please select a right json file.",
  //     })
  //   }
  // }


  // function openFile(evt) {
  //   const reader = new FileReader();

  //   let fileloaded = e => {
  //     // e.target.result is the file's content as text
  //     fileUploaded(JSON.parse(e.target.result))
  //   }
  //   // Mainline of the method
  //   fileloaded = fileloaded.bind(this);
  //   reader.onload = fileloaded;
  //   reader.readAsText(evt.target.files[0]);
  // }



  // const handleFileChange = event => {
  //   if (event.target.files[0] != undefined) {
  //     if (event.target.files[0].type == "application/json") {
  //       openFile(event);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: "Please select a json file.",
  //       })
  //     }
  //   }
  // }

  return (
    <div className="row flex flex-center">
      <span>Competition from {startDate || '-'} to {endDate || '-'}</span>
      <div className="col-10 form-widget">
        <h1 className="header">Contest  {": " + title || ''}</h1>
        <div>
          <table className=" flex-center">
            <tbody>
              <tr>
                <td>ID </td>
                <td>  {' : ' + id || ''}</td>
              </tr>
              <tr>
                <td>Description </td>
                <td>  {' : ' + description || ''}</td>
              </tr>
              <tr>
                <td>Price </td>
                <td>  {' : ' + price || ''}</td>
              </tr>
              <tr>
                <td>Number
                  of participants </td>
                <td>  {' : ' + nbIn || '0'}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div>
        {status && inContest && <div className="m-3">
          <hr />

          <p>You are now participating in the competition, quickly download the data for Tars.
            Then load the result of your strategy. There is no maximum submissions, so take
            the opportunity to test your trading strategy against other competitors.</p>

          <div className="row mt-3">
            <div className="col"><label>1. Download file for Tars Bot </label>
              <button ><a className="hidden"
                download="data.json"
                href={fileDownloadUrl}
              >download file</a></button>
            </div>
            <div className="col">
              <form method="post" action="#" id="#">
                <div className="form-group files color">
                  <label>2. Upload Your Trading result with Tars</label>
                  <p>//afficher ligne de code</p>
                  {/* <input type="file" className="form-control" accept="application/json" onChange={handleFileChange} /> */}
                </div>
              </form>
            </div>
          </div>
        </div>}
        {status && !inContest && (!session ? <Link href="/signin">
          <button className="button block" href="/signin">
            Take part in the competition
          </button>
        </Link>
          : <button className="button block" onClick={takePart}>
            Take part in the competition
          </button>)}

      </div>

      <div className="m-3">
        <hr />
        {data.length != 0 && <p>Classement</p>}

        {position != null && <div className='text-right'>your ranking : {position}</div>}
        {data.length != 0 && <TableClassement columns={columns} data={data} />}


        {data.length == 0 && <p>No submission by participants yet </p>}
      </div>
    </div>
  )
}
