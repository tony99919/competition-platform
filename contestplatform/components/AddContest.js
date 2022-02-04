import { useState, useEffect } from 'react'

/**
 * componant for adding contest
 * @returns html code
 */
export default function AddContest() {
  const Swal = require('sweetalert2');
  const mylib = require('../Mylib')
  // data hook
  const [crypto_values, setCrypto_values] = useState([])
  const [category_values, setCategory_values] = useState([])
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [crypto, setCrypto] = useState("")
  const [cat, setCat] = useState("")
  const [price, setPrice] = useState("")
  const firstTime = 0

  /**
   * useEffect method for loading crypto.
   */
  useEffect(() => {
    if (firstTime == 0) {
      loadCrypto()
      firstTime = 1;
    }
  }, [])

  /**
   * load crypto from supabase and save it
   */
  async function loadCrypto() {
    try {
      let { data: cryptoMonnaie, error } = await mylib.getAllCrypto()
      if (error) {
        throw error
      }
      setCrypto_values(cryptoMonnaie);
      loadCat()
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }


  /**
  * load categories from supabase and save it
  */
  async function loadCat() {
    try {
      let { data, error } = await mylib.getAllCategory()
      setCategory_values(data);

      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
* update contest with all values
*/
  async function update() {
    if (title != "" && description != "" && price != "" && startDate != "" && endDate != "" && crypto != "" && cat != "") {
      try {
        const fk_crypto = crypto;
        const updates = {
          title,
          description,
          price,
          startDate,
          endDate,
          fk_crypto
        }
        const { data, error } = await mylib.insertContest(updates)

        const fk_category = cat;
        const fk_contest = data.at(0).id;
        updates = {
          fk_contest,
          fk_category
        }
        const { error } = await mylib.insertCategory(updates)

        if (error) {
          throw error
        }
        Swal.fire('Insered correctly.')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter all fields correctly',
      })
    }

  }


  return (
    <div className="row flex flex-center">
      <div className="">
        {/* title */}
        <h1 className="header">Add a Contest</h1>
        {/* form */}
        <form>
          <div className="form-group">
            <label >Title</label>
            <input type="text" className="form-control" placeholder="BTC_contest" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label >General information</label>
            <textarea className="form-control" rows="3" placeholder="Description of the competition" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label >Price information</label>
            <textarea value={price || ''} className="form-control" rows="2" placeholder="Price of the competition" onChange={(e) => setPrice(e.target.value)}></textarea>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label >Start date</label>
              <input type="date" className="form-control" onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col">
              <label >Ending date</label>
              <input type="date" className="form-control" onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="form-group  mt-3">
            <label >Cryptocurrency</label>
            <select className="form-control " onChange={(e) => setCrypto(e.target.value)}>
              {crypto_values.map((crypto) => (
                <option key={crypto.id} className="selectstyle" value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label >Category</label>
            <select multiple className="form-control" onChange={(e) => setCat(e.target.value)}>
              {category_values.map((cat) => (
                <option key={cat.id} className="selectstyle" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* for uploading image, not showed */}
          {false && <div className="row mt-3">
            <div className="col">
              <label >Upload competition data</label>
              <input type="file" className="form-control-file" />
            </div>
            <div className="col">
              <label >Upload image</label>
              <input type="file" className="form-control-file" />
            </div>
          </div>}
          {/* add bouton  */}
          <div>          <button type="button"
            className="button block primary mt-5"
            onClick={update}
          >Add</button></div>
        </form>

      </div>
    </div>
  )
}
