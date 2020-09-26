import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import UserItem from './UserItem/UserItem'

import './UserList.scss'
import SearchUser from './SearchUser/SearchUser'
import TabItem from '../TabItem/TabItem'

const localUsers = JSON.parse(localStorage.getItem('users'))


const UserList = () => {
  const [users, setUsers] = useState(localUsers) // Economizando requisições
  const [showDeleted, setShowDeleted] = useState(false)

  // useEffect(() => {
  //   setUsers(localUsers)
  // }, [])

  useEffect(() => {
    // Axios.get('https://api.github.com/users')
    //   .then((res) => {
    //     setUsers(res.data)
    //     localStorage.setItem('users', JSON.stringify(res.data))
    //   }).catch(console.log)

      // Axios.get('https://api.github.com/users/mojombo')
      // .then((res) => {
      //   setUsers(res.data)
      //   setDataSource(res.data)
      //   localStorage.setItem('user', JSON.stringify(res.data))
      // }).catch(console.log)

  }, [])

  console.log(users)

  function toggleTab(type) {
    type === 'Todos' ? setShowDeleted(false) : setShowDeleted(true)
  }

  const handleSearch = (value) => {
    const result = []
    users.forEach((user) => {
      const userID = parseFloat(user.id)
      const login = user.login.toString().toLowerCase()

      const searchedID = parseFloat(value)
      const searchedText = value.toString().toLowerCase()

      if (userID === searchedID) {
        return result.push(user)
      }

      if (login.includes(searchedText)) {
        return result.push(user)
      }
    })

    // setDataSource(result)
  }

  const handleDeleteUser = (userID) => {
    const result = users.map((user) => {
      if (user.id === userID) {
        return ({ ...user, deleted: true })
      }
      return user
    })
    setUsers(result)
  }

  const getList = () => {
    if (showDeleted) {
      return users.filter((user) => user.deleted === true) || []
    }
    return users.filter((user) => user.deleted !== true)
  }

  return (
    <div className="user-list-container">
      <div className="list-header">
        <SearchUser onSearch={handleSearch} />
        <TabItem onClick={toggleTab} text="Todos" />
        <TabItem onClick={toggleTab} text="Excluídos" />
      </div>
      {
        getList().map((user) => (
          <UserItem 
            key={user.id} 
            userID={user.id}
            nodeID={user.node_id}
            avatar_url={user.avatar_url}
            html_url={user.html_url}
            login={user.login}
            onDelete={handleDeleteUser}
            // user={user} 
          />
        ))
      }
    </ div>
  )
}

export default UserList