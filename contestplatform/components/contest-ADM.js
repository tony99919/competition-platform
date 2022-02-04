import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

/**
 * compontant for editing a contest.
 * @returns html code for editing contest
 */
export default function GetSelectedContest() {
  const router = useRouter()
  const Swal = require('sweetalert2');
  const mylib = require('../Mylib')
  // data hook
  const [crypto_values, setCrypto_values] = useState([])
  const [category_values, setCategory_values] = useState([])
  const [title, setTitle] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [description, setDescription] = useState(null)
  const [crypto, setCrypto] = useState(null)
  const [cat, setCat] = useState(null)
  const [price, setPrice] = useState(null)


/**
 * useEffect method for loading data and crypto
 */
  useEffect(() => {
    loadCrypto()
    loadData(router.query.id)
  }, [])


  /**
   * load cryptomonnaie
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
   * load categories
   */
  async function loadCat() {
    try {
      let { data, error } = await mylib.getAllCategory()
      if (error) {
        throw error
      }
      setCategory_values(data);
    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
   * delete contest
   */
  async function deleteContest() {
    try {
      let { error } = await mylib.deleteContest(router.query.id)
      if (error) {
        throw error
      }

      Swal.fire('the removal of the competition went well.')
      router.push("/")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error_description || error.message,
      })
    }
  }

  /**
   * load data for one contest.
   * @param {int} id 
   */
  async function loadData(id) {
    try {
      let { data, error } = await mylib.getConstest(id)

      if (error) {
        throw error
      }
      data.map((comp) => (
        setTitle(comp.title),
        setStartDate(comp.startDate),
        setEndDate(comp.endDate),
        setDescription(comp.description),
        setPrice(comp.price),
        setCrypto(comp.cryptoMonnaie.name),
        setCat(comp.category.at(0).name)
      ));

    } catch (error) {
      console.log(error.message)
    } finally {
    }
  }

  /**
   * update constest.
   */
  async function update() {
    if (title != "" && description != "" && price != "" && startDate != ""
      && endDate != "" && crypto != "" && cat != "" ) {
      try {
        const fk_crypto = crypto;
        const id = router.query.id;
        const updates = {
          title,
          description,
          price,
          startDate,
          endDate,
          fk_crypto
        }

        const { error1 } = await mylib.updateContest(updates, id)
        if (error1) {
          throw error1
        }
        const fk_category = cat;
        const fk_contest = id;
        updates = {
          fk_contest,
          fk_category
        }
        mylib.deleteCategory(router.query.id)

        const { error } = await mylib.updateCategory(updates)

        if (error) {
          throw error
        }
        Swal.fire('Updated correctly.')
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
        <h1 className="header">Edit a Contest</h1>
        <div className='text-right'>
          <button
            className="button  secondary"
            onClick={() => deleteContest()}
          >Delete Contest
          </button>
        </div>

        <form className='mt-5'>
          <div className="form-group">
            <label >Title</label>
            <input type="text" className="form-control" placeholder="BTC_contest" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label >General information</label>
            <textarea value={description || ''} className="form-control" rows="3" placeholder="Description of the competition" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label >Price information</label>
            <textarea value={price || ''} className="form-control" rows="2" placeholder="Price of the competition" onChange={(e) => setPrice(e.target.value)}></textarea>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label >Start date</label>
              <input value={startDate || ''} type="date" className="form-control" onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col">
              <label >Ending date</label>
              <input value={endDate || ''} type="date" className="form-control" onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="form-group  mt-3">
            <label >Cryptocurrency</label>
            {/* <p className='sm'>old value : {crypto}</p> */}
            <select className="form-control " value={crypto || ''} onChange={(e) => setCrypto(e.target.value)}>
              {crypto_values.map((crypto) => (
                <option key={crypto.id} className="selectstyle" value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label >Category</label>
            {/* <p>old value : {cat}</p> */}
            <select className="form-control" value={cat || ''} onChange={(e) => setCat(e.target.value)}>
              {category_values.map((crypto) => (
                <option key={crypto.id} className="selectstyle" value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          {/* old version, user load resultat */}
          {false && <div className="row mt-3">
            <div className="col">
              <label >Upload competition data</label>
              <input type="file" className="form-control-file" accept="application/json" onChange={handleFileChange} />
              {selectedFile != null ? (
                <div>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )}
            </div>
            <div className="col">
              <label >Upload image</label>
              {/* onChange={handleImageChange} */}
              <input type="file" className="form-control-file" />
            </div>
          </div>}

          <div>          <button type="button"
            className="button block primary mt-3"
            onClick={update}
          >Update</button></div>
        </form>

      </div>
    </div>
  )
}

